const { Controller } = require('egg');
const { app, mock, assert } = require('egg-mock');
const shuffle = require('loadsh')
class IndexController extends Controller {

  async index() {
	  const {ctx} = this
	  let req = ctx.request.query
	  console.log(req)
	  let sql = 'select * from tbl_forum as f left join tbl_user as u on f.user_id = u.user_id'
	  let result = await this.app.postgres.query(sql)
	  console.log(result.rows)
	  result.rows = shuffle.shuffle(result.rows)
	  // console.log(result.rows)
	  ctx.body = result.rows
  }
  
  async AddForum() {
	  const {ctx} = this
	  let forum = ctx.request.body
	  // console.log(forum)
	  // let imgs = ['https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500', 'https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500']
	  let sql = 'insert into tbl_forum(create_time, type,content_text, imgs, video, user_id) values($1, $2,$3, $4, $5, $6)'
	  // console.log('AddForum: ' + sql)
	  console.log('forum.imgs: ', forum.imgs)	
	  let imgs = '{'
	  for (let i = 0; i < forum.imgs.length; ++i) {
		  if (i  < forum.imgs.length - 1) {
			  imgs +=  '\"' + forum.imgs[i] + '\",'
		  } else {
			  imgs += '\"' + forum.imgs[i] + '\"'
		  }
		  
	  }
	  imgs += '}'
	  console.log(imgs)
	  let result = await this.app.postgres.query(sql, [forum.create_time, forum.type, forum.content_text, imgs, forum.video, forum.user_id])
	  console.log('result.rows: ', result)
	  ctx.body = { success: result.rowCount > 0}
	  
  }
  
  async Comment() {
	  const {ctx} = this
	  let data = ctx.request.query
	  let sql = 'select c.content_id,c.comment_text, u.user_img, u.user_id , u.user_name from tbl_comment c inner join tbl_forum f on c.content_id = f.content_id inner join tbl_user u on u.user_id = c.user_id where f.content_id = $1'
	  // console.log('data: ',data)
	  let result = await this.app.postgres.query(sql, [data.content_id])
	  console.log('row: ', result.rows)
	  ctx.body = result.rows
	  
  }
  
  async AddComment() {
	  const {ctx} = this
	  let data = ctx.request.body
	  let sql = 'insert into tbl_comment(content_id, user_id, comment_text) values($1, $2, $3)'
	  let user_id = 1
	  if (ctx.session.user != null) {
		  console.log('ctx.session.user is null')
		  user_id = ctx.session.user.user_id
	  } else {
		  user_id = 1
	  }
	  let result = await this.app.postgres.query(sql, [data.content_id, user_id, data.comment_text])
	  ctx.body = {
		  success: result.rowCount > 0,
	  }
	  
  }
}
module.exports = IndexController;