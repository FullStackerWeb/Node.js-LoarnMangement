const Sequelize = require("sequelize");
module.exports = {
development : {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'rising2018',
    database: process.env.DB_NAME || 'loanManagement',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
    logging: false,
},
test: {
    username: process.env.DB_USERNAME || 'Rising',
    password: process.env.DB_PASSWORD || 'rising2018',
    database: process.env.DB_NAME || 'test',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
    logging: false,
},

production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
  }
}
 