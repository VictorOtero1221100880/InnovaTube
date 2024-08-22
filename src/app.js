//Importanmos librerias externas 
import express from 'express';

//Importamos los modulos de las rutas
import usuarioRoutes from './routes/usuario.routes.js';

//Se contruye el objeto de express
const app = express();

//#region Middleware
app.use(express.json());

//#endregion

//#region Rutas
app.use('/api/usuarios', usuarioRoutes);
//#endregion

//En caso de no encontrar rutas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
    next();
    }
);

export default app;