const express = require('express');
const router = express.Router();
const Games = require('./game-modal');

router.get('/', async (req, res) => {
    try{
        const games = await Games.get();
        res.status(200).json(games)
    } catch(error){
        res.status(500).error
    }
})

router.post('/', async (req, res) => {
    try{
        if(!req.body.genre || !req.body.title ||typeof req.body.genre !== "string" || typeof req.body.title !== "string" ||
        req.body.genre.length < 1 || req.body.title.length < 1){
            res.status(422).send('fill out required fields');
        } else {
            const game = await Games.add(req.body);
            res.status(201).json(game)
        }
    } catch(error){
        res.status(500).send("we have a prob")
    }
})


module.exports = router;
