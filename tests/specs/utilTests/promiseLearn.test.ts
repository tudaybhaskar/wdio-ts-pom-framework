import { error } from "console";

describe('Usage of Promises', ()=>{
    it('Test on Promise.all() method ', async()=>{
        const promises = [
            Promise.resolve('Task 1 completed'),
            Promise.resolve('Task 2 completed'),
            Promise.reject('Task 3 completed'),
          ];

        await Promise.all(promises);
    })
})