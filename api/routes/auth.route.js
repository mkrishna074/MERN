const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {registerValidation, loginValidation} = require('../validation')
const verify = require('../middlewares/verifyToken');

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
  console.log(req.body);
    const validationRes = registerValidation(req.body);
    if(validationRes.error) {
      console.log(validationRes.error);
      return res.status(500).json({message:validationRes.error.details[0].message});
    }

    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(500).json({message:'Email already exists!'});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const expiresIn = process.env.DB_ENV === 'local' ? '1d' : '7d';

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    const savedUser = await user.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.PRIVATE_TOKEN, {
        expiresIn: expiresIn
      });
      try {
        res.send({
            token,
            user: {
              id: savedUser.id,
              name: savedUser.name,
              email: savedUser.email
            }
        });
      } catch (e) {
        res.status(500).json({
          message: e.message });
     }
})

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', async (req, res) => {
    const validationRes = loginValidation(req.body);
    if(validationRes.error) return res.status(500).json({
      message:validationRes.error.details[0].message});
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(500).json({
          message:'User does not exist!'});
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(500).json({
          message:'Invalid password!'});

        const expiresIn = process.env.DB_ENV === 'local' ? '1d' : '7d';
        const token = jwt.sign({_id:user._id}, process.env.PRIVATE_TOKEN, { expiresIn: expiresIn });
        if (!token) throw Error('Couldnt sign the token');

        res.status(200).json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
        });
     } catch (e) {
        res.status(500).json({
          message: e.message });
     }
})

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', verify, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) throw Error('User does not exist!');
      res.json(user);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
});

module.exports = router;