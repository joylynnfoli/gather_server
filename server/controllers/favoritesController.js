const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
const Favorites = require('../db').import('../models/favorites');

router.get('/practice', validateSession, function(req, res){
    res.send('Hey!! This is a practice route!');
});

router.post('/add', validateSession, (req, res) => {
    const favoritesEntry = {
        user_id: req.user.id, 
        recipeId: req.body.favorites.recipeId,
        imageURL: req.body.favorites.imageURL, 
        title: req.body.favorites.title,
        note: req.body.favorites.note

    }
    Favorites.create(favoritesEntry)
    .then(favorites => res.status(200).json(favorites))
    .catch(err => res.status(500).json({error: err}))
});

router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Favorites.findAll({
        where: {user_id: userid}
    })
    .then(favorites => res.status(200).json(favorites))
    .catch(err => res.status(500).json({ error: err }))
});

router.put("/update/:entryId", validateSession, function (req, res) {
    const updateFavoritesEntry = {
        note: req.body.favorites.note,
    };

    const query = { where: { id: req.params.entryId, user_id: req.user.id} };

    Favorites.update(updateFavoritesEntry, query)
        .then((favorites) => res.status(200).json(favorites))
        .catch((err) => res.status(500).json({ error: err}));

});

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, user_id: req.user.id}};

    Favorites.destroy(query)
        .then(() => res.status(200).json({ message: "Recipe Removed" }))
        .catch((err) => res.status(500).json({ error: err}));
});

module.exports = router;