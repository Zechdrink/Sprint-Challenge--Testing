const express = require('express');
const router = express.Router();
const Games = require('./games-modal');

router.get('/', async (req, res) => {
    try{
        const games = await Games.get();
        res.status(200).json(games)
    } catch(error){
        res.status(500).error
    }
})

module.exports = router;
