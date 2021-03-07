const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
// const sequelize = new Sequelize("Gather-Server", "postgres", "password", {
//   host: "localhost", 

  dialect: "postgres",
  dialectOptions: {
    ssl:{
      require: true,
      rejectUnauthorized: false
    }
  }
  });

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected to ${process.env.DATABASE_URL} postgres database`);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
