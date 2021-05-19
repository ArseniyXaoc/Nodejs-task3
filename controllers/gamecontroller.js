const router = require('express').Router();
const Game = require('../models/game');
const sequelize = require('../db');
const DataTypes = require('sequelize');

router.get('/all', (req, res) => {
    Game(sequelize, DataTypes).findAll({ where: { owner_id: 'req.body.user.id' } })
        .then(
            () => {
                res.status(200).json({
                    games: games,
                    message: "Data fetched."
                })
            },
            () => {
                res.status(500).json({
                    message: "Data not found"
                })
            }
        )
})

router.get('/:id', (req, res) => {
    Game(sequelize, DataTypes).findOne({ where: { id: req.params.id, owner_id: req.params.id } })
        .then(
            game => {
                res.status(200).json({
                    game: game
                })
            },
            () => {
                res.status(500).json({
                    message: "Data not found."
                })
            }
        )
})

router.post('/create', (req, res) => {
    Game(sequelize, DataTypes).create({
        title: req.body.game.title,
        owner_id: req.body.user.id,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    })
        .then(
            game => {
                res.status(200).json({
                    game: game,
                    message: "Game created."
                })
            },
            err => {
                res.status(500).send(err.message)
            }
        )
})

router.put('/update/:id', (req, res) => {
    Game(sequelize, DataTypes).update({
        title: req.body.game.title,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    },
        {
            where: {
                id: req.params.id,
                owner_id: req.body.user.id,
            }
        })
        .then(
            game => {
                res.status(200).json({
                    game: game,
                    message: "Successfully updated."
                })
            },
            err => {
                res.status(500).json({
                    message: err.message
                })
            }
        )
})

router.delete('/remove/:id', (req, res) => {
    Game(sequelize, DataTypes).destroy({
        where: {
            id: req.params.id,
            owner_id: req.body.user.id
        }
    })
    .then(
        game => {
            res.status(200).json({
                game: game,
                message: "Successfully deleted"
            })
        },
        err => {
            res.status(500).json({
                error: err.message
            })
        }
    )
})

module.exports = router;