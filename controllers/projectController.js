const Project = require('../models').project;
const { validationResult } = require('express-validator');

const projectController = {
	index: async (req, res, next) => {
		const projects = await Project.findAll();
		res.status(200).json(projects);
	},
	create: async (req, res, next) => {
		const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	      	return res.status(200).json({ errors: errors.array() });
	    }
	    Project.create({
	    	name: req.body.name,
	    	page_id: req.body.page_id
	    })

	    res.status(200).json({success: true, data: 'Successfully created project'});
	},
	show: async (req, res, next) => {
		var project = await Project.findByPk(req.params.id);
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
	 		name: req.body.name } ,{ where: { id: req.body.id } 
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





