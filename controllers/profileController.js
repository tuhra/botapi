const FbPage = require('../models').fbpage;
const Profile = require('../models').profile;
const Block = require('../models').block;
const { validationResult } = require('express-validator');

// access config var
process.env.TOKEN_SECRET;

const profileController = {
	set: async (req, res, next) => {
		const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	      return res.status(200).json({ errors: errors.array() });
	    }
	    var payload = {
	    	profile: {
	    		getStarted: req.body.getStarted,
	    		greeting: req.body.greeting
	    	}
	    }
	    if("persistentMenu" in req.body) {
	    	payload.profile.persistentMenu = req.body.persistentMenu
	    }
	    const profile = await Profile.findOne({where:{ project_id:req.body.project_id } });
	    if(profile !== null) {
	    	Profile.update({ 
	    		project_id: req.body.project_id, 
	    		user_id: req.headers.authUser.user_id,
	    		page_id: req.body.page_id,
	    		profile: JSON.stringify(payload) 
	    		},{ where: { project_id: req.body.project_id } 
	    	}).then(function(data) {
	    		return res.status(200).json({ success: true, data: 'successfully updated Messenger Profile'})
	    	}).catch(function(error) {
	    		return res.status(500).json(error)
	    	})
	    } else {
	    	await Profile.create({
	    		project_id: req.body.project_id,
	    		user_id: req.headers.authUser.user_id,
	    		page_id: req.body.page_id,
	    		profile: JSON.stringify(payload),
	    	})
	    	await Block.bulkCreate([
		    	{
		    		name: "GET_STARTED",
		    		project_id: req.body.project_id,
		    		user_id: req.headers.authUser.user_id,
		    		page_id: req.body.page_id,
		    	},	
		    	{
		    		name: "DEFAULT",
		    		project_id: req.body.project_id,
		    		user_id: req.headers.authUser.user_id,
		    		page_id: req.body.page_id,
		    	}
	    	]);
	    	return res.status(200).json({ success: true, message: 'successfully created Messenger Profile'})
	    }
	},
	get: async (req, res, next) => {
		const profile = await Profile.findOne({where:{ id:req.params.project_id, user_id: req.headers.authUser.user_id } });
		if(profile === null) {
			return res.status(200).json({success : false, message: "Messenger Page profile not found"})	
		}
		return res.status(200).json({success : false, data: profile})
	}
	
}

module.exports = profileController