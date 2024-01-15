import { fields } from './validation/schemas/transaction';

const errorTypes = {
	validation: 'VALIDATION',
	parse: 'PARSE',
	notFound: 'NOT_FOUND',
	internal: 'INTERNAL_SERVER_ERROR'
};

const GENERIC_VALIDATION_MESSAGE = 'One or more fields are invalid';
function extractErrorField(errorMessage: string): string {
	errorMessage = errorMessage.split('\n')[0] ?? null;
	if (!errorMessage) {
		return '';
	}
	
	let i = 0, errorField = '';
	while(i < fields.length) {
		if (errorMessage.includes(fields[i])){
			errorField = fields[i];
			break;
		}
		i++;
	}

	return errorField;
}

export type errorObject = {
	code: string,
	message: string
}

export const handleError = (error: errorObject): {
	httpStatus: number,
	errorObject: {
		error: string
	}
} => {
	const errorObj = error as {code: string, message: string};
	let httpStatus: number, errorMessage: string;
	let errorField: string;
	switch (errorObj.code) {
	case errorTypes.validation:
		httpStatus = 400;
		errorField = extractErrorField((error as {message: string}).message);
		errorMessage = errorField ? `Invalid field: ${errorField}` : GENERIC_VALIDATION_MESSAGE;
		break;
	case errorTypes.parse:
		httpStatus = 400;
		errorMessage = 'Bad Request';
		break;
	case errorTypes.notFound:
		httpStatus = 404;
		errorMessage = 'Not found';
		break;
	case errorTypes.internal:
	default:
		httpStatus = 500;
		errorMessage = 'Internal Server Error';
		break;
	}
	
	return {
		httpStatus, 
		errorObject: {
			error: errorMessage
		}
	};
};
