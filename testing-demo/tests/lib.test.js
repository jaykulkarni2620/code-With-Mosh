const lib = require('../lib')

// test('absolute', () => {
//     throw new Error('Something went wrong here');
// });

describe('absolute', () => {
     it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
         expect(result).toBe(1);
     });
     
     it('should return a positive number if input is negative', () => {
         const result = lib.absolute(-1);
          expect(result).toBe(1);
      });
     
      it('should return 0 if input is 0', () => {
         const result = lib.absolute(0);
          expect(result).toBe(0);
      });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Jay');
        expect(result).toMatch(/Jay/);
        expect(result).toContain('Jay')
    });
});

describe('getCurrencies', () => {
    it('should return the greeting message', () => {
        const result = lib.getCurrencies();
       // Ideal way 
       expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
    });
});

describe('getProduct', () => {
    it('should return the product of the given id ', () => {
        const result = lib.getProduct(1);
        // these two object in different location in memory 
        // expect(result).toBe({ id:1, price:10})
        //now using toEqual but when try to add something new property its not pass the test
        // expect(result).toEqual({ id:1, price:10})
        // using toMatchObject for objest
        //expect(result).toMatchObject({ id:1, price:10});
        //first property is required ... hyapudhe konti he property asli does not matter.
        expect(result).toHaveProperty('id', 1);
    });
});

describe('registerUser', () => {
it('should throw if username is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(a => {
        expect(() => {lib.registerUser(a)}).toThrow();
        })
    })
    
it('should return user object if valid username is passed', () => {
    const result = lib.registerUser('Jay');
    expect(result).toMatchObject({ username: 'Jay'})
    expect(result.id). toBeGreaterThan(0);
})
})

