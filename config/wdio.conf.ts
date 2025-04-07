import { Options } from '@wdio/types';
import { dirname, join }  from 'path';
import { fileURLToPath } from 'url';
import { filterSpecs } from './runner-helpers/filter-spec-files';
import { glob } from 'glob';
import path from 'path';
import { cli} from './runner-helpers/filter-spec-files';
import { chromeCapabilities} from './browserCapabilities';
import isArray from 'lodash/isArray';
import { registerBrowserCommands} from '../utils/customCommands';
import allureReporter from '@wdio/allure-reporter';
import { setUpGlobalErrorHandlers } from './runner-helpers/error-handlers';

function getGrepFromCLI(): string | undefined {
    const grepIndex = process.argv.indexOf('--grep');
    return grepIndex !== -1 ? process.argv[grepIndex+1] : undefined;
}

const grepPattern = getGrepFromCLI() ? getGrepFromCLI() : cli.flags.grep ? 
cli.flags.grep : process.env.GREP ? process.env.GREP : undefined;

console.log('grepPattern:', grepPattern);

export const customizer = (
    objValue: string | string[],
    srcValue: string | string[],
): string | string[]=> {
    if(isArray(objValue)){
        return objValue.concat(srcValue);
    }
    return objValue;
}

export const config: Options.Testrunner = {
    // ...baseConfig, // one way of merging 
    runner: 'local',
    specs: [
        // './tests/specs/**/*.ts',
        // './tests/apis/**/*.ts',
        '../tests/**/*.ts',
        // './tests/specs/basics_Tests/dataType.test.ts',
    ],

    exclude: [],
    maxInstances: 2,
    /*
    capabilities earlier was a property when we have dependency called wdio-chromedriver-service.
    After uninstalled TestRunner has been changed to different type
    capabilities: [{
        browserName: "chrome",
        timeouts:{
            script: 20000,
            pageLoad: 20000;
        },
        maxInstances: 2,
        "goog:chromeOptions":{
            args: ['--disbale-gpu','--headless=false']
        },
    }, // {
        // browserName: 'firefox',
        //"moz:firefoxOptions":{
         //   args:[],
        },
        
    ],
    */
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    injectGlobals: true,
    reporters: ['spec'],

    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        retries: 2,
        grep: grepPattern ? new RegExp(grepPattern, 'i') : undefined, // Dynamically apply grep
    },
    // WDIO uses tsx to compile Tyepscript files
    tsConfigPath:path.join(process.cwd(),'/tsconfig.json'), 

    beforeSession: function () {
        console.log('Current directory:', process.cwd());
        if (grepPattern) {
            console.log(`Running tests matching: ${grepPattern}`);
        }
    },

    beforeTest: async function (test, context) {
        console.log('Test started to run with Title: ', test.title);
        // console.log('BeforeTest(): context: ' , context);
        if(process.env.PREPARE_ERROR){
            throw new Error(`Skipping Test due to preparation error: ${process.env.PREPARE_ERROR}`)
        }
    },
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        const screenshotPath = join(process.cwd(), 'screenshots', `${test.title.replace(/\s+/g, '_')}.png`);
        const screenshotBuffer = await (browser).saveScreenshot(screenshotPath);
        allureReporter.addAttachment(test.title, screenshotBuffer,'.png');
        console.log('Test completed with title: ', test.title);
        // console.log('AfterTest(): context: ' , context);
    },

    // TypeScript support 
    // The below property does not exist on type Testrunner. 
    // This occurred after I removed wdio-chromedriver-service from dependencies
    /*autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json'
        }
    },
    */
    before: async function () {
        console.log('Process Object: ', process);
        // registerBrowserCommands();
        console.log('Process.env.NODE_ENV: ' , process.env.NODE_ENV);
    },

    onPrepare: async function(config,capabilities){
        setUpGlobalErrorHandlers();
    }

}
