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
	config.session = {
		key: 'SESSION_KEY', // 会话的 key
		maxAge: 86400000, // 会话的过期时间，单位毫秒，默认为一天
		httpOnly: true, // 是否设置为仅在服务器端访问，默认为 true
		encrypt: true, // 是否对会话进行加密，默认为 true
	}
	
	config.security = {
		csrf: {
			enable: false 	
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