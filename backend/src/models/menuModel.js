'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Menu extends Model {
        static associate(models) {
            Menu.hasMany(models.Order, {
                foreignKey: 'menuId',
                as: 'orders'
            });
        }
    }

    Menu.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.FLOAT
    }, {
        sequelize,
        modelName: 'Menu',
    });

    return Menu;
};
