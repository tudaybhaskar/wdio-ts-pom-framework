import request from "supertest";

export interface Credentials{
    userName: string,
    password: string,
}

export interface TokenResponse{
    token?: string,
    expires?: Date,
    status?: string,
    result?: string,
    code?: number,
    message?: string, 
}

export class BookStoreAuthManager{

    private static authToken : string;

    public static async getAuthToken(credentials: Credentials): Promise<string>{
        const tokenResponse = await request('https://bookstore.toolsqa.com')
        .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(credentials);

        console.log('token REsponse - token : ' , tokenResponse.body.token);

        if( tokenResponse.status === 200 && tokenResponse.body.result === 'User authorized successfully.'){
            this.authToken = tokenResponse.body.token;
        }
        if( tokenResponse.status === 200 && tokenResponse.body.result !== 'User authorized successfully.'){
            return 'Authorization token not generated';
        }
        if( tokenResponse.status === 200){
            return tokenResponse.body.message;
        }
        return this.authToken;
    }
    
    
    public static async isAuthorized(token: string): Promise<boolean>{
        const requestBody: Credentials = {
            "userName": "tonystark@testmail.com",
            "password": "Changeme@123"
        }
        const authResponse = await request('https://bookstore.toolsqa.com')
        .post('/Account/v1/Authorized')
        .set('Authorization', `Bearer ${token}`) // Fixed typo in header name
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(requestBody);

        if( authResponse.status == 404 && authResponse.body.code === '1207'){
            throw new Error('User not found!')
        }
        if( authResponse.status === 200 && authResponse.body === false){
            return false;
        }
        if( authResponse.status === 200 && authResponse.body === true){
            return true;
        }
        
        return false;
    }
}