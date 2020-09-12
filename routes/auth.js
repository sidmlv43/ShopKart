const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');

const {signout,signup, signin} = require('../controllers/auth')


router.post('/signup', [
    check('name', 'name should be atleast 3 character').isLength({min:3}),
    check('email', 'email is required').isEmail(),
    check('password', 'password should be atleast of 3 characters').isLength({min:3}),
],signup)


router.post('/signin', [
    check('email', 'email is required').isEmail(),
    check('password', 'password should be atleast of 3 characters').isLength({min:3}),
],signin)

router.get('/signout', signout)

router.get("/testroute", (req, res)=>{
    res.json(req.auth);
})
module.exports = router