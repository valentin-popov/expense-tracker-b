import { TypedResource } from "../database/service"

export interface TransactionInput {
	parentId: string,
	description: string,
	amount: number,
	category: string
}

export interface Transaction extends TransactionInput, TypedResource {
	transactionId: string,
}

export const build = (transaction: TransactionInput): Transaction => {
	return {
		...transaction,
		transactionId: crypto.randomUUID(),
		type: 'transaction'
	}
}
