const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const sequelize = require('../db');
const {DataTypes} = require('sequelize');

router.post('/signup', (req, res) => {
    const user = req.body.user;
    User(sequelize, DataTypes).create({
        full_name: user.full_name,
        username: user.username,
        passwordhash: bcrypt.hashSync(user.password, 10),
        email: user.email,
    })
        .then(
            user => {
                let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    user: user,
                    token: token
                })
            },
            err => {
                res.status(500).send(err.message)
            }
        )
})

router.post('/signin', (req, res) => {
    const user = req.body.user;
    User(sequelize, DataTypes).findOne({ where: { username: user.username } })
        .then(user => {
        if (user) {
            bcrypt.compare(user.password, user.passwordHash, function (err, matches) {
                if (matches) {
                    const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                    res.json({
                        user: user,
                        message: "Successfully authenticated.",
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({ error: "Passwords do not match." })
                }
            });
        } else {
            res.status(403).send({ error: "User not found." })
        }

    })
})

module.exports = router;