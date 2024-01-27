import { t } from 'elysia';

const create = {
	description: t.String({
		maxLength: 255,
	}),
	parentId: t.String({
		minLength: 36,
		maxLength: 36
	}),
	amount:t.Number({
		minimum:0,
		maximum: 1000
	}),
	category: t.Enum({
		Sa: 'savings',
		Gi: 'gift',
		F: 'freelance',
		Sl: 'salary',
		U: 'utilities',
		R: 'rent',
		E: 'entertainment',
		Gr: 'groceries', 
		O: 'other'
	})
};

const read = {
	parentId: create.parentId,
	amount: t.Optional(t.Object({
		lt: t.Optional(create.amount),
		gt: t.Optional(create.amount)
	})),
	categories: t.Optional(t.Array(
		t.String(), {
			minItems: 1
		}
	)),
};

export const fields = Object.keys(create);
export const Transaction = t.Object(create);
export const Read = t.Object(read);
