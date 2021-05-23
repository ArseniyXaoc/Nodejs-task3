const bcrypt = require('bcryptjs');
const User = require('../models/user');
const sequelize = require('../../db');
const {DataTypes} = require('sequelize');

const userModel = User(sequelize, DataTypes);

const userCreate = (user) => {
    sequelize.createSchema("users").catch(err => console.log(err.message));
    return userModel.create({
        full_name: user.full_name,
        username: user.username,
        passwordhash: bcrypt.hashSync(user.password, 10),
        email: user.email,
    })
}

module.exports = userCreate;
