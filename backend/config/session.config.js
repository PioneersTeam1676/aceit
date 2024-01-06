/**
 * TEAM 1676 APPS
 * v1.0.1
 * ----------------------
 * FILE INFO:
 *  > Express session management
 * ----------------------
 *  AUTHOR: Larry [larry@team1676.com]
 *  UPDATED: 12/19/22
 * ----------------------
 *  Copyright © Pascack Pi-oneers
 */

module.exports = () => {
	const express = require("express");
	const session = require('express-session');

	const app = express();
	app.set('trust proxy', 1);
	app.use(session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true }
	}));

	const sess = {
		express: express
  	};

  	return session;
}