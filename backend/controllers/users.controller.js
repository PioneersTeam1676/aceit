const pi = require("../config/pi.config.js")(__filename);
const db = require("../main.js");
const op = db.Sequelize.Op;
const https = require('https');

const crypto = require('crypto');
const session_secret = "SECRET-Sm59JzgQoQsnoh9DsRrrmMTcM9QCc7j7jAg5c";

// https://sequelize.org/api/v6/class/src/model.js~model
const Model = db[pi.obj];


/* START OF CONTROLLERS */

  // Create new login session
  exports.loginInit = (req, res) => {
    var data = '';

    const request = https.request({
        hostname: 'portal.team1676.com',
        path: '/api.php?init=1',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }, (response) => {
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          // var iv = "team1676";
          // var decipher = crypto.createCipheriv('bf-cbc', data, iv);
          // var encrypted = decipher.update(session_secret, 'utf-8', "base64");
          // encrypted += decipher.final('base64');
          // res.send(data + "." + encrypted.replace(/\+/g, "_").replace(/\//g, "-"));
          let returnVals = {};
          returnVals.app_token = "OE0XHlRvZzedMZ18rmSggw8H-9huRVLTYJ7sYCE_HfU";
          returnVals.key = data;
          res.send(returnVals);
        });
      });

    request.on('error', (error) => {
      console.error(error);
    });

    request.end();
  };

  // Get logged in user
  exports.loginCallback = (req, res) => {
    var data = '';

    const request = https.request({
        hostname: 'portal.team1676.com',
        path: '/api.php?session='+req.query.token,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }, (response) => {
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          req.session.userId = data;
          res.send(JSON.parse(data));
        });
      });

    request.on('error', (error) => {
      console.error(error);
    });

    request.end();
  };

  // Get logged in user
	exports.session = (req, res) => {
    res.send(req.session.userId);
  };

  // Set logged in user
	exports.login = (req, res) => {
    const uid = req.body.uid;

    req.session.uid = uid;

    res.send(req.session);
  };

  // Retrieve all Users from the database.
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

/* END OF CONTROLLERS */