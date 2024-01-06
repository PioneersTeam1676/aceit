module.exports = (conn, Sequelize) => {
	const pi = require("../config/pi.config.js")(__filename);
	return conn.define(pi.obj, {


	/* START OF MODEL */

		owner: {
			type: Sequelize.INTEGER
		},
		name: {
			type: Sequelize.STRING
		},
		labels: {
			type: Sequelize.STRING
		},
		cards: {
			type: Sequelize.STRING
		}

	/* END OF MODEL */


	});
};