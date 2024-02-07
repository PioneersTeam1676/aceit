const pi = require("../config/pi.config.js")(__filename);
const db = require("../main.js");
const op = db.Sequelize.Op;

// const Model = require('@types/sequelize')

// import {Model} from '@types/sequelize';

// https://sequelize.org/api/v6/class/src/model.js~model
/**@type {Model} */
const Model = db[pi.obj];


/* START OF CONTROLLERS */

	// Create and Save a new deck
	exports.create = (req, res) => {
	  // Validate request
	  if (!req.body.owner || !req.body.name) {
	    res.status(400).send({
	      message: "Deck must have an owner and a name!"
	    });
	    return;
	  }

	  // Create a deck
	  const deck = {
	    owner: req.body.owner,
	    name: req.body.name,
	    description: req.body.description,
		cards: req.body.cards,
	    public: req.body.public
	  };
	  // Save deck in the database
	  Model.create(deck)
	    .then(data => {
			res.send(data);
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the deck."
	      });
	    });
	};

	// Find a single deck with an id
	exports.findOne = (req, res) => {
	  const id = req.params.id;

	  Model.findByPk(id)
	    .then(data => {
	      if (data) {
	        res.send(data);
	      } else {
	        res.status(404).send({
	          message: `Cannot find deck with id=${id}.`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Error retrieving deck with id=" + id
	      });
	    });
	};

	// Update a deck by the id in the request
	exports.update = (req, res) => {
	  const id = req.params.id;

	  Model.update(req.body, {
	    where: { id: id }
	  })
	    .then(num => {
	      if (num == 1) {
	        res.send({
	          message: "Deck was updated successfully."
	        });
	      } else {
	        res.send({
	          message: `Cannot update deck with id=${id}. Maybe deck was not found or req.body is empty!`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Error updating deck with id=" + id
	      });
	    });
	};

	// Delete a deck with the specified id in the request
	exports.delete = (req, res) => {
	  const id = req.params.id;

	  Model.destroy({
	    where: { id: id }
	  })
	    .then(num => {
	      if (num == 1) {
	        res.send({
	          message: "deck was deleted successfully!"
	        });
	      } else {
	        res.send({
	          message: `Cannot delete deck with id=${id}. Maybe deck was not found!`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Could not delete deck with id=" + id
	      });
	    });
	};

	// find all decks with the specified ownerid
	exports.findOwner = (req, res) => {
		const owner = req.params.owner;

		Model.findAll({ where: { owner: owner } })
		  .then(data => {
			if (data) {
				console.log(owner);
			  res.send(data);
			} else {
			  res.status(404).send({
				message: `Cannot find deck with id=${id}.`
			  });
			}
		  })
		  .catch(err => {
			res.status(500).send({
			  message: "Error retrieving deck with id=" + id
			});
		  });
	  };

/* END OF CONTROLLERS */