module.exports = app => {
	const pi = require("../config/pi.config.js")(__filename);
	const express = require("express");

	const Router = express.Router();
  const Controller = require("../controllers/" + pi.obj + ".controller.js");


	/* START OF ROUTES */

	  // Create a new label
	  Router.post("/", Controller.create);

	  // Retrieve all Cards
	  Router.get("/", Controller.findAll);

	  // Retrieve a single label with id
	  Router.get("/:id", Controller.findOne);

	  // Update a label with id
	  Router.put("/:id", Controller.update);

	  // Delete a label with id
	  Router.delete("/:id", Controller.delete);

	  // Delete all labels
	  Router.delete("/", Controller.deleteAll);

	  // Retrieve all labels with specified owner
	  Router.get("/owner/:owner", Controller.findOwner);

	  // Retrieve all labels with specified name
	  Router.get("/name/:name", Controller.findByName)

	/* END OF ROUTES */


  app.use('/api/' + pi.obj, Router);
};