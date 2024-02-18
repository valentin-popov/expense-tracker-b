import { mongoose as dbConnection } from '../database/common';

const userSchema = new dbConnection.Schema({
	_id: {
		type: String,
		minLength: 36,
		maxLength: 36,
		required: true,
	},
	username: {
		type: String,
		minLength: 3,
		maxLength: 24,
		required: true
	},
	password: {
		type: String,
		minLength: 64,
		maxLength: 64,
		required: true
	},
	email: {
		type: String,
		minLength: 6,
		maxLength: 64,
		required: true
	},
	first_name: {
		type: String,
		minLength: 3,
		maxLength: 64,
		required: true
	},
	last_name: {
		type: String,
		minLength: 3,
		maxLength: 64,
		required: true
	}
});

const transactionSchema = new dbConnection.Schema({
	_id: {
		type: String,
		minLength: 36,
		maxLength: 36,
		required: true,
	},
	description: {
		type: String,
		maxLength: 255,
		required: true
	},
	user_id: {
		type: String,
		minLength: 36,
		maxLength: 36,
		required: true,
	},
	amount: {
		type: Number,
		required: true
	},
	category: {
		type: String,
		required: true
	}
});

export const User = dbConnection.model('User', userSchema);
export const Transaction = dbConnection.model('Transaction', transactionSchema);
