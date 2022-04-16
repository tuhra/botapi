const express = require('express')
const fbPageController = require('../controllers/fbPageController')
const { body } = require('express-validator');

const router = express.Router()


router.get('/index', fbPageController.index)
router.post('/create', 
	body('page_id').notEmpty(), 
	body('app_id').notEmpty(),
	body('app_secret').notEmpty(),
	body('access_token').notEmpty(),
	body('verify_token').notEmpty(),
	fbPageController.create)
router.get('/show/:page_id', fbPageController.show)

module.exports = router