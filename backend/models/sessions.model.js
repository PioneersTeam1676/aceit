module.exports = (conn, Sequelize) => {
	const pi = require("../config/pi.config.js")(__filename);
	return conn.define(pi.obj, {

		
	/* START OF MODEL */
		
		sid: {
			type: Sequelize.STRING,
			primaryKey: true,
	  	},
	  	/*userId: {
			type: Sequelize.STRING
		},*/
	  	expires: { 
			type: Sequelize.DATE
		},
	  	data: {
			type: Sequelize.TEXT
		}

	/* END OF MODEL */
		
		
	});
};