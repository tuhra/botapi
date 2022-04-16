const FbPage = require('../models').fbpages;
const { validationResult } = require('express-validator');

// access config var
process.env.TOKEN_SECRET;

const fbPageController = {
	// Get All Page List
	index: async (req, res, next) => {
		const fbpages = await FbPage.findAll();
		res.status(200).json(fbpages);
	},
	create: async (req, res, next) => {
		const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	      return res.status(200).json({ errors: errors.array() });
	    }
	    const page = await FbPage.findOne({where:{ page_id:req.body.page_id } });
	    if(page !== null) {
	    	return res.status(200).json({ success: true, data: 'Page Already Exist'})
	    }

	    FbPage.create(req.body).then(function (data) {
	    	return res.status(200).json({ success: true, message: 'successfully save fb page credentials', data})
	    }).catch(function (error) {
	    	return res.status(500).json(error)
	    })
	},
	show: async (req, res, next) => {
		const page = await FbPage.findOne({where:{ page_id:req.params.page_id } });
		if(page === null) {
			return res.status(200).json({ success: true, data: 'Page Not Found'})
		}
		return res.status(200).json(page);
	}
}

module.exports = fbPageController





