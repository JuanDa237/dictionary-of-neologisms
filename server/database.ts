import { connect } from 'mongoose';
import keys from './keys';

class Database {
	async startConnection(): Promise<any> {
		var url: string;

		if (process.env.NODE_ENV == 'production') {
			url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_U_PASS}@cluster0.mf4ba.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
		} else {
			url = `mongodb://localhost/${process.env.DB || keys.DB}`;
		}

		try {
			await connect(url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			});

			console.log('DB is connected.');
		} catch (error) {
			console.log("DB isn't connected.");
		}
	}
}

export const database = new Database();
