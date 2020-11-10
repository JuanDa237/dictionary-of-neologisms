import { connect } from 'mongoose';
import keys from './keys';

export async function startConnection(): Promise<any> {
	await connect(`mongodb://${keys.database.host}/${keys.database.database}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});
	console.log('DB is connected.');
}
