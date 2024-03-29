const pi = require("../config/pi.config.js")(__filename);
const db = require("../main.js");
const op = db.Sequelize.Op;

// https://sequelize.org/api/v6/class/src/model.js~model
const Model = db[pi.obj];


/* START OF CONTROLLERS */

	// Create and Save a new Post
	exports.create = (req, res) => {
	  // Validate request
	  if (!req.body.title) {
	    res.status(400).send({
	      message: "Content can not be empty!"
	    });
	    return;
	  }

	  // Create a Post
	  const tutorial = {
	    title: req.body.title,
	    description: req.body.description,
	    published: req.body.published ? req.body.published : false
	  };

	  // Save Post in the database
	  Model.create(tutorial)
	    .then(data => {
	      res.send(data);
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the Post."
	      });
	    });
	};

	// Retrieve all Tutorials from the database.
	exports.findAll = (req, res) => {
	  Model.findAll()
	    .then(data => {
	      res.send(data);
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred."
	      });
	    });
	};

	// Find a single Tutorial with an id
	exports.findOne = (req, res) => {
	  const id = req.params.id;

	  Model.findByPk(id)
	    .then(data => {
	      if (data) {
	        res.send(data);
	      } else {
	        res.status(404).send({
	          message: `Cannot find Tutorial with id=${id}.`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Error retrieving Tutorial with id=" + id
	      });
	    });
	};

	// Update a Tutorial by the id in the request
	exports.update = (req, res) => {
	  const id = req.params.id;

	  Model.update(req.body, {
	    where: { id: id }
	  })
	    .then(num => {
	      if (num == 1) {
	        res.send({
	          message: "Tutorial was updated successfully."
	        });
	      } else {
	        res.send({
	          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Error updating Tutorial with id=" + id
	      });
	    });
	};

	// Delete a Tutorial with the specified id in the request
	exports.delete = (req, res) => {
	  const id = req.params.id;

	  Model.destroy({
	    where: { id: id }
	  })
	    .then(num => {
	      if (num == 1) {
	        res.send({
	          message: "Tutorial was deleted successfully!"
	        });
	      } else {
	        res.send({
	          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Could not delete Tutorial with id=" + id
	      });
	    });
	};

	// Delete all Tutorials from the database.
	exports.deleteAll = (req, res) => {
	  Model.destroy({
	    where: {},
	    truncate: false
	  })
	    .then(nums => {
	      res.send({ message: `${nums} Tutorials were deleted successfully!` });
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while removing all tutorials."
	      });
	    });
	};

	// find all published Tutorial
	exports.findAllPublished = (req, res) => {
	  Model.findAll({ where: { published: true } })
	    .then(data => {
	      res.send(data);
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while retrieving tutorials."
	      });
	    });
	};

/* END OF CONTROLLERS */