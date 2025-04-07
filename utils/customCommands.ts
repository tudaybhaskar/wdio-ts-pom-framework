import { ChainablePromiseElement } from "webdriverio";

export const registerBrowserCommands = ()=>{
/**
 * last parameter is of boolean that binds the command to element instance if set to true. 
 * False -> binds to browser
 */
browser.addCommand('waitAndSetValue', async function(this:WebdriverIO.Browser, selector: string, value: string):Promise<void>{
    const element = await $(selector);
    await element.waitForExist({ timeout: 15000 });
    await element.waitForDisplayed({ 
        timeout: 15000,
        timeoutMsg: `${selector} not visible after 15s`
    });
    await element.waitForEnabled({ timeout: 5000 });
    await element.scrollIntoView();
    await element.setValue(value);

}, false);
}