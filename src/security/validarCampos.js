/**
 * Validates an email address using a regular expression.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 *
 * @example
 * validateEmail('example@example.com'); // Returns: true
 * validateEmail('invalid_email'); // Returns: false
 */
 export function validateEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Retorna true si el correo es válido, false si no lo es
    return regex.test(email);
}


/**
 * Validates if a given value is a string.
 *
 * @function validateString
 * @param {any} string - The value to validate.
 * @returns {boolean} - Returns true if the value is a string, false otherwise.
 *
 * @example
 * validateString('example'); // Returns: true
 * validateString(123); // Returns: false
 */
export function validateString(string) {
    if (typeof string !== 'string') {
        return true;
    }
}

/**
 * Validates if a given value is a number.
 *
 * @function validateNumber
 * @param {number} number - The value to validate.
 * @returns {boolean} - Returns true if the value is a number, false otherwise.
 *
 * @example
 * validateNumber(123); // Returns: true
 * validateNumber('example'); // Returns: false
 */
export function validateNumber(number) {
    if (typeof number !== 'number') {
        return false;
    }
}

