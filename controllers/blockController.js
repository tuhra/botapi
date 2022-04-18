const Block = require('../models').block;
const { validationResult } = require('express-validator');

const payloadController = {
	index: async (req, res, next) => {
		const blocks = await Block.findAll({where: {project_id: req.params.project_id, user_id: req.headers.authUser.user_id }});
		res.status(200).json(blocks);
	},
	create: async (req, res, next) => {
		const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	      	return res.status(200).json({ errors: errors.array() });
	    }
	    Block.create({
	    	name: req.body.name,
	    	project_id: req.body.project_id,
	    	user_id: req.headers.authUser.user_id,
	    	page_id: req.body.fb_page_id
	    })

	    res.status(200).json({success: true, data: 'Successfully created block'});
	},
	show: async (req, res, next) => {
		var block = await Block.findByPk(req.params.id);
		if(block === null) {
			return res.status(200).json({ success: false, data: 'Block not found'})
		}
		res.status(200).json({success: true, data: block});
	},
	update: async (req, res, next) => {
		const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	      	return res.status(200).json({ errors: errors.array() });
	    }
	 	var block = await Block.findByPk(req.body.id);
	 	if(block === null) {
	 		return res.status(200).json({ success: false, data: 'Block not found'})
	 	}
	 	Block.update({
	 		name: req.body.name, 
	 		user_id: req.headers.authUser.user_id,
	 		page_id: req.body.fb_page_id, 
	 	} , { where: { id: req.body.id } 
	 	})
	 	return res.status(200).json({success: true, data: 'Successfully updated block'});
	},
	delete: async (req, res, next) => {
		var block = await Block.findByPk(req.params.id);
		if(block === null) {
			return res.status(200).json({ success: false, data: 'Block not found'})
		}
		await Block.destroy({ where: {id: req.params.id} })
		res.status(200).json({success: true, data: 'Successfully deleted block'});
	}
}

module.exports = payloadController





