'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.Menu, {
                foreignKey: 'menuId',
                as: 'menu'
            });
        }
    }

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

    return Order;
};
