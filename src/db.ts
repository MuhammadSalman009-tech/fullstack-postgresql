import {Pool} from 'pg';

export const pool=new Pool({
    host:'localhost',
    user:'postgres',
    password:'salman009',
    port:5432,
    database:'facebook'
})