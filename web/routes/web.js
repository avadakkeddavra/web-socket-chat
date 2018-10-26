const Router = require('./Router');
let router = new Router();
const UserController = require('@controller/UserController');
const MessageController = require('@controller/MessageController');

/**
 *  Example of usage
 * 
 * router.add(Alias (string), Allow params [], ... Handlers (function))
 * 
 * 
 * @param params[] - mean params witch you can send in a Request works like `/users/:id`
 * @param Alias - a short name of your route 
 * @param Handlers - a chain of Middleware and Controller function (You can use next() in middlewares with return statement `return next()`
 */


router.add('child', ['id','child_id'], function(Request, Response){
  Response.send('asdf')
});

router.add('register',[], UserController.register.bind(UserController))
router.add('login',[], UserController.login.bind(UserController))
router.add('send', [], MessageController.send.bind(MessageController))
router.getRoutes();

module.exports = router;