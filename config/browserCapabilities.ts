import path from "path";
export const chromeCapabilities = {
    browserName:'chrome',
    'wdio:enforceWebDriverClassic': true,
    acceptInsecureCerts: true,
    'goog:chromeOptions':{
        args:[
            '--disable-extensions',
            '--disable-infobars',
            '--window-size=1366,1024',
        ],
        'prefs':{
            'download.default_directory': path.join(process.cwd() , 'testDownloads'), //Set default Download directory
            'download.prompt_for_download': false,
            'safebrowsing.enabled': true,
        }
    },
    timeouts: {
        script: 20000,
        pageLoad: 20000
      },
}

export const ciChromeCapabilities = {
    browserName:'chrome',
    'wdio:enforceWebDriverClassic': true,
    acceptInsecureCerts: true,
    'goog:chromeOptions':{
        args:[
            '--disable-extensions',
            '--headles',
            '--disable-infobars',
            '--window-size=1920,1080',
        ],
    },
    platformName: 'LINUX'
}