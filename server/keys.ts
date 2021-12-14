export default {
	PORT: 4000,
	TOKEN_SECRET: '',
	initialData: {
		users: [
			{
				username: 'admin',
				password: '123',
				name: 'Admin',
				role: 'admin'
			},
			{
				username: 'logogenist',
				password: '123',
				name: 'Logogenista',
				role: 'logogenist'
			}
		]
	}
};
