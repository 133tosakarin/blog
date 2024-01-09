/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/login', controller.home.login);
  
  router.get('/aichat', controller.home.aichat)
  router.get('/', controller.index.index)
  router.get('/register', controller.home.register)
  router.get('/create', controller.index.AddForum)
};
