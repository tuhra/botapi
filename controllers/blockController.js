const Block = require('../models').blocks;
const { validationResult } = require('express-validator');

// access config var
process.env.TOKEN_SECRET;

const payloadController = {
	index: async (req, res, next) => {
		const blocks = await Block.findAll({where: {page_id: req.params.page_id}});
		res.status(200).json(blocks);
	},
	create: async (req, res, next) => {
		const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	      	return res.status(200).json({ errors: errors.array() });
	    }
	    Block.create({
	    	name: req.body.name,
	    	page_id: req.body.page_id
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
	 		name: req.body.name } ,{ where: { id: req.body.id } 
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





