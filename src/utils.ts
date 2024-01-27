import { parse } from 'qs';

export const capitalize = (str: string): string => {
	return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

export const extractQuery = (url: string): Record<string, string | number | object | Array<string>> => {
	const queryString = new URL(url).search;
	const queryObject = parse(queryString, {
		allowDots: true,
		ignoreQueryPrefix: true
	});

	return setNumericValues(queryObject);
};

export const queryNeedsParsing = (url: string): boolean => {
	const queryString = new URL(url).search;
	const parsedChars = ['.', '['];

	for (const char of parsedChars) {
		if (queryString.includes(char)) {
			return true;
		}
	}

	return false;
};

export const flipObject = (obj: Record<string, string>): Record<string, string> => {
	return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
};

function setNumericValues(obj: Record<string, any>): Record<string, any> {
	
	for (const key in obj) {
		if (typeof obj[key] === 'object') {
			obj[key] = setNumericValues(obj[key]);
		}

		if (!isNaN(+obj[key])) {
			obj[key] = +obj[key];
		}
	}

	return obj;
}

