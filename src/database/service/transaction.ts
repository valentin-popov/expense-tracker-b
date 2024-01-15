import { actualPrimitives } from 'mongoose';
import { Filter, filterOp, globallyExcludedFields } from '../common';
import { Transaction } from '../models';

export default {
	// readById: (id: string) => {},
	read: async (filters: Array<Filter>) => {
		const queryFilter: Record<string, object | actualPrimitives | Array<actualPrimitives>> = {};
		for (const filter of filters) {
			if (!Object.values(filterOp).includes(filter.operation)) {
				continue;
			}
			// todo: filters are overwritten. add arrays.
			switch (filter.operation) {
			case filterOp.EQUALS:
			case filterOp.IN_ARRAY:
				// implicit $in
				queryFilter[filter.name] = filter.value;
				break;
			case filterOp.GREATER_THAN:
				queryFilter[filter.name] = {
					$gt: filter.value
				};
				break;
			case filterOp.LOWER_THAN:
				queryFilter[filter.name] = {
					$lt: filter.value
				};
				break;
			default:
				break;
			}
		}
		return await Transaction.find(queryFilter, globallyExcludedFields).lean().exec();
	},

	bulkInsert: async (documents: Array<Record<string, string | number>>) => {
		await Transaction.create(documents);
		const documentIds: Array<string> = [];
		
		documents.forEach(doc => {
			documentIds.push(doc._id as string);
		});
		return documentIds;
	},

	// deleteById(id: string) {}

};
