import { globallyExcludedFields } from '../common';
import { User } from '../models';

export default {

	findByCredentials: async(username: string, password: string) => {
		return await User.findOne({
			username: username,
			password: password
		}, globallyExcludedFields).lean().exec();
	},

	bulkInsert: async(documents: Array<Record<string, string>>) => {
		(documents);
		await User.create(documents);
		const documentIds: Array<string> = [];
		
		documents.forEach(doc => {
			documentIds.push(doc._id as string);
		});
		return documentIds;	
	}

};
