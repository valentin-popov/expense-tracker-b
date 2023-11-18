import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
	firstName: {
		type: String,
		minLength: 3,
		maxLength: 64,
		required: true
	},
	lastName: {
		type: String,
		minLength: 3,
		maxLength: 64,
		required: true
	}
});

const transactionSchema = new mongoose.Schema({
	description: {
		type: String,
		maxLength: 255,
		required: true
	},
	userId: {
		type: String,
		minLength: 8,
		maxLength: 8,
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

export const User = mongoose.model('User', userSchema);
export const Transaction = mongoose.model('Transaction', transactionSchema);