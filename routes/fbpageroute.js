const express = require('express')
const fbPageController = require('../controllers/fbPageController')
const { body } = require('express-validator');

const router = express.Router()

router.get('/index', fbPageController.index)
router.post('/create', 
	body('fb_page_id').notEmpty(),
	body('fb_verify_token').notEmpty(),
	body('fb_app_id').notEmpty(),
	body('fb_app_secret').notEmpty(),
	body('fb_access_token').notEmpty(),
	fbPageController.create)
router.get('/show/:id', fbPageController.show)

module.exports = router