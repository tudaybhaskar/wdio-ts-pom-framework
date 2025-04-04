import supertest from 'supertest'; 'supertest';
import { config } from '../../../config/wdio.conf';
import { error } from 'console';

export class AuthManager {
    private static authToken : string;
    private static authExpiry : Date;

    public static async getAuthToken(): Promise<String>{

        if( this.authToken && this.authExpiry > new Date()){
            return this.authToken;
        }
        /*
         Create User : https://bookstore.toolsqa.com/Account/v1/User
        {
         "userID": "292834f8-5718-411f-8aa5-6211f90b627a",
         "username": "Brucewayne@testmail.com",
         "books": []
        } 

        Get Books need an authorization
        https://bookstore.toolsqa.com/Account/v1/User/{UUID}

        https://bookstore.toolsqa.com/Account/v1/GenerateToken
        AuthToken:
        {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkJydWNld2F5bmVAdGVzdG1haWwuY29tIiwicGFzc3dvcmQiOiJDaGFuZ2VtZUAxMjMiLCJpYXQiOjE3NDMxMzE0ODB9.RGFBYsCAF_qMA8ps_fR4WKUuyHxU8VGHRulQ1uy7pGY",
  "expires": "2025-04-04T03:11:20.025Z",
  "status": "Success",
  "result": "User authorized successfully."
}
         * 
         */

        const authResponse = await supertest('https://AuthUrlProvider.com')
        .post('/auth/login')
        .send({
            username: process.env.TEST_USERNAME || 'testuser',
            password: process.env.TEST_PASSWORD || 'testpass'
        });

        if( authResponse.status != 200 ){
            throw new Error('Auhthentication is failed');
        }

        this.authToken = authResponse.body.token;
        // Set expiry (e.g., 1 hour from now)
        this.authExpiry = new Date(Date.now() + 3600 * 1000); // 3600 ms * 1000 = 1 hour

        return this.authToken;
    }
}