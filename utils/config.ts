import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
})
/*
interface Config{
   spiderman:{
    userID: string,
    username: string,
    password: string
   } 
}
   */

export default {
    spiderman: {
        userID: process.env.USERID || '',
        username: process.env.USERNAME || '',
        password: process.env.PASSWORD || ''
    }
}