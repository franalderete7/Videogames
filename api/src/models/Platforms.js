const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Platform', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}