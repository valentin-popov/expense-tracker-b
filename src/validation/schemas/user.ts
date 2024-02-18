import { t } from 'elysia';

export const Credentials = t.Object({
	username: t.String({
		minLength: 3,
		maxLength: 24
	}),
	password: t.String({
		minLength: 3,
		maxLength: 24
	})
});

const create = {
	username: t.String({
		minLength: 3,
		maxLength: 24,
	}),
	password: t.String({
		minLength: 3,
		maxLength: 24,
	}),
	email: t.String({
		minLength: 6,
		maxLength: 64,
	}),
	firstName: t.String({
		minLength: 3,
		maxLength: 64,
	}),
	lastName: t.String({
		minLength: 3,
		maxLength: 64,
	}),
};

export const User = t.Object(create);
