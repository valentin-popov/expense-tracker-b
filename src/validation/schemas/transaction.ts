import { t } from 'elysia';

const create = {
	description: t.String({
		maxLength: 255
	}),
	parentId: t.String({
		minLength: 36,
		maxLength: 36
	}),
	amount: t.Integer({
		minimum: 1,
		maximum: 100000
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

export const fields = Object.keys(create);
export const Transaction = t.Object(create);
