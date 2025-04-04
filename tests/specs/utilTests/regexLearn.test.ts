import { expect } from 'chai';
describe('Learn Regex Concepts', ()=>{
    it('Regex test on Regex Literal & RegExp Constructor', async()=>{
        const regex = /pattern/;
        console.log('Using Regex Literal: ', regex.test('hello pattern'));
        console.log(regex.test('Test regex'));

        const regexConst = new RegExp('Pattern');
        console.log('Using RegExpr Constructor : ' , regexConst.test('Test Pattern'));

        console.log(regexConst.exec('Testing for Regex Pattern exec method. Found one Pattern'));
    })

    it('Regex Test on Characters - Basic  & Special', async ()=>{
        const regex = /\d/;
        console.log('Expecting false: ' , regex.test('abc'));
        console.log('Expecting True: ' , regex.test('abc0'));
        expect(regex.test('abc')).to.false;
    })

    it('\w - Matches any word character (alphanumeric + underscore)', async()=>{
        const regex = /\w/;
        console.log('Test - Matches any word character (alphanumeric + underscore)');
        console.log('Expecting true: ' , regex.test('test9_'));
        console.log('Expecting true: ' , regex.test('999'));
        console.log('Expecting false: ' , regex.test('...%'));

    })

    it('\s - Matched any whitespace characters (space,tab, newline)', async()=>{
        const regex = /\s/;
        console.log('Expecting true: ', regex.test('Test _space'));
        console.log('Expecting false: ', regex.test('Test_space'));
        console.log('Expecting true: ' , regex.test(`test
            newline`));
    })

    it('\W, \D, \S - Negations of the Word, Digit, WhiteSpace', async()=>{
        const regex = /\D/;
        console.log('Expecting true: ' , regex.test('abc'));
        const regexNonWord = /\W/;
        console.log('Expecting false: ', regexNonWord.test('999'));
    })

    it('', async function(){
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    })

})