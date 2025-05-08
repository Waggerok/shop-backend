import express from 'express';
import dotenv from 'dotenv';
import {sequelize} from './database/database';

const models = require('./models/models');

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT!

const start = async() => {
    try {
        console.log('Trying to connect to database');
        await sequelize.authenticate();
        console.log('Database connection succesful');
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server has started on ${PORT} port`))
    }
    catch(error) {
        console.log('Ошибка запуска сервера', error);
    }
}

start();