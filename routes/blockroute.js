const express = require('express')
const blockController = require('../controllers/blockController')
const { body } = require('express-validator');

const router = express.Router()

router.get('/index/:project_id', blockController.index)
router.post('/create', 
	body('name').notEmpty(), 
	body('project_id').notEmpty(),
	blockController.create)
router.get('/show/:id', blockController.show)
router.put('/update', 
	body('name').notEmpty(), 
	body('id').notEmpty(),
	blockController.update)
router.delete('/delete/:id', blockController.delete)

module.exports = router