import { config } from "dotenv"
config()
export const puerto = {
    port: process.env.PORT || 4000,
}



//Aqui van los datos para la conexión hacia la base de datos
export const databaseWikInventario = {
    user: process.env.DB_USER_Inventario ||'',
    password: process.env.DB_PASSWORD_Inventario||'',
    database: process.env.DB_DATABASE_Inventario||'',
    server: process.env.DB_SERVER_Inventario||''
}

export const claves = {
    masterKey : "WIK_ONLINE_IS_THE_BEST_OPTION"
}