// Angular SSR Needed
import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';

import { existsSync } from 'fs';
import { join } from 'path';

// Imports
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';

import { Application } from 'express';

// Needed .env
import * as dotenv from 'dotenv';
import keys from './server/keys';

import { database } from 'server/database';
import { createInitialData } from 'server/users/initialData';

// Routes
import indexRoutes from './server/index/index.routes';
import wordsRoutes from './server/words/words.routes';
import categoriesRoutes from './server/categories/categories.routes';
import authRoutes from './server/auth/auth.routes';

class Server {
	public app: Application;

	constructor() {
		// Enviroment variables
		dotenv.config();

		// Express
		this.app = express();
		this.configExpress();
		this.initialConfig();

		if (process.env.NODE_ENV == 'production') {
			this.prodConfings();
		} else {
			this.devConfings();
		}

		// Config routes
		this.routes();
	}

	private configExpress(): void {
		this.app.set('port', process.env.PORT || keys.PORT);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
	}

	private prodConfings(): void {
		console.log('Production mode');

		// See peticions in console
		this.app.use(
			morgan(
				'tiny', // dev - tiny
				{
					skip: function (req, res) {
						return res.statusCode < 400;
					}
				}
			)
		);
	}

	private devConfings(): void {
		console.log('Development mode');

		// Cors policy configuration
		this.app.use(cors());

		// See API peticions in console
		this.app.use(
			morgan('dev', {
				skip: function (req, res) {
					return !req.baseUrl.includes('/api');
				}
			})
		);
	}

	private initialConfig(): void {
		database.startConnection();
		createInitialData();
	}

	private routes(): void {
		// Angular SSR
		const distFolder = join(process.cwd(), 'dist/dictionaryOfNeologisms/browser');
		const indexHtml = existsSync(join(distFolder, 'index.original.html'))
			? 'index.original.html'
			: 'index';

		this.app.engine(
			'html',
			ngExpressEngine({
				bootstrap: AppServerModule
			})
		);

		this.app.set('view engine', 'html');
		this.app.set('views', distFolder);

		// API Routes
		this.app.use('/api', indexRoutes);
		this.app.use('/api', wordsRoutes);
		this.app.use('/api', categoriesRoutes);
		this.app.use('/api/auth', authRoutes);

		// Serve static files from /browser
		this.app.get(
			'*.*',
			express.static(distFolder, {
				maxAge: '1y'
			})
		);

		// All regular routes use the Universal engine
		this.app.get('*', (req, res) => {
			res.render(indexHtml, {
				req,
				providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
			});
		});
	}

	public start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log('Server on port ' + this.app.get('port'));
		});
	}
}

const server = new Server();

declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';

if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
	server.start();
}

export * from './src/main.server';
