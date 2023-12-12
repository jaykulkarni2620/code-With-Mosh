
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

    async function allDetails() {
        try{
            const customer = await getCustomer(1);
            console.log('Customer: ', customer);
            if(customer.isGold){
               const movies = await getTopMovies();
               console.log('Top movies: ', movies);
                await sendEmail(customer.email, movies);
                console.log('Email sent...');
            }
        } catch (error){
            console.log(error);
        };

    };
    

    allDetails();
  
  function getCustomer(id) {
    return new Promise((resolve, reject ) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ 
              id: 1, 
              name: 'Jay Kulkarni', 
              isGold: true, 
              email: 'email' 
            });
        }, 3000);
    })
}
  
  function getTopMovies() {
    return new Promise((resolve, reject ) => {
    setTimeout(() => {
        console.log('List of movies...');
        resolve(['movie1', 'movie2']);
        }, 3000);
    })
}
  
  function sendEmail(email, movies) {
     return new Promise((resolve, reject ) => {
    setTimeout(() => {
        resolve();
     }, 4000);
    })
};