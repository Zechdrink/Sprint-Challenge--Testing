const request = require('supertest');
const server = require('./server');

describe('server testing', () => {

    it("should return a stat 200", async () => {
        const response = await request(server).get('/');

        expect(response.status).toBe(200)
    })
})