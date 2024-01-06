module.exports = (conn, Sequelize) => {
	const pi = require("../config/pi.config.js")(__filename);
	return conn.define(pi.obj, {

		
	/* START OF MODEL */
		
		owner: {
			type: Sequelize.INTEGER
		},
		term: {
			type: Sequelize.STRING
		},
		definition: {
			type: Sequelize.STRING
		},
		image: {
			type: Sequelize.STRING
		},
		labels: {
			type: Sequelize.STRING
		}

	/* END OF MODEL */
		
		
	});
};