module.exports = (conn, Sequelize) => {
	const pi = require("../config/pi.config.js")(__filename);
	return conn.define(pi.obj, {

		
	/* START OF MODEL */
		
		first: {
			type: Sequelize.STRING
		},
		last: {
			type: Sequelize.STRING
		},
		img: {
			type: Sequelize.STRING
		}, 
		init_email: {
			type: Sequelize.STRING
		}, 
		login_id: {
			type: Sequelize.STRING
		}, 
		login_hash: {
			type: Sequelize.STRING
		}, 
		google_id: {
			type: Sequelize.STRING
		}, 
		google_hash: {
			type: Sequelize.STRING
		}, 
		contact_email: {
			type: Sequelize.STRING
		}, 
		contact_phone: {
			type: Sequelize.STRING
		}, 
		dash_id: {
			type: Sequelize.INTEGER
		}, 
		status: {
			type: Sequelize.INTEGER
		}, 
		created: {
			type: Sequelize.INTEGER
		}, 
		updated: {
			type: Sequelize.INTEGER
		}, 
		disabled: {
			type: Sequelize.INTEGER
		}

	/* END OF MODEL */
		
		
	});
};