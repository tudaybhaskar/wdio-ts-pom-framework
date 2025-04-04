import UserInfo from '../../../apis/apiTestData/users.json';
import { BookStoreAuthManager, Credentials} from '../../../apis/apiTestData/bookStoreAuth';
import request from 'supertest';

describe('BookStore API Test suite', function() {

    const userCreds: Credentials = {
        userName : UserInfo.IronMan.username,
        password : 'Changeme@123'
    };

    let token : string;

    before( async()=>{
        const userToken = UserInfo.IronMan.token;
        console.log('Check token for Ironman: ' , userToken);
        let userAuthorized: boolean = await BookStoreAuthManager.isAuthorized(UserInfo.IronMan.token);
        console.log('Check UserAuthrorized: ' , userAuthorized);
        if(!userAuthorized){
            token = await BookStoreAuthManager.getAuthToken(userCreds);
            console.log('token generated for Ironman: ' , userToken);
            userAuthorized = await BookStoreAuthManager.isAuthorized(token);
            console.log('UserAuthrorized: ' , userAuthorized);
        }
        token = userToken;
        try{
            expect(userAuthorized).toBe(true)
        }catch(error){
            throw new Error('User is not Authorized');
        }
    });
        
    it('Verify Endpoint - Get user BookStoreAPI', async()=>{
        const getUserResponse = await request('https://bookstore.toolsqa.com')
        .get(`/Account/v1/User/${UserInfo.IronMan.userId}`)
        .set('Authorization',`Bearer ${token}`)
        .set('Accept', 'application/json');

        expect(getUserResponse.statusCode).toBe(200);
        expect(getUserResponse.body.username).toBe(UserInfo.IronMan.username);
    })

    it('Verify env Variables - USERID',  async()=>{
        const userID = process.env.userID;
        console.log('USERID: ' , userID);
        expect(userID).toBe('731f79b9-d72d-4982-96af-0b52a48f25f8');
    })
}) 