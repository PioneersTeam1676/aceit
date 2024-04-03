module.exports = app => {
	const pi = require("../config/pi.config.js")(__filename);
	const express = require("express");

	const Router = express.Router();
  const Controller = require("../controllers/" + pi.obj + ".controller.js");


	/* START OF ROUTES */

	  // Create a new Deck
	  Router.post("/", Controller.create);

	  // Retrieve a single Deck with id
	  Router.get("/:id", Controller.findOne);

	  // Update a Deck with id
	  Router.put("/:id", Controller.update);

	  // Delete a Deck with id
	  Router.delete("/:id", Controller.delete);

	  // Retrieve all Decks with specified owner
	  Router.get("/owner/:owner", Controller.findOwner);

	  // Retrieve a random assortment of n public decks
	  Router.get("/getNDecks/:n", Controller.findNDecks);

      //

	/* END OF ROUTES */


  app.use('/api/' + pi.obj, Router);
};