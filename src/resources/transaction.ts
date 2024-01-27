import { extractQuery } from '../utils';
import { mapToDBValue, mapFromDBValue} from '../mapper';
export interface TransactionInput {
	parentId: string,
	description: string,
	amount: number,
	category: string
}

export interface Transaction extends TransactionInput {
	transactionId: string,
}

export interface ReadQuery {
	parentId: string,
	amount?: {
		lt?: number,
		gt?: number
	},
	categories?: Array<string>
}

export const build = (transaction: TransactionInput): Transaction => {
	return {
		...transaction,
		transactionId: crypto.randomUUID(),
	};
};

export const buildQuery = (url: string): ReadQuery => {
	const queryObject = extractQuery(url);

	const readQuery: ReadQuery = {
		parentId: queryObject.parentId as string
	};

	if (Object.hasOwn(queryObject, 'categories')) {
		readQuery.categories = queryObject.categories as ReadQuery['categories'];
	}

	if (Object.hasOwn(queryObject, 'amount')) {
		readQuery.amount = queryObject.amount as ReadQuery['amount'];
	}
	return readQuery;
};

export const mapToDocument = (transaction: Transaction): Record<string, string | number> => {
	return mapToDBValue({
		transactionId: transaction.transactionId,
		amount: transaction.amount,
		category: transaction.category,
		description: transaction.description,
		parentId: transaction.parentId,
		type: 'transaction'
	});
};

export const mapFromDocument = (transactionDoc: Record<string, string | number>): Transaction => {
	const transaction = mapFromDBValue({
		...transactionDoc,
		type: 'transaction'
	});

	return {
		transactionId: transaction.transactionId as string,
		amount: transaction.amount as number,
		category: transaction.category as string,
		description: transaction.description as string,
		parentId: transaction.parentId as string,
	};
};
