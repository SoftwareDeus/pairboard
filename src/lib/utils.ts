// Utility method for string validation/checking

/**
 * Checks if a string is empty (i.e., "")
 * @param str - The string to be checked
 * @returns True if the string is empty, false otherwise
 */
export function isEmptyString(str: string): boolean {
	return str === '';
}

/**
 * Checks if a string is null, undefined, or empty (i.e., "", null, or undefined)
 * @param str - The string to be checked
 * @returns True if the string is null, undefined, or empty, false otherwise
 */
export function isNullOrEmptyString(str: string | null | undefined): boolean {
	return str === null || str === undefined || str === '';
}

/**
 * Checks if a string is a valid email address
 * @param email - The string to be checked
 * @returns True if the string is a valid email address, false otherwise
 */
export function isValidEmail(email: string): boolean {
	// Regular expression for email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Utility method for object validation

/**s
 * Checks if an object is empty (i.e., has no own enumerable properties)
 * @param obj - The object to be checked
 * @returns True if the object is empty, false otherwise
 */
export function isEmptyObject(obj: object): boolean {
	return Object.keys(obj).length === 0;
}

/**
 * Checks if an object is null, undefined, 
 * or empty (i.e., null, undefined, or has no own enumerable properties)
 * @param obj - The object to be checked
 * @returns True if the object is null, undefined, or empty, false otherwise
 */
export function isNullOrEmptyObject(obj: object | null | undefined): boolean {
	return obj === null || obj === undefined || isEmptyObject(obj);
}
