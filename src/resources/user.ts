interface UserInput {
	username: string,
	email: string,
	firstName: string,
	lastName: string
}

export interface User extends UserInput {
	userId: string,
	type: string
}

export const build = (user: UserInput): User => {
	return {
		...user,
		userId: crypto.randomUUID(),
		type: 'user'
	};
};
