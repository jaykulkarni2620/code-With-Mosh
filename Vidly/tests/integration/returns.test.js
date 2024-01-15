const mongoose = require('mongoose');
const {Rental} = require('../../models/rental');
const {Movie} = require('../../models/movie');
const request = require('supertest');
const { User } = require('../../models/user');
const moment = require('moment');



describe('/api/returns', () => {

    let server;
    let customerId;
    let movieId;
    let rental;
    let token;

    const exec = async () => {
        return await request(server)
        .post('/api/genres')
        .set('X-auth-token', token)
        .send({customerId,movieId});
    }

    beforeEach(async () => { server = await require('../../index');

    customerId =  mongoose.Types.ObjectId();
    movieId =  mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

        movie = new Movie ({

            _id: movieId,
            title:'12345',
            dailyRentalRate: 2,
            genre : { name: '12345'},
            numberInStock : 10
        });

        await movie.save()

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
        await Movie.remove({});
    });

    it('should return 401 if client in not logged in', async ()=> {
       
        token = '';
        
        const res = await exec();

        expect(res.status).toBe(401);
    })

    // Customer id not provided
    it('should return 400 if Cutomer id is not provided', async ()=> {
        // 
        customerId = '';

        //aonther approch
      //  delete payload.customerId;

      const res = await exec()
  
          expect(res.status).toBe(400);
      })

      // not providing movieId

      it('should return 400 if movie id is not provided', async ()=> {
        movieId = '';

        const res = await exec()
  
          expect(res.status).toBe(400);
      })

      it('should return 404 if no rental found for the customer/movie', async ()=> {
            await Rental.remove({});
            const res = await exec();
            expect(res.status).toBe(400);
      })

      it('should return 400 if return already in process', async ()=> {
       
        rental.dateReturned = new Date();
        await rental.save();

        const res = await exec();
        expect(res.status).toBe(400);
  })

  it('should set the returnDate if input is valid ', async ()=> {
    
    const res = await exec();

   const rentalDb =  Rental.findById(rental._id);

    const diff = new Date() - rentalDb.dateReturned;

    expect(diff).toBeLessThan(10 * 1000);
})

it('should set the rentalFee if input is valid ', async ()=> {
    
    rental.dateOut = moment().add(-7, 'date').toDate();

    await rental.save()
    
    //dateout (Current time saved)
    const res = await exec();

   const rentalDb = await Rental.findById(rental._id)

    expect(rentalDb.rentalFee).toBe(14);
})

it('should incerese the movie stock if input is valid ', async ()=> {
    const res = await exec();

    const movieInDb = await Movie.findById(movieId);

    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
})

})

