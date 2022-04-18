const Page = require('../models').page;
const User = require('../models').user;
const Project = require('../models').project;
const { validationResult } = require('express-validator');

const fbPageController = {
	index: async (req, res, next) => {
		var user_id = req.headers.authUser.user_id;
		const user = await User.findByPk(user_id, {
			include: Page
		});
		return res.status(200).json(user);
	},
	create: async (req, res, next) => {
		const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	      return res.status(200).json({ errors: errors.array() });
	    }

	    req.body.user_id = req.headers.authUser.user_id;
	    const page = await Page.findOne({where:{ fb_page_id:req.body.fb_page_id } });
	    if(page !== null) {
	    	return res.status(200).json({ success: true, data: 'Page Already Exist'})
	    }

	    Page.create(req.body).then(function (data) {
	    	return res.status(200).json({ success: true, message: 'successfully save fb page credentials', data})
	    }).catch(function (error) {
	    	return res.status(500).json(error)
	    })
	},
	show: async (req, res, next) => {
		var user_id = req.headers.authUser.user_id;
		const page = await Page.findOne({ where: {id: req.params.id, user_id: user_id} });
		if(page === null) {
			return res.status(200).json({ success: true, data: 'Page Not Found'})
		}
		return res.status(200).json(page);
	},
	update: async (req, res, next) => {
		const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	      return res.status(200).json({ errors: errors.array() });
	    }
	    const page = await Page.findByPk(req.body.id);
	    if(page === null) {
	    	return res.status(200).json({ success: false, data: 'Page not found'})
	    }
	    await Page.update(req.body, { where: { id: req.body.id } })
	    return res.status(200).json({ success: true, message: 'successfully updated fb page credentials' })
	},
	delete: async (req, res, next) => {
		const page = await Page.findByPk(req.params.id);
		if(page === null) {
			return res.status(200).json({ success: false, data: 'Page not found'})
		}
		await Page.destroy({ where: {id: req.params.id} })
		return res.status(200).json({ success: true, data: 'Successfully deleted page'})
	}
}

module.exports = fbPageController





