import { globallyExcludedFields } from '../common';
import { User } from '../models';

export default {

	findByCredentials: async(username: string, password: string) => {
		return await User.findOne({
			username: username,
			password: password
		}, globallyExcludedFields).lean().exec();
	}
	
};
