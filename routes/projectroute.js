const express = require('express')
const projectController = require('../controllers/projectController')
const { body } = require('express-validator');

const router = express.Router()

router.get('/index', projectController.index)
router.post('/create', 
	body('name').notEmpty(), 
	body('page_id').notEmpty(),
	projectController.create)
router.get('/show/:id', projectController.show)
router.put('/update', 
	body('name').notEmpty(), 
	body('id').notEmpty(),
	projectController.update)
router.delete('/delete/:id', projectController.delete)

module.exports = router