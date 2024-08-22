
/**
 * Validates an object to ensure no null or undefined values exist.
 *
 * @param {Object} obj - The object to validate.
 * @returns {void}
 */
export function validateNoNullValues(obj){
    for (var key in obj){
        if (obj[key] === null || obj[key] === undefined){
            return true;
        }
    }
}

/**
 * Validates an object to ensure no empty strings exist.
 *
 * @param {Object} obj - The object to validate.
 * @returns {true || false}
 */
export function validateNoEmptyStrings(obj){
    for (var key in obj){
        if (typeof obj[key] === 'string' && obj[key].trim() === ''){
            return true
        }
    }
}

/**
 * Validates an object to ensure no empty arrays exist.
 *
 * @param {Object} obj - The object to validate.
 * @returns {boolean} Returns true if an empty array is found, otherwise false.
 */
export function validateNoEmptyArrays(obj){
    for (var key in obj){
        if (Array.isArray(obj[key]) && obj[key].length === 0){
            return true;
        }
    }
}

/**
 * Validates an object to ensure no empty objects exist.
 *
 * @param {Object} obj - The object to validate.
 * @returns {boolean} Returns true if an empty object is found, otherwise false.
 *
 * @example
 * validateNoEmptyObjects({name: 'John', age: 25, address: {}}); // Returns true
 * validateNoEmptyObjects({name: 'John', age: 25, address: {street: '123 Main St'}}); // Returns false
 */
export function validateNoEmptyObjects(obj){
    for (var key in obj){
        if (typeof obj[key] === 'object' && obj[key] !== null && Object.keys(obj[key]).length === 0){
            return true;
        }
    }
}
