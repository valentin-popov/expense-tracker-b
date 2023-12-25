import { mapToDBValue } from "../mapper";
import { build as buildTransaction, TransactionInput } from '../resources/transaction'
import dbService from '../database/service';

export const transactionController = {
	create: async function(transaction: TransactionInput) {
		const result = buildTransaction(transaction);

		await dbService.insert(mapToDBValue(buildTransaction(transaction)));
		return result;
	},
}
