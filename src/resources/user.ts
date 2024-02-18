import { mapFromDBValue, mapToDBValue } from '../mapper';

export interface UserInput {
	username: string,
	email: string,
	firstName: string,
	lastName: string,
	password: string,
}

export interface User extends UserInput {
	userId: string,
}

export const build = (user: UserInput): User => {
	return {
		...user,
		userId: crypto.randomUUID(),
	};
};

export const mapFromDocument = (userDoc: Record<string, string | number>): Omit<User, 'password'>  => {
	userDoc.type = 'user';
	const user = mapFromDBValue(userDoc) as Record<string, string>;

	return {
		userId: user.userId,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		email: user.email,
	};
};

export const mapToDocument = (user: User): Record<string, string> => {
	return mapToDBValue({
		userId: user.userId,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		email: user.email,
		password: user.password,
		'type': 'user',
	}) as Record<string, string>;
};
