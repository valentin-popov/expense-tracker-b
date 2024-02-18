import userService from '../database/service/user';
import { errorTypes } from '../errorHandler';
import { mapFromDocument } from '../resources/user';
import { generateJWT, verifyJWT, hashPassword } from '../utils';

type Credentials = {
	username: string,
	password: string
}

const ERR_INV_CRED = 'Invalid credentials';
const ERR_INV_TOKEN = 'Invalid or expired authorization token';


export default {
	createToken: async (cred: Credentials) => {
		const dbUser = await userService.findByCredentials(cred.username, hashPassword(cred.password));
		if (!dbUser) {
			throw {
				message: ERR_INV_CRED,
				code: errorTypes.unauthorized
			};
		}
		const user = mapFromDocument(dbUser);
		return generateJWT({
			userId: user.userId
		});
	},
	verifyToken: (authHeader: string | null) => {
		const authError = {
			message: ERR_INV_TOKEN,
			code: errorTypes.unauthorized
		};

		if (!authHeader) {
			throw authError;
		}

		const headerValues = authHeader.split(' ');
		if (headerValues.length < 2 || headerValues[0] !== 'Bearer') {
			throw authError;
		}

		try {
			return verifyJWT(headerValues[1]);
		} catch(exc) {
			throw authError;	
		}
	}
};
