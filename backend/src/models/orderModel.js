'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {}

    Order.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        menuId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        tableNumber: DataTypes.INTEGER,
        totalPrice: DataTypes.FLOAT
    }, {
        sequelize,
        modelName: 'Order',
    });
    class Order extends Model {}
        Order.init({
            // ... definisi field
        }, {
            sequelize,
            modelName: 'Order',
        });

        Order.associate = function(models) {
            Order.belongsTo(models.Menu, {
                foreignKey: 'menuId',
                as: 'menu'
            });
        };

    return Order;
};
