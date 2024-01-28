'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Menu extends Model {}

    Menu.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT
    }, {
    sequelize,
    modelName: 'Menu',
    });
    class Menu extends Model {}
        Menu.init({
            // ... definisi field
        }, {
            sequelize,
            modelName: 'Menu',
        });

        Menu.associate = function(models) {
            Menu.hasMany(models.Order, {
                foreignKey: 'menuId',
                as: 'orders'
            });
        };

    return Menu;
};