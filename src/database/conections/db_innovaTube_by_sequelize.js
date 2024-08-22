import {Sequelize} from 'sequelize'

import { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT} from '../../config.js'


export const sequelize = new Sequelize(DB_NAME, DB_HOST, DB_PASSWORD,
    {
        host: DB_HOST,
        dialect:'mysql',
        logging: false,
        define: {
            timestamps: false,
        }
    }
)

