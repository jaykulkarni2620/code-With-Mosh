const lib = require('../lib')

// test('absolute', () => {
//     throw new Error('Something went wrong here');
// });

test('absolute - should return a positive number if input is positive', () => {
   const result = lib.absolute(1);
    expect(result).toBe(1);
});

test('absolute - should return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
     expect(result).toBe(1);
 });

 test('absolute - should return 0 if input is 0', () => {
    const result = lib.absolute(1);
     expect(result).toBe(1);
 });