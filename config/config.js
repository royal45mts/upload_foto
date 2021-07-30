module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: "mysql",
    port: process.env.PORT_MYSQL,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "localhost",
    dialect: "mysql",
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: "mysql",
    port: process.env.PORT_MYSQL,
  },
};
