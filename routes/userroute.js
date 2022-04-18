const express = require('express')
const userController = require('../controllers/userController')
const { body } = require('express-validator');

const router = express.Router()

router.post('/login',  
	body('email').notEmpty(),
	userController.login)

module.exports = router