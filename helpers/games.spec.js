const db = require('../data/dbConfig.js');
const Games = require('./game-modal');


describe('games table tests', () => {
    beforeEach(async () => {
        await db('games').truncate()
    });

    it('/add a game', async () => {
        const game = await Games.add({ title: "Mario", Genre: "classic" })

        expect(game.title).toBe('Mario')
    })

    it('/add get length of games db', async () => {
       await Games.add({ title: "Zelda", genre: "classic" })
       await Games.add({ title: "Crash", genre: "fun" })
       const data = await db('games');

        expect(data).toHaveLength(2)
    });

    it('/add', async () => {
        let games = await Games.add({ title: "Mario", genre: "overrated"});

        expect(games).toHaveProperty('genre')
    })

    it('get empty array', async () => {
        let games = await Games.get()

        expect(games).toEqual([])
    })

    it('get games in db', async () => {
        await Games.add({ title: "Zelda", genre: "classic", releaseYear: 2010})
        let games = await Games.get()

        expect(games).toEqual([{ id: 1, title: "Zelda", genre: "classic", releaseYear: 2010}])
    })

    it('get', async () => {
        let games = await Games.get()

        expect(games.title).toBe(undefined)
    })

})