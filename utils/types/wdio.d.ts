declare namespace WebdriverIO{
    interface Browser {
        waitAndSetValue: (selector:string, value: string)=> Promise<void>
    }
}