const Project = require('../models').project;
const Page = require('../models').page;
const { validationResult } = require('express-validator');

const projectController = {
	index: async (req, res, next) => {
		const projects = await Project.findAll({ where: { page_id: req.params.page_id, user_id: req.headers.authUser.user_id} });
		res.status(200).json(projects);
	},
	create: async (req, res, next) => {
		const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	      	return res.status(200).json({ errors: errors.array() });
	    }
	    Project.create({
	    	name: req.body.name,
	    	page_id: req.body.page_id,
	    	user_id: req.headers.authUser.user_id,
	    })
	    res.status(200).json({success: true, data: 'Successfully created project'});
	},
	show: async (req, res, next) => {
		var project = await Project.findByPk(req.params.id, {
			include: Page
		});
		if(project === null) {
			return res.status(200).json({ success: false, data: 'project not found'})
		}
		res.status(200).json({success: true, data: project});
	},
	update: async (req, res, next) => {
		const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	      	return res.status(200).json({ errors: errors.array() });
	    }
	 	var project = await Project.findByPk(req.body.id);
	 	if(project === null) {
	 		return res.status(200).json({ success: false, data: 'project not found'})
	 	}
	 	Project.update({
	 		name: req.body.name, user_id: req.headers.authUser.user_id } ,{ where: { id: req.body.id } 
	 	})
	 	return res.status(200).json({success: true, data: 'Successfully updated project'});
	},
	delete: async (req, res, next) => {
		var project = await Project.findByPk(req.params.id);
		if(project === null) {
			return res.status(200).json({ success: false, data: 'project not found'})
		}
		await Project.destroy({ where: {id: req.params.id} })
		res.status(200).json({success: true, data: 'Successfully deleted project'});
	}
}

module.exports = projectController





