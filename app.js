//Modulos necesarios para el funcionamiento de la app
import express from "express";
import timeout from 'connect-timeout';
import  {puerto}  from "./config";
const cors = require('cors')


//Importacion de las rutas que utilizara el API
import productRoutes from './routes/productRoutes'
import loginRoutes from './routes/loginRoutes'
import employeeRoutes from './routes/employeeRoutes'

//Creacion de objetos
const app = express()

//Settings
app.set('port', puerto.port || 366)



//middlewares
app.use(timeout('30s')); // Aumenta el tiempo de espera a 30 segundos
app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(cors({origin: "http://localhost:4200"}))

//routes
app.use(loginRoutes);
app.use(productRoutes);
app.use(employeeRoutes)
// Manejador de timeout
app.use((req, res, next) => {
    if (!req.timedout) {
      next();
    }
  });


//Exportacion de objetos
export default app