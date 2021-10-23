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
	}
}
