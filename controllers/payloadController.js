const Payload = require('../models').payload;
const { validationResult } = require('express-validator');

// access config var
process.env.TOKEN_SECRET;

const payloadController = {
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

	    Payload.create({
	    	block_id: req.body.block_id,
	    	user_id: req.headers.authUser.user_id,
	    	payload_type: req.body.payload_type,
	    	body: JSON.stringify(req.body.body)
	    })
	    res.status(200).json({ success: true, data: 'created generic template' })
	},
}

module.exports = payloadController





