import dotenv from 'dotenv';
dotenv.config();

export default {
    DB: process.env.DB_DOMAIN,
    APP_PORT: process.env.APP_PORT,
    OPTIONS: { 
        useNewUrlParser: true,
        useCreateIndex: true,
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD
    }
};