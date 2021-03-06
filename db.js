const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
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
    console.log(`Connected to ${process.env.DATABASE_URL} postgres database`);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
