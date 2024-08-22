//Importanmos la conexion de la base de datos
import {pool} from '../database/conections/db_innovaTube_by_mysql2.js';

//Importamos modulos creados por el propio desarrolador
import * as validateField  from '../security/validarCampos.js';
import * as validateObjects from '../security/validarCampos.js'; 
import * as errorHandler from '../error/errorHandler.js'

//Importamos modelos 
import * as userModel from '../models/models_usuario_msql2.js';

//#region GET DATA FROM InnovaTube
//Controllador para obtener la cuenta de la base de datos
export const getAccount = async (req, res) => {
    try{
        const result = await pool.query('SELECT 1 as queso');
        res.json(result);
    }catch(err){
        console.error('Error getting account data', err);
        res.status(500).json({message: 'Error getting account data'});
    }finally{
        pool.releaseConnection();
    }
}
//#endregion

//#region POST DATA

export const createAccount = async (req, res) => {
    let registroCuenta = userModel.userModel;
    registroCuenta = req.body;

    //Validar los campos
    try {
        //Se valida que el id no se repita 
        if(!(validarIdUsuario(registroCuenta.id_usuario)) && !(validarCorreoElectronico(registroCuenta.correo_electronico))) { 
            
            //validar que las dos contraseñas sean iguales
            let contrasenaValidada = () =>{
                if((registroCuenta.contrasena1 === registroCuenta.contrasena2)){
                    return contrasena;
                }else{
                    return null;
                }
            }

            let respuesta = await pool.query(`CALL registrar_usuario_cuenta(?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [
                    registroCuenta.id_usuario,
                    registroCuenta.nombre,
                    registroCuenta.apP,
                    registroCuenta.apM,
                    registroCuenta.fecha_nacimiento,
                    registroCuenta.genero,
                    registroCuenta.correo_electronico,
                    registroCuenta.contrasenaValidada,
                    Date.now()
                ]
            ); 

        }else{
            return res.status(401).json(
                {
                    status: 401,
                    message: 'El ID de usuario o el correo electrónico ya existen'
                }
            );
        }
    } catch (error) {
        return errorHandler.resError(error);
    }

    
};

//#endregion

/**
 * Validates if the given user ID already exists in the database.
 *
 * @param {string} id_usuario - The user ID to be validated.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user ID already exists, and false otherwise.
 *
 * @throws Will throw an error if there is a problem with the database query.
 *
 * @example
 * // Example usage:
 * try {
 *     let idExists = await validarIdUsuario('user123');
 *     if (idExists) {
 *         console.log('User ID already exists');
 *     } else {
 *         console.log('User ID is available');
 *     }
 * } catch (error) {
 *     console.error('Error validating user ID:', error);
 * }
 */
async function validarIdUsuario(id_usuario){
    try {
        //
        if(!(validateField.validateString(id_usuario))){
            let [rows] = await pool.query(`SELECT id_usuario FROM usuario WHERE id_usuario = ?`,[id_usuario]);
            if(rows.length > 0){
                return true;
            }else{
                return false;
            }
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Validates if the given email already exists in the database.
 *
 * @param {string} correo_electronico - The email to be validated.
 * @returns {Promise<boolean>} - A promise that resolves to true if the email already exists, and false otherwise.
 *
 * @throws Will throw an error if there is a problem with the database query.
 *
 * @example
 * // Example usage:
 * try {
 *     let emailExists = await validarCorreoElectronico('user@example.com');
 *     if (emailExists) {
 *         console.log('Email already exists');
 *     } else {
 *         console.log('Email is available');
 *     }
 * } catch (error) {
 *     console.error('Error validating email:', error);
 * }
 */
async function validarCorreoElectronico(correo_electronico){
    try{
        if(!(validateField.validateEmail(correo_electronico))){
            let [rows] = await pool.query(`SELECT correo_electronico FROM usuario WHERE correo_electronico =?`,[correo_electronico]);
            if(rows.length > 0){
                return true;
            }else{
                return false;
            }
        }
    }catch(err){
        return errorHandler.resError(err, validarCorreoElectronico.name);
    }
};

