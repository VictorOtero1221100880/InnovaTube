/**
 * This function handles and formats an error response for a server-side operation.
 *
 * @param {Error} error - The error object that occurred during the operation.
 * @param {string} moduleName - The name of the module where the error occurred.
 *
 * @returns {Object} An object representing the error response with a status code and error message.
 *  - status: The HTTP status code for the response.
 *  - error: A user-friendly error message.
 */
export async function resError(error, moduleName) {  
    console.log(error.message+"\n"+"Modulo: "+moduleName);
    try {
        return {
            status: 500,
            error: `Se ha tenido un error innesperado dentro del servidor`
        }
    } catch (error) {
        return {
            status: 501,
            error: 'No se ha podido definir el error'
        }
    }
}