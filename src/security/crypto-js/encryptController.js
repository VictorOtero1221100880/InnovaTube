//Se importa la libreria de encripacion.
import CryptoJS from "crypto-js";

import { claves } from "../../config";


let masterWord = claves.masterKey

/**
 * @function EncriptNumber
 * @param {*} number 
 * A number to encrypt 
 * @description The function EncriptNumbers allows
 * encrypting numbers by converting them into strings in order to perform encryption using AES.
 * @example 
 * import * as CryptoJs from "Path where the .js file is located."
 * var number = 1234567890
 * var numberEncripted = await CryptoJs.EncriptNumber(number)
 * console.log(numberEncripted)
 * @returns  encrypted string or null
 * @author Victor Javier Otero Vizcayno
 * @dateCreation 21/08/2024
 * @dateUpdate --/--/----
 */
export function EncriptNumber(number) {
    try {
        let numberChain = number.toString()

        return CryptoJS.TripleDES.encrypt(numberChain, masterWord,  {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          }).toString();
    } catch (error) {
        return Error(error, EncriptNumber.name)

    }
}


/**
 * @function DecryptNumber
 * @param {*} number 
 * A string to decrypt 
 * @description The function DecryptNumber allows decrypting 
 * a number from an encrypted string using AES.
 * @example 
 * import * as CryptoJs from "Path where the .js file is located."
 * var number = "Here should go the encrypted string of the number."
 * var numberEncripted = await CryptoJs.DecryptNumber(number)
 * console.log(numberEncripted)
 * @returns Decrypted number or null
 * @author Victor Javier Otero Vizcayno
 * @dateCreation 21/08/2024
 * @dateUpdate --/--/----
 */
export function DecryptNumber(number) {
    try {
        // Descifrar la cadena de texto encriptada utilizando AES
        var bytesDescifrados = CryptoJS.TripleDES.decrypt(number, masterWord, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          });
        var numeroDescifradoCadena = bytesDescifrados.toString(CryptoJS.enc.Utf8);

        // Convertir la cadena de texto descifrada en un número
        var numeroDescifrado = parseInt(numeroDescifradoCadena);
        return numeroDescifrado;

    } catch (error) {
        return Error(error, DecryptNumber.name)
    }
}


/**
 * @function EncryptString
 * @param {*} word 
 * A word to Encrypt 
 * @description 
 * The function EncryptString allows encrypting a word using AES.
 * @example 
 * import * as CryptoJs from "Path where the .js file is located."
 * var string = "I'm a example. Haha" 
 * var wordEncrypted = await CryptoJs.EncryptString(string)
 * console.log(numberEncripted)
 * @returns Encrypted string or null
 * @author Victor Javier Otero Vizcayno
 * @dateCreation 21/08/2024
 * @dateUpdate --/--/----
 */
export function EncryptString(msg) {
        try {
        let msgEncrypted = CryptoJS.TripleDES.encrypt(msg, masterWord, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          });
        return msgEncrypted.toString();
    } catch (error) {
        Error(error, EncryptString.name)
        return ""
    }
}

/**
 * @function DecryptString
 * @param {*} word 
 * A word to Decrypt 
 * @description 
 * The function Decrypt a string using AES.
 * @example 
 * import * as CryptoJs from "Path where the .js file is located."
 * var string = "Here should go the encrypted string"
 * var wordDecrypted = await CryptoJs.DecryptString(string)
 * console.log(wordDecrypted)
 * @returns Decrypted string or null
 * @author Victor Javier Otero Vizcayno
 * @dateCreation 21/08/2024
 * @dateUpdate --/--/----
 */
export function DecryptString(msg) {
    try {
        try {
            let msgDecrypted =  CryptoJS.TripleDES.decrypt(msg, masterWord, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
              });
            let msgString = msgDecrypted.toString(CryptoJS.enc.Utf8)
            return msgString.trim();
        
        } catch (error) {
            return Error(error, DecryptString.name)
        }
    } catch (error) {
        return Error(error, DecryptString.name)
    }
}

export function encryptJson(JSONObject){
    try {
        let jsonData = JSON.stringify(JSONObject)
        let encriptJson = CryptoJS.TripleDES.encrypt(jsonData, masterWord, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          }).toString();
        
        return encriptJson
    } catch (error) {
        Error(error, encryptJson.name)
    }
}

export function decryptJson(JSONObject){
    try {
        let decryptjson = CryptoJS.TripleDES.decrypt(JSONObject, masterWord, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8)
    
        let jsonDecrypt = JSON.parse(decryptjson)
        return jsonDecrypt
    } catch (error) {
        Error(error, decryptJson.name)
    }
}


//--------------FUNCIONES PRIVADAS------------------
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
 * @returns {null}
 * @author Victor Javier Otero Vizcayno
 * @dateCreation 21/08/2024
 * @dateUpdate --/--/----
 */
function Error(error, modulo) {
    console.log('Ha ocurrido un error en: ' + modulo);
    console.log('El error es el siguiente \n' + error.message);
    return null;
}
