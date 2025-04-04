/**
 * An Object is a Collection of key-value pairs
 */

/**
 * We can create a Type using type <TypeName> like below
 */
export type Employee = {
    name: string;
    empId: string;
    salary: number;
    address? : Address;
    band?: string;
}

export type Address = {
    city: string;
    state: string;
}
