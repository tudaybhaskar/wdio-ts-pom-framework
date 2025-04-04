import { Employee } from '../../../basicsLearning/objectsLearing';
import { expect} from 'chai';
describe('Object type - Test Suite', function(){
    it('Modify an object', async ()=>{
        /**
         * An Object is a collection of Key-Value pairs
         */
        let employee: Employee[]  = [
            { name: 'John', empId: 'E111', salary: 60000 },
            { name: 'Alice', empId: 'E333', salary:70000 },
            { name: 'Bruce', empId: 'E355', salary: 80000},
        ]

        expect(employee[0].empId).to.equal('E111');

        employee.forEach(emp => {
            if (emp.empId < 'E300') {
                emp.band = 'A'; // Adding 'Band' property if condition matches
            }
        });


    });
})