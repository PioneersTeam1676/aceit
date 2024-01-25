const pi = require("../config/pi.config.js")(__filename);
const { Sequelize, Op } = require("sequelize");
const db = require("../main.js");
const op = db.Sequelize.Op;

// https://sequelize.org/api/v6/class/src/model.js~model
const Model = db[pi.obj];


/* START OF CONTROLLERS */

	// Create and Save a new card
	exports.create = (req, res) => {
	  // Validate request
	  if (!req.body.owner || !req.body.term || !req.body.definition) {
	    res.status(400).send({
	      message: "Card must have atleast an Owner, Term, and Definition!"
	    });
	    return;
	  }

	  // Create a card
	  const card = {
	    owner: req.body.owner,
	    term: req.body.term,
	    definition: req.body.definition,
	    image: req.body.image,
	    labels: req.body.labels,
		public: req.body.public,
	  };
	  let newcard;
	  // Save card in the database
	  Model.create(card)
	    .then(data => {
			res.send(data);
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the card."
	      });
	    });
	};

	// Retrieve all cards from the database.
	exports.findAll = (req, res) => {
	  const title = req.query.title;
	  var condition = title ? { title: { [op.like]: `%${title}%` } } : null;

	  Model.findAll({ where: condition })
	    .then(data => {
	      res.send(data);
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while retrieving cards."
	      });
	    });
	};

	// Find a single card with an id
	exports.findOne = (req, res) => {
	  const id = req.params.id;

	  Model.findByPk(id)
	    .then(data => {
	      if (data) {
	        res.send(data);
	      } else {
	        res.status(404).send({
	          message: `Cannot find card with id=${id}.`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Error retrieving card with id=" + id
	      });
	    });
	};

	// Update a card by the id in the request
	exports.update = (req, res) => {
	  const id = req.params.id;

	  Model.update(req.body, {
	    where: { id: id }
	  })
	    .then(num => {
	      if (num == 1) {
	        res.send({
	          message: "card was updated successfully."
	        });
	      } else {
	        res.send({
	          message: `Cannot update card with id=${id}. Maybe card was not found or req.body is empty!`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Error updating card with id=" + id
	      });
	    });
	};

	// Delete a card with the specified id in the request
	exports.delete = (req, res) => {
	  const id = req.params.id;

	  Model.destroy({
	    where: { id: id }
	  })
	    .then(num => {
	      if (num == 1) {
	        res.send({
	          message: "card was deleted successfully!"
	        });
	      } else {
	        res.send({
	          message: `Cannot delete card with id=${id}. Maybe card was not found!`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Could not delete card with id=" + id
	      });
	    });
	};

	// Delete all cards from the database.
	exports.deleteAll = (req, res) => {
	  Model.destroy({
	    where: {},
	    truncate: false
	  })
	    .then(nums => {
	      res.send({ message: `${nums} cards were deleted successfully!` });
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while removing all cards."
	      });
	    });
	};

	// find all cards with the specified ownerid
	exports.findOwner = (req, res) => {
		const owner = req.params.owner;

		Model.findAll({ where: { owner: owner }})
		  .then(data => {
			if (data) {

			  res.send(data);
			} else {
			  res.status(404).send({
				message: `Cannot find card with id=${id}.`
			  });
			}
		  })
		  .catch(err => {
			res.status(500).send({
			  message: "Error retrieving card with id=" + id
			});
		  });
	  };


	  // find all cards with the specified label
	  exports.findLabel = (req, res) => {
		const label = req.params.label;




		Model.findAll({ where: {
			labels: {
				[op.like]: '%' + label + '%'
			}
		} })
		  .then(data => {
			if (data) {
			  res.send(data);
			} else {
			  res.status(404).send({
				message: `Cannot find card with label=${label}.`
			  });
			}
		  })
		  .catch(err => {
			res.status(500).send({
			  message: `Error retrieving card with label=${label}`
			});
		  });
	  };


/* END OF CONTROLLERS */