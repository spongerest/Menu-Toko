'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING, // Pastikan dienkripsi saat disimpan
    role: DataTypes.STRING // 'user' atau 'admin'
    }, {
    sequelize,
    modelName: 'User',
    });

    return User;
};
