import { registerBrowserCommands } from "../../../../utils/customCommands";
describe('Login Suite - OpenCart', function(){

    it('Verify Login with valid credentials', async()=>{
        await browser.url('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    await browser.waitUntil(
        async () => (await browser.getTitle()).includes('Account Login'),
        { timeout: 15000, timeoutMsg: 'Page not loaded after 15s' }
    );

    // Fill form with enhanced waiting
    await browser.$('#input-email').setValue('tonystark@testmail.com');
    await browser.$('#input-password').setValue('changeme');
    
    // Click with proper waiting
    const loginBtn = await $('[value="Login"],[type="submit"]');
    await loginBtn.waitForClickable({ timeout: 10000 });
    await loginBtn.click();
    
    // Verify navigation
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('route=account/account'),
        { timeout: 15000 }
    );
    })

})