import nodemailer from 'nodemailer';
import { getConnectionToWikInventory, sql } from '../../database';





//------------------------Variables y objetos globales -------------------
const fechaActual = new Date();

const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo que se suma 1
const anio = fechaActual.getFullYear();
const hora = fechaActual.getHours();
const minutos = fechaActual.getMinutes();
const segundos = fechaActual.getSeconds();

// Crear un transportador SMTP utilizando hotmail
let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "", // generated ethereal user
    pass: "", // generated ethereal password
  },
}
);

// --Funciones publicas

/**
@function sendMail
@param {number} opcion - Opción que indica el tipo de correo a enviar.
@param {string} identificador - Identificador relacionado al correo.
@description Esta función permite enviar correos electrónicos con diferentes propósitos según la opción proporcionada.
@throws {Error} Error al enviar el correo electrónico.
@returns {Promise<void>} Promesa que indica la finalización del envío del correo electrónico.
@author [Victor Javier Otero Vizcayno]
@creationDate [21/08/2024]
@updateDate [--/--/----]
*/
export async function sendMail(opcion, identificador) {
  try {
    switch (opcion) {
      //Intento de inicio de sesion
      case 1:
        await intentoInicioSesion(identificador)
        break;
      //Eliminacion de usuario   
      case 2: 
      
      break;
      default:
        break;
    }



  } catch (error) {
    Error(error, sendMail.name)
  }
}

//-----------------------------funciones --------------------------

//Descripcion pendiente
async function intentoInicioSesion(identificador){
  let datos = await datosUsuario(identificador);
  console.log(datos)

  let msgenvioIntentoInicio = 
  `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
  <div class= "contianer position-relative"">
  <img src="" class="position-absolute top-0 start-50 translate-middle" alt="">
  <div class="position-absolute top-50 start-50 translate-middle">
      <p>Querido usuario: ${datos.nombre} ${datos.apP} ${datos.apM}</p>
      <p>Hemos detectado que alguien intenta iniciar sesión</p>
      <p>Si eres tu el que esta iniciando sesion ignora el correo y suerte en tu trabajo</p>
      <p>Fecha de intento de inicio de sesion: ${dia}/${mes}/${anio}</p>
      <br>
      <br>
      <br>
      <br>
      <br>
      <p>Atte: InnovaTube</p>
  </div>
  </div>
  </body>
  </html>
  `

  //Configuramos el correo electronico
  let mailOptions = {
    from: 'lokote80@hotmail.com',
    to: datos.correoElectronico,
    subject: 'Intento de inicio de sesion InnovaTube',
    html: msgenvioIntentoInicio,
    text: 'Este es un correo de prueba enviado desde InnovaTube con [] no contestar.',
  };

  // Enviar el correo electrónico
  let info = await transporter.sendMail(mailOptions);
  connectionTimeout: 10000, // Aumenta el valor del tiempo de espera (en milisegundos)


  console.log('Mensaje enviado: %s', info.messageId);
  console.log('URL de vista previa: %s', nodemailer.getTestMessageUrl(info));
}

//Pendiente
async function eliminacionDeCuenta(identificador){
  
}

/**
@function datosUsuario
@param {string} id - Identificador del usuario.
@description Esta función obtiene los datos de un usuario mediante su identificador.
@throws {Error} Error al obtener los datos del usuario.
@returns {Promise<Object|null>} Promesa que resuelve con un objeto que contiene los datos del usuario o null si no se encontró ningún usuario con el identificador proporcionado.
@author [Victor Javier Otero Vizcayno]
@creationDate [21/08/2024]
@updateDate [--/--/----]
*/
async function datosUsuario(id) {
  const pool = await getConnectionToWikInventory(datosUsuario.name)
  try {
    const respuesta = await pool.request()
      .input("identificador", sql.VarChar, id)
      .query(
        "SELECT nombre, apP, apM, correoElectronico FROM [Wik_Inventory].[dbo].[usuarios] where (id_usuario = @identificador) OR (correoElectronico = @identificador)"
      )
      console.log(respuesta)

    switch (respuesta.rowsAffected[0]) {
      case 1:
        return respuesta.recordset[0]
      default:
        return null
    }
  } catch (error) {
    return Error(error, datosUsuario.name)

  }
}


/**
 * @function Error
 * @param {*} error 
 * @param {*} modulo
 * @description This function should be used within the try-catch block. 
 * In the catch part, you can send the error. 
 * It should also receive the name of the module that uses this function. 
 * @example
 * function example(){}
 *  try{
 *      ***code***
 *  }catch(error){
 *      return Error(error, example.name)
 *  }
 * }
 * @returns Object JSON and Status 
 * @example 
 * {
 *  status: number,
 *  msg: string,
 *  respuesta: error encrypted
 * }
 * @author Victor Javier Otero Vizcayno
 * @dateCreation 21/08/2024
 * @dateUpdate --/--/----
 */
async function Error(error, metodo) {
  console.clear()
  console.log("Se ha tenido un error en: " + metodo)
  console.error(error.message)
  console.log("Descripción del error a mas detalle:\n\n")
  console.log(error)
  let respuesta =
  {

    status: 500,
    msg: "Ha ocurrido un error interno en el servidor",
    respuesta: error

  }
  return respuesta;
}

//--------------------------------Diseños de correo----------------------


//Cuerpo html
let EMPIEZO_BODY =`
`

let TERMINO_BODY= `

`;

//CSS de correo