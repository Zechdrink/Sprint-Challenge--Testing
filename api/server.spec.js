const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

describe('server testing', () => {
    beforeEach(async () => {
        await db('games').truncate();
    });

    it("should return a stat 200", async () => {
        const response = await request(server).get('/');

        expect(response.status).toBe(200)
    })

    it("Should return server message", async () => {
        const response = await request(server).get('/');

        expect(response.body).toEqual('Lets do this')
    })

    it("should return object json", async () => {
        const response = await request(server).get('/')
        .expect('Content-Type', /json/)
    })
    

    it("/games", async () => {
        let response = await request(server).get('/games');
        expect(response.body).toHaveLength(0);
        await db("games").insert({ title: "awesome", genre: "monkey" })
        response = await request(server).get('/games');
        expect(response.body).toHaveLength(1);
    })

    test('should return an empty array', async () => {
        let response = await request(server).get('/games');
        expect(response.body).toEqual([])
    })

    test('should get an array of games', async () => {
        await db("games").insert({ title: "Megaman", genre: "shooter", releaseYear: 2000 })
        await db("games").insert({title: "Yoshi", genre: "food", releaseYear: 2000 });
        let response  = await request(server).get('/games');

        expect(response.body).toEqual([{ title: "Megaman", genre: "shooter", releaseYear: 2000, id: 1  },
        {title: "Yoshi", genre: "food", releaseYear: 2000, id: 2 }]);
    })

    test('should return status 200', async () => {
        let response = await request(server).get('/games');

        expect(response.status).toBe(200)
    })

    test('returns status 201 and 422', async () => {
        //no data supplied response 422
        let response = await request(server).post('/games');
        expect(response.status).toEqual(422);
        //correct fields supplied response 201
        response = await request(server).post('/games').send({ title: "snake", genre: "cool"});
        expect(response.status).toBe(201);
        //missing one field response 422
        response = await request(server).post('/games').send({ title: "board" });
        expect(response.status).toBe(422)
    })


})