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
        expiresIn: '15m'
      });
    const refreshToken = jwt.sign({_id:savedUser._id, name:savedUser.name}, process.env.PRIVATE__REFRESH_TOKEN, { expiresIn: '7d' });
    res.cookie('x-refresh-token', refreshToken, {
      httpOnly: true
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
  console.log(req.body);
    const validationRes = loginValidation(req.body);
    console.log(validationRes);
    if(validationRes.error) return res.status(500).json({
      message:validationRes.error.details[0].message});
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(500).json({
          message:'User does not exist!'});
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(500).json({
          message:'Invalid password!'});

        const token = jwt.sign({_id:user._id}, process.env.PRIVATE_TOKEN, { expiresIn: '2m' });
        const refreshToken = jwt.sign({_id:user._id, name:user.name}, process.env.PRIVATE__REFRESH_TOKEN, { expiresIn: '5m' });
        if (!token) throw Error('Couldnt sign the token');
        res.cookie('x-refresh-token', refreshToken, {
          httpOnly: true
        });

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
 * @route   POST api/auth/logout
 * @desc    Log out user
 * @access  Public
 */
router.post('/logout', async (req, res) => {
  res.clearCookie('x-refresh-token', {
    httpOnly: true
  });
  res.status(200).json({ message: 'Cleared cookie'});
});

/**
 * @route   POST api/auth/refreshToken
 * @desc    Refresh Token
 * @access  Public
 */
router.post('/refreshToken', async (req, res) => {
  const token = req.body.headers['x-auth-token'];
  const userName = req.body.headers['x-auth-user'];
  if(!token) return res.status(401).send('Token expired');
  try {
        var cookie = getcookie(req);
        jwt.verify(token, process.env.PRIVATE_TOKEN, function(err, decoded){
          console.log(err);
          console.log(decoded);
          if( err !== null && err.name === 'TokenExpiredError'){
            if(cookie.length > 0){
              jwt.verify(cookie[1], process.env.PRIVATE__REFRESH_TOKEN, function(err1, decoded1){
                console.log(err1);
                console.log(decoded1);
                console.log(1);
                if(err1 !== null && err1.name === 'TokenExpiredError'){
                  res.clearCookie('x-refresh-token', {
                    httpOnly: true
                  });
                  res.status(200).json({message : 'Token expired'})
                }
                else {
                  const freshToken = jwt.sign({_id:decoded1._id}, process.env.PRIVATE_TOKEN, { expiresIn: '2m' });
                  console.log(2);
                  res.status(200).json({token: freshToken,
                    user: {
                        name: userName
                    }})
                }
              })
            }
            else {
              res.clearCookie('x-refresh-token', {
                httpOnly: true
              });
              console.log(3);
              res.status(200).json({message : 'No cookie'})
            }
          }
          else {
            console.log(4);
            res.status(200).json({message : 'Please continue'})
          }
        });
    } catch (error) {
        console.log(5);
        console.log(error);
        res.status(400).json({message:error.message});
    }
});
function getcookie(req) {
    var cookie = req.headers.cookie;
    return cookie?cookie.split('='):null;
  }
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