const Sequelize = require("sequelize");
const sequelize = new Sequelize("Gather-Server", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
  dialetOptions: {
    ssl:{
      require: true,
      rejectUnauthorized: false
    }
  }
  });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to gather-server postgres database");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
