import lodash from 'lodash';
import { config as baseConfig, customizer } from './wdio.conf';
import { chromeCapabilities } from './browserCapabilities';
const { mergeWith } = lodash;

export const config = mergeWith({}, baseConfig,
    {
        capabilities:[chromeCapabilities],
        logLevels:{
            '@wdio/runner':'error',
            'webdriverio': 'error'
        },
        reporters:[
            [
                'allure',
                {
                    outputDir: 'wdio/allure-results',
                    disableWebdriverStepsReporting: true, // Request and Response will be captured if set to true
                    disableWebdriverScreenshotsReporting: false,
                    issueLinkTemplate:'https://template.com/test-01/{}',
                    addConsoleLogs: true,

                }
            ]
        ]
    }, customizer
)