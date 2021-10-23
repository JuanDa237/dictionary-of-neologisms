export default {
	PORT: 4000,
	TOKEN_SECRET: '',
	initialData: {
		users: [
			{
				username: 'user',
				password: '123',
				name: 'User 1 Superadmin',
				role: 'superadmin'
			},
			{
				username: 'user2',
				password: '123',
				name: 'User 2 Administrador',
				role: 'administrator'
			},
			{
				username: 'user3',
				password: '123',
				name: 'user 3 Logogenista',
				role: 'logogenist'
			}
		]
	}
};
