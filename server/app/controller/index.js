const { Controller } = require('egg');

class IndexController extends Controller {

  async index() {
	  const {ctx} = this
	  let req = ctx.request.query
	  console.log(req)
	  let sql = 'select * from tbl_forum as f left join tbl_user as u on f.user_id = u.user_id'
	  let result = await this.app.postgres.query(sql)
	  // console.log(result)
	  ctx.body = result.rows
  }
  
  async AddForum() {
	  const {ctx} = this
	  let forum = ctx.request.query
	  // console.log(forum)
	  // let imgs = ['https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500', 'https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500']
	  let sql = 'insert into tbl_forum(create_time, type,content_text, imgs, video, user_id) values($1, $2,$3, $4, $5, $6)'
	  // console.log('AddForum: ' + sql)
	  console.log(forum.imgs)
	  let imgs = '{'
	  for (let i = 0; i < forum.imgs.length; ++i) {
		  if (i < forum.imgs.length - 1) {
			  imgs += forum.imgs[i] + ','
		  } else {
			  imgs += forum.imgs[i]
		  }
		  
	  }
	  imgs += '}'
	  let result = await this.app.postgres.query(sql, [forum.create_time, forum.type, forum.content_text, imgs, forum.video, forum.user_id])
	  ctx.body = { success: result.rowCount > 0}
	  
  }
}
module.exports = IndexController;