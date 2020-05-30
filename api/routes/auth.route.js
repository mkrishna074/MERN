const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {registerValidation, loginValidation} = require('../validation')

//register
router.post('/register', async (req, res) => {
    console.log(req.body);
    const validationRes = registerValidation(req.body);
    console.log(validationRes.error.details);
    if(validationRes.error) return res.status(400).send(validationRes.error.details[0].message);

    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email already exists!');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save();
        res.send({user: savedUser._id});
    } catch (error) {
        res.status(400).send(error);
    }
})

//login
router.post('/login', async (req, res) => {
    const validationRes = loginValidation(req.body);
    if(validationRes.error) return res.status(400).send(validationRes.error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email doesnt exist!');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password!');

    const token = jwt.sign({_id:user._id}, process.env.PRIVATE_TOKEN)
    res.header('auth-token', token).send(token);
})

module.exports = router;