import Elysia from 'elysia';
import { Transaction } from './src/validation/schemas/transaction';
import { transactionController } from './src/controllers/transaction';
import { handleError, errorObject } from './src/errorHandler';

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
			body: Transaction
		}
	)
).listen(process.env.PORT || 3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
