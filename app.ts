import express from 'express';
import dotenv from 'dotenv';
import {sequelize} from './database/database';
import userRouter from './routes/userRouter';
import feedbackRouter from './routes/feedbackRouter';
import productRouter from './routes/productRouter';

const models = require('./models/models');

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("static"));
app.use('/api/product', productRouter)
app.use('/api/user', userRouter);
app.use('/api/feedback', feedbackRouter);

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