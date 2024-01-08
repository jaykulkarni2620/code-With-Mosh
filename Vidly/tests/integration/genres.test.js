const request = require('supertest');
let server;

describe('/api/genres', () => {
    // pratyek endpoint chya adhi server start honar
    beforeEach(async () => {
        server = await require('../../index');
    });
    // pratyek endpoint nantr aplyala server stop karava lagto
    afterEach(() => {
        if (server) {
            server.close();
        }
    });
    
    describe('GET/', () => {
        it('should return all genres', async ()=> {
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
        })
    })
})