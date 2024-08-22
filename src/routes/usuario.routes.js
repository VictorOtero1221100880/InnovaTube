//Importamos librerias de terceros o del nucleop de nodejs
import { Router } from "express";
import * as usuarioControllers from "../controller/usuario.controller.js";

const router = new Router();


//#region GET INFORMATIONAL
router.get('/getAccount', usuarioControllers.getAccount);


//#endregion

export default router;