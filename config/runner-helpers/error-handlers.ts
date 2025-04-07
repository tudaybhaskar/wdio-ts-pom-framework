import { error } from "console";

export function setUpGlobalErrorHandlers(): void{
    process.on('unhandledRejection', (reason, promise)=>{
        console.error('Unhandled Rejection at: ', promise, 'reason:', reason);
    });

    process.on('uncaughtException',(error, origin)=>{
        console.error('Uncaught Exception:', error, 'Origin:', origin);
    });

}