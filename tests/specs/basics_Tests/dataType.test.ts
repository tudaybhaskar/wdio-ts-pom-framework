import { expect } from "chai";

describe('Test on DataTypes', ()=>{
    it('Tuple and Union Types in TS', async()=>{
        let unionValue : string | number = 'test';
        let unionValue1 : string | number = 577;

        expect(typeof unionValue).to.equal('string');
        expect(typeof unionValue1).to.equal('number');
    });
})