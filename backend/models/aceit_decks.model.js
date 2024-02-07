const { Sequelize } = require("sequelize");
/**
 * 
 * @param {Any} conn 
 * @param {Sequelize} Sequelize 
 * @returns 
 */
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
        description: {
            type: Sequelize.STRING
        },
		cards: {
			type: Sequelize.TEXT
		},
        public: {
            type: Sequelize.BOOLEAN
        }

	/* END OF MODEL */
		
		
	});
};