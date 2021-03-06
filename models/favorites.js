module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define("favorites", {
    user_id: {
      type: DataTypes.INTEGER,
    },
    recipeId: {
      type: DataTypes.INTEGER,
    },
    imageURL: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    note: {
      type: DataTypes.STRING,
    },
  });
  return Favorites;
};
