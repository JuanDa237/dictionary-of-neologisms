declare namespace Express {
	export interface Request {
		user: any;
	}
}

declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		TOKEN_SECRET: string;
		NODE_ENV: string;
		// DB
		DB: string;
		DB_USER: string;
		DB_U_PASS: string;
		// Email
		EMAIL: string;
		PASS: string;
		// AWS
		BUCKET_NAME: string;
		REGION: string;
		ACCESS_KEY: string;
		SECRET_KEY: string;
	}
}
