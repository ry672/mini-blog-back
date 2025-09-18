const path = require("path");

module.exports = {
  config: path.resolve("src", "config", "sequelize-config.js"),
  models: path.resolve("src", "models"),
  seeders: path.resolve("src", "seeders"),
  migrations: path.resolve("src", "migrations"),
};
