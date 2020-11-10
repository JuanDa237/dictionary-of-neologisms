export default {
	database: {
		host: 'localhost',
		database: 'dictionaryOfNeologisms'
	},
	initialData: {
		users: [
			{
				username: 'juan',
				password: 'contra',
				name: 'Juan Superadmin',
				role: 'superadmin'
			},
			{
				username: 'juan2',
				password: 'contra',
				name: 'Juan Administrador',
				role: 'administrator'
			},
			{
				username: 'juan3',
				password: 'contra',
				name: 'Juan Logogenista',
				role: 'logogenist'
			}
		]
	}
};
