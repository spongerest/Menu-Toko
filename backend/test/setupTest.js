const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

const MenuModel = require('../src/models/menuModel')(sequelize, DataTypes);
const OrderModel = require('../src/models/orderModel')(sequelize, DataTypes);

MenuModel.associate ? MenuModel.associate({ Order: OrderModel }) : null;
OrderModel.associate ? OrderModel.associate({ Menu: MenuModel }) : null;

module.exports = { sequelize, Menu: MenuModel, Order: OrderModel };
