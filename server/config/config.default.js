/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = exports = {};
	config.cors = {
		origin: '*'
	}

	config.postgres = {
		client: {
			//host
			host: "localhost",
			//端口
			port: "5432",
			//用户名
			user: "postgres",
			//密码
			password: "123456",
			//数据库名
			database: "mydb"
		},
		app: true,
		agent: false,
		default: {
			connectionTimeoutMills: 30000,
			idleTimeoutMillis: 30000
		}
	}
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1704607873700_5410';

	// add your middleware config here
	config.middleware = [];

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	return {
		...config,
		...userConfig,
	};
};

/* exports.postgres = {
  client: {
  	//host
  	host: "localhost",
  	//端口
  	port: "5432",
  	//用户名
  	user: "postgres",
  	//密码
  	password: "123456",
  	//数据库名
  	database: "mydb"
  },
  app: true,
  agent: false,
  default: {
  	connectionTimeoutMills: 30000,
  	idleTimeoutMillis: 30000
  }
}; */