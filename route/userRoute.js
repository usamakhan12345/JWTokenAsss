const express = require('express');
const router = express.Router();
const {createUser,login} = require('../controller/userControllers');


// router.get('/getUser', getUser);
router.post('/createUser', createUser);
router.post('/login',login);

module.exports = router;