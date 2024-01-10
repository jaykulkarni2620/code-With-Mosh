const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');



let server;

describe('api/genres/', () => {
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

        it('should return a genre if valid id is passed', async () => {
        const genre = new Genre({ name: 'genre1'});
        await genre.save();

        const res = await request(server).get('/api/genres/' + genre.id);

        expect(res.status).toBe(200);
        // expect(res.body).toMatchObject(genre);
       
        // return to buffer so using this toHaveproperty()
        expect(res.body).toHaveProperty('name', genre.name);
     })

     it('should return a 404 if invalid id', async () => {

        const res = await request(server).get('api/genres/1');

        expect(res.status).toBe(404);
     })

     it('should return a 404 if no genre with the given id exist', async () => {

        const id = mongoose.Types.ObjectId();

        const res = await request(server).get('api/genres/', + id);

        expect(res.status).toBe(404);
     })
    })

   

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
                token = new User().generateAuthToken();
                name = 'genre1'
            })


            it('should return 401 if client is not looged in', async() => {
                token ="";

                const res = await exec();

                expect(res.status).toBe(401);
            })

            it('should return 400 if genre is less than 5 characters', async() => {
                
                name= '1234';

                const res = await exec();

                expect(res.status).toBe(400);
            })


           
            it('should return 400 if genre is more than 50 characters', async() => {

                name = new Array(52).join('a');
                
                const res = await exec();
 
                expect(res.status).toBe(400);
             })


            // Testing Happy path 

            it('should save the genres if it is valid', async() => {

               await exec();

               const genre = Genre.find({ name: 'genre1'});

               expect(genre).not.toBeNull();
             })

             //make sure that this genres is in the body of the response 
             it('should return the genres if it is valid', async() => {
                
                const res = await exec();
              
                expect(res.body).toHaveProperty('_id');
                expect(res.body).toHaveProperty('name', 'genre1');
             })
        })
})

// Put 

    describe('PUT/:id', ()=> {

        let token; 
        let newName; 
        let genre; 
        let id; 

        const exec = async () => {
            return await request(server)
              .put('/api/genres/' + id)
              .set('x-auth-token', token)
              .send({ name: newName });
          }
        beforeEach(async () => {
            // Before each test we need to create a genre and 
            // put it in the database.      
            genre = new Genre({ name: 'genre1' });
            await genre.save();
            
            token = new User().generateAuthToken();     
            id = genre._id; 
            newName = 'updatedName'; 
          })


        it('should return a 401 if client is not logged in', async ()=> {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        })

        it('should return 400 if genre is less than 5 characters', async () => {
            newName = '1234'; 
            
            const res = await exec();
      
            expect(res.status).toBe(400);
          });
      
          it('should return 400 if genre is more than 50 characters', async () => {
            newName = new Array(52).join('a');
      
            const res = await exec();
      
            expect(res.status).toBe(400);
          });

          
    it('should return 404 if id is invalid', async () => {
        id = 1;
  
        const res = await exec();
  
        expect(res.status).toBe(404);
      });
  
      it('should return 404 if genre with the given id was not found', async () => {
        id = mongoose.Types.ObjectId();
  
        const res = await exec();
  
        expect(res.status).toBe(404);
      });


      it('should update the genre if input is valid', async () => {
        await exec();
  
        const updatedGenre = await Genre.findById(genre._id);
  
        expect(updatedGenre.name).toBe(newName);
      });
  
      
      it('should return the updated genre if it is valid', async () => {
        const res = await exec();
  
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', newName);
      });
    });    
