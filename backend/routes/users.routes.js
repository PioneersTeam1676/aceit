module.exports = app => {
	const pi = require("../config/pi.config.js")(__filename);
	const session = require("../config/session.config.js")();
	const express = require("express");

	const Router = express.Router();
  	const Controller = require("../controllers/" + pi.obj + ".controller.js");


	/* START OF ROUTES */

  		// Create new login session
		Router.get("/login/init", Controller.loginInit);

		// Login session callback
		Router.get("/login/callback", Controller.loginCallback);

		// Get logged in user
		Router.get("/session/", Controller.session);

	  	// Set logged in user
	  	Router.post("/session/", Controller.login);

		// Get all users
		Router.get("/", Controller.findAll);

	/* END OF ROUTES */


  	app.use('/api/' + pi.obj, Router);
};
