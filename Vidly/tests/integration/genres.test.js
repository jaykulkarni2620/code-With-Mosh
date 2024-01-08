const request = require('supertest');
const { Genre } = require('../../models/genre');

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
           await Genre.collection.insertMany([
                { name: 'Mohan chavan' },
                { name: 'Genre2' },
            ])
            const res = await request(server).get('/api/genres');
            // expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'Mohan chavan')).toBeTruthy();  
        })
    })
 })

