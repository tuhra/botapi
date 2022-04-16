const express = require('express')
const payloadController = require('../controllers/payloadController')
const { body } = require('express-validator');

const router = express.Router()

router.post('/create', 
	body('block_id').notEmpty(),
	body('payload_type').notEmpty(),
	body('body').notEmpty(),
	payloadController.create)

module.exports = router