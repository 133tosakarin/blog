const { Controller } = require('egg');
const tencentcloud  = require("tencentcloud-sdk-nodejs-nlp");


class HomeController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.body = [{text:'你好我是login函数被调用后 给你传的数据'}];
	console.log(this.app.postgres)
	const result = await this.app.postgres.query('select * from tbl');
	ctx.body.push(result)
  }
  
  async register() {
	  const {ctx} = this;
	  let default_url_img = 'https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500'
	  let request = ctx.request.query
	  let data = request.data
	  let sql = 'insert into tbl_user(user_name, user_imag) values($1,$2)'
	  let result = await this.app.postgres.query(sql, [data.user_name, default_url_img])
	  ctx.body =  { 
		  success: result.rowCount > 0;
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
