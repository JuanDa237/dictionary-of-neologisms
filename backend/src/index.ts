//For the path aliases
import 'module-alias/register';

//Dontenv for enviroment variables
import dotenv from 'dotenv';

//Cors
import cors from 'cors';

//Express
import express, { Application } from 'express';
import morgan from 'morgan';

//Funcions
import { startConnection } from './database';
import { createInitialData } from './app/roles/initialData';

//Routes
import indexRoutes from './app/index/index.routes';
import categoriesRoutes from './app/categories/categories.routes';
import wordsRoutes from './app/words/words.routes';
import authRoutes from './app/auth/auth.routes';

class Server {
	private app: Application;

	constructor() {
		//Enviroment variables
		dotenv.config();

		//Express
		this.app = express();
		this.configExpress();
		this.othersConfings();

		this.initialConfig();

		//Config Routes
		this.routes();
	}

	private configExpress(): void {
		this.app.set('port', process.env.PORT || 3000);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
	}

	private othersConfings(): void {
		//Cors policy configuration
		this.app.use(cors());

		//Morgan to see peticions by console
		this.app.use(morgan('dev'));
	}

	private initialConfig(): void {
		startConnection();
		createInitialData();

		//Public folder
		this.app.use('/api/uploads', express.static('uploads'));
	}

	private routes(): void {
		this.app.use('/', indexRoutes);
		this.app.use('/api', categoriesRoutes);
		this.app.use('/api', wordsRoutes);
		this.app.use('/api/auth', authRoutes);
	}

	public async start(): Promise<any> {
		await this.app.listen(this.app.get('port'));
		console.log('Server on port ' + this.app.get('port'));
	}
}

const server = new Server();
server.start();
