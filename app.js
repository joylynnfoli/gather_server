require("dotenv").config();
const express = require('express');
const app = express();
const sequelize = require('./db');

const User = require('./controllers/usercontroller');
const Favorites = require('./controllers/favoritesController');

sequelize.sync();
//sequelize.sync({force: true})

app.use(require('./middleware/headers'));

app.use(express.json());

app.use('/user', User)

app.use('/favorites', Favorites);

app.listen(process.env.PORT, function(){
    console.log(`App is listening on port ${process.env.PORT}`);
})