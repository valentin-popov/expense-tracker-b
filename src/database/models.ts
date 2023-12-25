import { Schema } from 'mongoose';
import { mongoose as dbConnection } from '../database/service';

const userSchema = new dbConnection.Schema({
	_id: {
		type: Schema.Types.UUID,
		required: true
	},
	username: {
		type: String,
		minLength: 3,
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
		type: Schema.Types.UUID,
		required: true
	},
	description: {
		type: String,
		maxLength: 255,
		required: true
	},
	user_id: {
		type: Schema.Types.UUID,
		required: true
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
