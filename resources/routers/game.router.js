const router = require('express').Router();
const Game = require('../models/game');
const sequelize = require('../../db');
const DataTypes = require('sequelize');

sequelize.createSchema("games").then(() => {
}).catch(err => console.log(err.message));

const gameModel = Game(sequelize, DataTypes);

router.get('/all', (req, res) => {
    gameModel.findAll()
        .then(
            (data) => {
                res.status(200).json({
                    games: data,
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
    gameModel.findOne({ where: { id: req.params.id, owner_id: req.user.id } })
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

    gameModel.create({
        title: req.body.game.title,
        owner_id: req.user.id,
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
    gameModel.update({
        title: req.body.game.title,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    },
        {
            where: {
                id: req.params.id,
                owner_id: req.user.id,
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
    gameModel.destroy({
        where: {
            id: req.params.id,
            owner_id: req.user.id
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