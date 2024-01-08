const lib = require('../exercise1');


describe('fizzBuzz', () => {
    it('Should throw an exception if input is not a number', () => {
        expect(()=> { lib.fizzBuzz('a')}).toThrow();
    })  
    
    it('Should return Fizzbuzz if input is divisible by 3 and 5', () => {
       const result =  lib.fizzBuzz(15);
       expect(result).toBe("FizzBuzz")
    })  

    it('Should return Fizz if input is divisible by 3', () => {
        const result =  lib.fizzBuzz(3);
        expect(result).toBe("Fizz")
     })  

     it('Should return Fizz if input is divisible by 5', () => {
        const result =  lib.fizzBuzz(5);
        expect(result).toBe("Buzz")
     })  

     it('Should return input if it is not divisible by 3 or 5', () => {
        const result =  lib.fizzBuzz(1);
        expect(result).toBe(1);
     })  
})