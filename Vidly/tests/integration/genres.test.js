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
    
//     describe('GET/', () => {
//         it('should return all genres', async ()=> {
//            await Genre.collection.insertMany([
//                 { name: 'Mohan chavan' },
//                 { name: 'Genre2' },
//             ])
//             const res = await request(server).get('/api/genres');
//             // expect(res.status).toBe(200);
//             expect(res.body.length).toBe(2);
//             expect(res.body.some(g => g.name === 'Mohan chavan')).toBeTruthy();  
//         })
//     })
//  })

describe('GET/:id', () => { 
    console.log('Server console', server);
    it('should return a genre if valid id is passed', async () => {
        const genre = new Genre({ name: 'genre1'});
        await genre.save();

        const res = await request(server).get('http://127.0.0.1:3000/api/genres/' + genre._id);

        expect(res.status).toBe(200);
        // expect(res.body).toMatchObject(genre);
       
        // return to buffer so using this toHaveproperty()
        except(res.body).toHaveProperty('name', genre.name);
     })

     it('should return a 404 if invalid id', async () => {

        const res = await request(server).get('api/genres/1');

        expect(res.status).toBe(404);
     })
})
})