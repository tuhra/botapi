const Page = require('../models').page;
const { validationResult } = require('express-validator');

const fbPageController = {
	// Get All Page List
	index: async (req, res, next) => {
		const pages = await Page.findAll({ where : {user_id: req.headers.authUser.user_id} });
		res.status(200).json(pages);
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
		const page = await Page.findOne({where:{ id:req.params.id } });
		if(page === null) {
			return res.status(200).json({ success: true, data: 'Page Not Found'})
		}
		return res.status(200).json(page);
	}
}

module.exports = fbPageController





