/** @type Egg.EggPlugin */
module.exports = {
	// had enabled by egg
	// static: {
	//   enable: true,
	// }
	// mysql: {
	//    enable: true,
	//    package: "egg-mysql"
	//  }
	cors: {
		enable: true,
		package: 'egg-cors',
	},
	
	postgres: {
		enable: true,
		package: 'egg-postgres'
	},
	
	session: {
		enable: true,
		package: 'egg-session'
	}
	
};
