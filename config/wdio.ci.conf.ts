import mergewith from 'lodash/mergeWith';
import { config as baseConfig, customizer } from './wdio.conf';
import { ciChromeCapabilities } from './browserCapabilities';
import { hostname } from 'os';

export const config = mergewith(
    {
        runner: 'local',
        hostname: 'localhost',
        port: 4444,
        path: '/wd/hub', // Selenium Grid
        services:[],
        logLevels:{
            '@wdio/runner':'error',
            'webdriverio': 'error'
        },
        capabilities:[ciChromeCapabilities],
        maxInstances: 2, //Run tests in parallel
        reporters:[
            [
                'allure',
                {
                    outputDir: 'allure-results',
                    disableWebdriverStepsReporting: false, // Request and Response will be captured if set to true
                    disableWebdriverScreenshotsReporting: false,
                    issueLinkTemplate:'https://template.com/test-01/{}',
                    addConsoleLogs: false,
                }
            ]
        ],
    },baseConfig, customizer
)