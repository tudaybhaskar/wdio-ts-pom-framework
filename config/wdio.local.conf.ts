import mergewith from 'lodash/mergeWith';
import { config as baseConfig, customizer } from './wdio.conf';

export const config = mergewith(
    {
        logLevels:{
            '@wdio/runner':'error',
            'webdriverio': 'error'
        }
    },baseConfig, customizer
)