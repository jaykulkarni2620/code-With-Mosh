const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const { describe } = require('joi/lib/types/lazy');

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

    //    describe('GET/:id', () => { 
    // console.log('Server console', server);
    // it('should return a genre if valid id is passed', async () => {
    //     const genre = new Genre({ name: 'genre1'});
    //     await genre.save();

    //     const res = await request(server).get('http://127.0.0.1:3000/api/genres/' + genre._id);

    //     expect(res.status).toBe(200);
    //     // expect(res.body).toMatchObject(genre);
       
    //     // return to buffer so using this toHaveproperty()
    //     except(res.body).toHaveProperty('name', genre.name);
    //  })

    //  it('should return a 404 if invalid id', async () => {

    //     const res = await request(server).get('api/genres/1');

    //     expect(res.status).toBe(404);
    //  })
    // })

   

    //POST API
        describe('POST/', () => {

        let token;
        let name;

            const exec = async () => {
                return await request(server)
                .post('/api/genres')
                .set('X-auth-token', token)
                .send({ name: name});
            }

            beforeEach( () => {
                token = new User().generateAtuhToken();
                name = 'genre1'
            })


            it('should return 401 if client is not looged in', async() => {
                token ="";

                const res = await exec();

                except(res.status).toBe(401);
            })

            it('should return 400 if genre is less than 5 characters', async() => {
                
                name= '1234';

                const res = await exec();

                except(res.status).toBe(400);
            })


           
            it('should return 400 if genre is more than 50 characters', async() => {

                name = new Array(52).join('a');
                
                const res = await exec();
 
                 except(res.status).toBe(400);
             })


            // Testing Happy path 

            it('should save the genres if it is valid', async() => {

               await exec();

               const genre = Genre.find({ name: 'genre1'});

                except(genre).not.toBeNull(401);
             })

             //make sure that this genres is in the body of the response 
             it('should return the genres if it is valid', async() => {
                
                const res = await exec();
              
                except(res.body).toHaveProperty('_id');
                except(res.body).toHaveProperty('name', 'genre1');
             })
        })
})