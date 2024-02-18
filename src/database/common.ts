import mongoose, { actualPrimitives } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI ?? '');
export { mongoose };

export type Filter = {
	name: string,
	value: actualPrimitives | Array<actualPrimitives>,
	operation: string
}

export const filterOp = {
	EQUALS: 'eq',
	GREATER_THAN: 'gt',
	LOWER_THAN: 'lt',
	IN_ARRAY: 'in'
};

export const globallyExcludedFields = '-__v';