import { 
	build as buildTransaction, 
	ReadQuery, 
	TransactionInput, 
	Transaction ,
	mapToDocument,
	mapFromDocument
} from '../resources/transaction';
import transactionService from '../database/service/transaction';
import { Filter } from '../database/common';

export default {
	create: async function(params: TransactionInput) {
		const transaction = buildTransaction(params);
		
		await transactionService.bulkInsert([mapToDocument({
			transactionId: transaction.transactionId,
			parentId:transaction.parentId,
			amount: transaction.amount,
			category: transaction.category,
			description: transaction.description
		})]);
		return transaction;
	},
	read: async function(query: ReadQuery) {
		const filter: Array<Filter> = [{
			name: 'parentId',
			value: query.parentId,
			operation: 'equals',
		}];

		if (query.categories) {
			filter.push({
				name: 'category',
				value: query.categories,
				operation: 'in'
			});
		}

		if (query.amount?.gt) {
			filter.push({
				name: 'amount',
				value: query.amount.gt,
				operation: 'gt'
			});
		}

		if (query.amount?.lt) {
			filter.push({
				name: 'amount',
				value: query.amount.lt,
				operation: 'lt'
			});
		}
		const transactions: Array<Transaction> = [];
		const readResult = await transactionService.read(filter);
		readResult.forEach(res => {
			const resource = {
				type: 'transaction',
				...res
			};
			transactions.push(mapFromDocument(resource));
		});
		return transactions;
	}
};
