const { Controller } = require('egg');
const tencentcloud  = require("tencentcloud-sdk-nodejs-nlp");


class HomeController extends Controller {

  
  async login() {
    const { ctx } = this;
	let req = ctx.request.query
	let user_name = req.username
	let password = req.password
	let judge_sql = 'select * from tbl_user where user_name = $1'
	let ret = await this.app.postgres.query(judge_sql, [user_name])
	let is_exist = ret.rowCount > 0
	ctx.session.user = null
	if (is_exist) {
		if (password != ret.rows[0].password) {
			console.log('need $1 but find $2', [ret.rows[0].password, password])
			ctx.body = {
				success: false,
				message: 'password error!'
			}
			return
		}
		console.log('login success')
		ctx.session.user = ret.rows[0]
		console.log('session' + ctx.session.user)
		ctx.body = {
			success: true,
			message: 'login success!'
		}
		return
	}
	ctx.body = {
		success: false,
		message: 'username or password error!'
	}
  }
  

  
  async register() {
	  const {ctx} = this;
	  let default_url_img = 'https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500'
	  let data = ctx.request.query
	  let sql = 'insert into tbl_user(user_name, user_img, password) values($1,$2, $3)'
	  console.log(sql)
	  let judge_sql = 'select user_id from tbl_user where user_name = $1'
	  let ret = await this.app.postgres.query(judge_sql, [data.username])
	  let is_exist = ret.rowCount > 0
	  if (is_exist || data.username == '') {
		  ctx.body = {
			  message: 'user has existed',
			  success: false
		  }
		  return
	  }
	  console.log('register success')
	  let result = await this.app.postgres.query(sql, [data.username, default_url_img, data.password])
	  ctx.body =  { 
		  success: result.rowCount > 0
	  }
  }
  async aichat() {
	  const {ctx} = this;
	  let data = ctx.request.query
	  console.log(data)
	  const NlpClient = tencentcloud.nlp.v20190408.Client;
	  const clientConfig = {
	    credential: {
	      secretId: "AKIDPlI3rgjn5fEoPA9EQPSgu5NmDhFrZ7qc",
	      secretKey: "DgBeDDNnL67KfaXTLKKKSg3KfCkTLQYp",
	    },
	    region: "",
	    profile: {
	      httpProfile: {
	        endpoint: "nlp.tencentcloudapi.com",
	      },
	    },
	  };
	  
	  // 实例化要请求产品的client对象,clientProfile是可选的
	  const client = new NlpClient(clientConfig);
	  const params = {
		  Text: data.text,
		  SourceLang:"zh",
		  Number: 2,
		  Style:""
		  
	  };
	  ctx.body = await client.TextEmbellish(params)
  }
}

module.exports = HomeController;
