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


})