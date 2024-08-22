//Importacion de modulos de terceros
import {createPool} from 'mysql2/promise'

//Importacion de los modulos locales creados por el desarrollador
import { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT} from '../../config.js'




export const pool = createPool(
    {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: DB_PORT,
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0,
    }
)