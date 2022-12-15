import arrays from '../utilities/arrays';
import numbers from '../utilities/numbers';
import strings from '../utilities/strings';

const numArr = [3, 4, 5, 6];
const wordArr = ['cat', 'dog', 'rabbit', 'bird'];
const arrSum = arrays.addArr(numArr);
const mixArr = arrays.concatArr(numArr, wordArr);
const myNum = ('15' as unknown) as number % 2;
const five = parseInt('5');

it('expected to remove the 3rd item from an array', () => {
    return expect(arrays.cut3(numArr)).not.toContain(5);
});

it('expected to find the largest number in an array', () => {
    return expect(arrays.lgNum(wordArr)).toBeFalsy();
});

it ('expected to  concatenate 2 arrays to not equal just 1', () => {
    expect(arrays.concatArr(numArr, wordArr)).not.toEqual(numArr);
});

it('expected to add numbers in an array and a number', () => {
    return expect(numbers.sum(4, 9)).toBeGreaterThan(9);
});

it ('expected to add numbers in array and be truthy', () => {
    expect(arrays.addArr(numArr)).toBeTruthy();
});

it('expected to multiply two numbers', () => {
    return expect(numbers.multiply(4, 9)).toBeCloseTo(36);
});

it('expected to capitalize a sentence or word', () => {
    return expect(strings.capitalize('expected to capitalize a sentence or word')).toBeTruthy();
});