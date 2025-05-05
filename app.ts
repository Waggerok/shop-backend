import express from 'express';
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const PORT = process.env.PORT!

const start = async() => {
    try {
        app.listen(PORT, () => console.log(`Server has started on ${PORT} port`))
    }
    catch(error) {
        console.log('Ошибка запуска сервера', error);
    }
}

start();