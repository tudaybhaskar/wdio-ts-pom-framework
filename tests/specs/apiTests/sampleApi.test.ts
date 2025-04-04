import { browser, expect } from '@wdio/globals';

describe('API Testing', () => {
    it('should make an API request', async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        console.log('API Response:', data);
        expect(data.id).toBe(1);
    });
});