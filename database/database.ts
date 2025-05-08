import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
    {
        dialect : 'postgres',
        host : process.env.DB_HOST,
        port : process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
        logging : console.log
    }

)