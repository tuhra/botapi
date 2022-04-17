const express = require('express')
const profileController = require('../controllers/profileController')
const { body } = require('express-validator');

const router = express.Router()

router.get('/getProfile/:project_id', profileController.get)
router.post('/setProfile', 
	body('project_id').notEmpty(),
	body('getStarted').notEmpty(),
	body('greeting').notEmpty(),
	profileController.set)

module.exports = router