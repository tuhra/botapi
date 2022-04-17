const express = require('express')
var app = express();
var jwt = require("jsonwebtoken");	

const AuthMiddleware = function (req, res, next) {
  	const token = req.headers.authorization;
  	const user_id = jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, authorizedData) => {
  	    if(err){
  	        res.status(403).json({ success: false, data: "Invalid Token" });
  	    } else {
  	        // req.body.user_id = authorizedData.user_id;
  	        req.headers.authUser = authorizedData;
  	        next();
  	    }
  	})
};

module.exports = AuthMiddleware