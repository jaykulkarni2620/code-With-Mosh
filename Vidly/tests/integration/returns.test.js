const mongoose = require('mongoose');
const {Rental} = require('../../models/rental');
const request = require('supertest');
const { User } = require('../../models/user');



describe('/api/returns', () => {

    let server;
    let customerId;
    let movieId;
    let rental;

    beforeEach(async () => { server = await require('../../index');

    customerId =  mongoose.Types.ObjectId();
    movieId =  mongoose.Types.ObjectId();

        rental = new Rental({
            customer: {
                _id :customerId,
                name:'12345',
                phone: '123456'
            },
            movie: {
                _id: movieId,
                title:'12345',
                dailyRentalRate: 2
            }
        });

        await rental.save();    

    });

    afterEach( async() => { 
        
        await server.close();
        await Rental.remove({});
    });

    it('should return 401 if client in not logged in', async ()=> {
      const res = await request(server)
        .post('/api/returns')
        .send( customreId, movieId)

        expect(res.status).toBe(401);
    })

    // Customer id not provided
    it('should return 400 if Cutomer id is not provided', async ()=> {
        // user log in and generated the token
       const token = new User().generateAuthToken();

        const res = await request(server)
          .post('/api/returns')
          .set('x-auth-token', token)
          // not passing the customerId
          .send({movieId})
  
          expect(res.status).toBe(400);
      })

      // not providing movieId

      it('should return 400 if movie id is not provided', async ()=> {
        // user log in and generated the token
       const token = new User().generateAuthToken();

        const res = await request(server)
          .post('/api/returns')
          .set('x-auth-token', token)
          // not passing the customerId
          .send({customerId})
  
          expect(res.status).toBe(400);
      })


})

