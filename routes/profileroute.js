const express = require('express')
const profileController = require('../controllers/profileController')
const { body } = require('express-validator');

const router = express.Router()

router.get('/getProfile/:page_id', profileController.get)
router.post('/setProfile', 
	body('page_id').notEmpty(),
	body('getStarted').notEmpty(),
	body('greeting').notEmpty(),
	profileController.set)

module.exports = router