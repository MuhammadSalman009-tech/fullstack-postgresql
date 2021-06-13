import {Pool} from 'pg';
import dotenv from "dotenv";
dotenv.config()

export const pool=new Pool({
    host:'localhost',
    user:'postgres',
    password:process.env.DB_PASSWORD,
    port:5432,
    database:'facebook'
})