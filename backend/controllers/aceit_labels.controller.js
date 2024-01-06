const pi = require("../config/pi.config.js")(__filename);
const db = require("../main.js");
const op = db.Sequelize.Op;

// https://sequelize.org/api/v6/class/src/model.js~model
const Model = db[pi.obj];


/* START OF CONTROLLERS */

	// Create and Save a new label
	exports.create = (req, res) => {
	  // Validate request
	  if (!req.body.owner || !req.body.name || !req.body.color) {
	    res.status(400).send({
	      message: "Content needs an owner, name, and color!"
	    });
	    return;
	  }

	  // Create a label
	  const label = {
	    owner: req.body.owner,
	    name: req.body.name,
	    color: req.body.color,
	    contributors: req.body.contributors,
	    cards: req.body.cards,
	  };

	  // Save label in the database
	  Model.create(label)
	    .then(data => {
	      res.send(data);
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the label."
	      });
	    });
	};

	// Retrieve all labels from the database.
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
	          err.message || "Some error occurred while retrieving labels."
	      });
	    });
	};

	// Find a single label with an id
	exports.findOne = (req, res) => {
	  const id = req.params.id;

	  Model.findByPk(id)
	    .then(data => {
	      if (data) {
	        res.send(data);
	      } else {
	        res.status(404).send({
	          message: `Cannot find label with id=${id}.`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Error retrieving label with id=" + id
	      });
	    });
	};

	// Update a label by the id in the request
	exports.update = (req, res) => {
	  const id = req.params.id;

	  Model.update(req.body, {
	    where: { id: id }
	  })
	    .then(num => {
	      if (num == 1) {
	        res.send({
	          message: "label was updated successfully."
	        });
	      } else {
	        res.send({
	          message: `Cannot update label with id=${id}. Maybe label was not found or req.body is empty!`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Error updating label with id=" + id
	      });
	    });
	};

	// Delete a label with the specified id in the request
	exports.delete = (req, res) => {
	  const id = req.params.id;

	  Model.destroy({
	    where: { id: id }
	  })
	    .then(num => {
	      if (num == 1) {
	        res.send({
	          message: "label was deleted successfully!"
	        });
	      } else {
	        res.send({
	          message: `Cannot delete label with id=${id}. Maybe label was not found!`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Could not delete label with id=" + id
	      });
	    });
	};

	// Delete all labels from the database.
	exports.deleteAll = (req, res) => {
	  Model.destroy({
	    where: {},
	    truncate: false
	  })
	    .then(nums => {
	      res.send({ message: `${nums} labels were deleted successfully!` });
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while removing all labels."
	      });
	    });
	};

	// Get labes with specified owner
	exports.findOwner = (req, res) => {
		const owner = req.params.owner;

		Model.findAll({ where: { owner: owner } })
		  .then(data => {
			if (data) {

			  res.send(data);
			} else {
			  res.status(404).send({
				message: `Cannot find label with owner=${owner}.`
			  });
			}
		  })
		  .catch(err => {
			res.status(500).send({
			  message: "Error retrieving label with owner=" + owner
			});
		  });
	  };

	//
	exports.findByName = (req, res) => {
		const name = req.params.name;
		const userID = req.params.userID;

		Model.findAll({ where: {
			[op.and]: [{name: name}, {owner: userID}]
		}})
		.then(data => {
			if (data) {
			  res.send(data);
			} else {
			  res.status(404).send({
				message: `Cannot find label with name=${name}.`
			  });
			}
		  })
		  .catch(err => {
			res.status(500).send({
			  message: `Error retrieving label with name=${name}`
			});
		  });
	}

/* END OF CONTROLLERS */