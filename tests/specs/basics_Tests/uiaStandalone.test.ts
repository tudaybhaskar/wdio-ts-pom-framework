import { expect } from 'chai';
import {remote} from 'webdriverio';

describe('Standalone UIA Tests in Mocha', function(){
    /**
     * set timeout for entire tests and setting timeout at this place doesnot work when it is an arrow function.
     * Reason: this inside a describe or it block refers to the test context.
     * Arrow functions do not have their own this binding, so they cannot have access to the Mocha test context.
     */
    this.timeout(10000);
    let browser : WebdriverIO.Browser;
    before(async function() {
        browser = await remote({
            capabilities:{
                browserName:'chrome'
            }
        })
    });

    after(async function () {
        await browser.deleteSession();
    })
    it('Verify Title on WebDriverIO HomePage', async function (){
        await browser.url('https://webdriver.io/');
        const title = await browser.getTitle();
        expect(title).to.contain('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');
        expect(new RegExp('WebdriverIO').test(title)).to.true;
        const regex = /WebdriverIO/gi; // g refers to search globally(entirely) in the complete string, i refers to case insensitivity.
        const matches = title.match(regex);
        expect(matches?.length).to.equal(2);
        let count =0;
        let match;
        while( (match = regex.exec(title))!==null){
            count++;
        }
        expect(match).lessThanOrEqual(2);
    })
})