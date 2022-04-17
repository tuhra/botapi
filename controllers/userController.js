const User = require('../models').user;
const { validationResult } = require('express-validator');
var jwt = require("jsonwebtoken");

// access config var
// process.env.TOKEN_SECRET;

const userController = {
	login: async (req, res, next) => {
		const errors = validationResult(req);
 	   	if (!errors.isEmpty()) {
 	     	return res.status(400).json({ errors: errors.array() });
 	   	}
		var user = await User.findOne({ where: {email: req.body.email } });
		if(user === null) {
			var user = await User.create({ name: req.body.name, email: req.body.email, provider: req.body.provider })
		}
  		const payload = {
  			user_id: user.id,
  			email: user.email
  		};
		const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET);
		res.status(200).json({
			success: true,
			name: user.name,
			email: user.email,
			token: token
		});
	},
}

module.exports = userController





