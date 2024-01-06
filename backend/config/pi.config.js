/**
 * TEAM 1676 APPS
 * v1.0.1
 * ----------------------
 * FILE INFO:
 *  > Backend object management using file names
 *  > Stores other default variable
 * ----------------------
 *  AUTHOR: Larry [larry@team1676.com]
 *  UPDATED: 12/19/22
 * ----------------------
 *  Copyright © Pascack Pi-oneers
 */

module.exports = (filename) => {
	const path = require('path');

	const file = path.basename(filename);
	const obj = file.substring(0, file.indexOf('.'));
	
	const pi = {
    	obj: obj
  	};

  	return pi;
}