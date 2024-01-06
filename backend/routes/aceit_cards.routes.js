module.exports = app => {
	const pi = require("../config/pi.config.js")(__filename);
	const express = require("express");

	const Router = express.Router();
  const Controller = require("../controllers/" + pi.obj + ".controller.js");


	/* START OF ROUTES */

	  // Create a new Card
	  Router.post("/", Controller.create);

	  // Retrieve all Cards
	  Router.get("/", Controller.findAll);

	  // Retrieve a single Card with id
	  Router.get("/:id", Controller.findOne);

	  // Update a Card with id
	  Router.put("/:id", Controller.update);

	  // Delete a Card with id
	  Router.delete("/:id", Controller.delete);

	  // Delete all Cards
	  Router.delete("/", Controller.deleteAll);

	  // Retrieve all cards with specified owner
	  Router.get("/owner/:owner", Controller.findOwner);

	  // Retrieve all cards with specified label(s)
	  Router.get("/label/:label", Controller.findLabel);

	/* END OF ROUTES */


  app.use('/api/' + pi.obj, Router);
};