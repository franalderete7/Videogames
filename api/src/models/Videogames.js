const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    plataforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }
    // background_image: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // game_genres: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
};