import {config} from 'dotenv'

// Load environment variables from .env file

config()


//#region Exports
//Puerto del servicio
export const PORT = process.env.PORT || 3000;

//Credenciales de la base de datos innovaTube

export const DB_USER = process.env.DB_USER || 'admin_innovatube';
export const DB_PASSWORD = process.env.DB_PASSWORD || '@hola1234';
export const DB_NAME = process.env.DB_NAME || 'innovaTube';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;

export const claves = process.env.CLAVES || [];

//#endregion