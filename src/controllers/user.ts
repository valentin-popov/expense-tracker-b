import { 
	build, 
	UserInput, 
	mapToDocument,
	User
} from '../resources/user';
import userService from '../database/service/user';

import { hashPassword } from '../utils';
export default {
	create: async function (params: UserInput): Promise<Omit<User, 'password'>> {
		const user = build(params);
		await userService.bulkInsert([mapToDocument({
			...user,
			password: hashPassword(params.password)
		})]);


		return user;
	}

};