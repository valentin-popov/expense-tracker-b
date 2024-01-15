import Elysia from 'elysia';
import { Transaction as TransactionSchema, Read as TransactionRead } from './validation/schemas/transaction';
import transactionController from './controllers/transaction';
import { handleError, errorObject } from './errorHandler';
import { buildQuery as buildTransactionReadQuery} from './resources/transaction';
import { queryNeedsParsing } from './utils';

const app = new Elysia();
app.onError(({ error, set }) => {
	const errorInfo = handleError(error as errorObject);
	
	set.status = errorInfo.httpStatus;
	return errorInfo.errorObject;
}).group('/v1', app => 
	app.get('/', () => ({msg: 'Hello world'})

	).post(
		'/transactions', ({ body }) => transactionController.create(body), {
			// beforeHandle: authController.isSignedIn,
			body: TransactionSchema
		}
	// ).get('/transactions', ({ request }) => transactionController.read(request.url), {
	).get('/transactions', ({ query }) => {
		return transactionController.read(query);
	}, {
		transform: (params) => {
			if (queryNeedsParsing(params.request.url)) {
				params.query = buildTransactionReadQuery(params.request.url);
			}
		},
		query: TransactionRead
	})
).listen(process.env.PORT || 3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
