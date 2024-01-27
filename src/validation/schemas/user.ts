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
