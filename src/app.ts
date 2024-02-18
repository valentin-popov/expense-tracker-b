import Elysia from 'elysia';
import { Transaction as TransactionSchema, Read as TransactionRead } from './validation/schemas/transaction';
import { User as UserSchema} from './validation/schemas/user';
import { Credentials } from './validation/schemas/user';
import transactionController from './controllers/transaction';
import userController from './controllers/user';
import authController from './controllers/auth';
import { handleError, errorObject } from './errorHandler';
import { buildQuery as buildTransactionReadQuery} from './resources/transaction';
import { queryNeedsParsing } from './utils';


// TODO: mongodb uri and jwt secret must be set to env vars

const app = new Elysia();
const v1routes = {
	transaction: '/transactions',
	login: '/login',
	signup: '/signup'
};
app.onError(({ error, set }) => {
	const errorInfo = handleError(error as errorObject);
	
	set.status = errorInfo.httpStatus;
	return errorInfo.errorObject;
}).group('/v1', app => 
	app.get('/', () => {
		return 'hello world';
	}).post(v1routes.signup, ({ body }) => {
		userController.create(body);
	}, {
		body: UserSchema
	}).post(v1routes.login, ({ body }) => {
		return authController.createToken(body);
	}, {
		body: Credentials
	}).post(
		v1routes.transaction, ({ body }) => transactionController.create(body), {
			beforeHandle: ({ request }) => {
				authController.verifyToken(request.headers.get('Authorization'));
			},
			body: TransactionSchema
		}
	).get(v1routes.transaction, ({ query }) => {
		// todo: parentId must be equal to requester user id.
		return transactionController.read(query);
	}, {
		transform: (params) => {
			if (queryNeedsParsing(params.request.url)) {
				params.query = buildTransactionReadQuery(params.request.url);
			}
		},
		beforeHandle: ({ request }) => {
			authController.verifyToken(request.headers.get('Authorization'));
		},
		query: TransactionRead
	})
).listen(process.env.PORT || 3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
