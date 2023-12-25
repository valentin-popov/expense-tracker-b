import mongoose from 'mongoose';
import { User as UserModel, Transaction as TransactionModel} from './models';

function mapToModel(dbRecord: TypedResource) {
	switch(dbRecord.type) {
		case 'user':
			return new UserModel(dbRecord);
		case 'transaction':
			return new TransactionModel(dbRecord);
		default:
			return null;
	}
}


mongoose.connect(process.env.MONGODB_URI ?? '')

export interface TypedResource extends Record<string, string | number> {
	type: string
}

export { mongoose }

export default {
	insert: async (dbRecord: TypedResource) => {
		const model = mapToModel(dbRecord);

		if (!model) {
			return null;
		}

		await model.save();
		return model._id || null;
	}
}
