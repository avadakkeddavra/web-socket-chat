const GlobalModel = require('@model/index');
const User = GlobalModel.users;

const Controller = require('./Controller');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchemas = require('@schema/UserSchema');
const peers = require('@service/Peers');

class UserController extends Controller {

    login(Request, Response) {
        this.Joi.validate(Request.body,UserSchemas.login, function(Error,Data){
			if(!Error)
			{
                
				User.findOne({
					where:{
						email:Data.email,
					}

				})
				.then(async user => {
                    let verify = await bcrypt.compare(Request.body.password, user.password);
        
					if(user && verify)
					{
						var token = jwt.sign({
						name:user.name,
						id:user.id,
						email:user.email,
						avatar: user.avatar,
          },process.env.JWT_KEY);
            peers.add({
              id:user.id,
              ws: Response,
            });

						Response.send({success: true, token: token});
					}else{
						
						Response.send({success:false,error:'Invalid password or email'});
					}

				})
				.catch(E => {
				
					Response.send({success:false,error:E.stack})
				});
			}else{
				Response.send({success:false,error:Error})
			}
		})
    }

    register(Request, Response) {
        console.log(Request.body)
        this.Joi.validate(Request.body,UserSchemas.register, async function(Error,Data){
            
            if(!Error) 
            {
              var hash = await bcrypt.hashSync(Data.password, Number(process.env.SALT_ROUNDS));
              console.log(hash);
              let UserData = Data;
              UserData.password = hash;
    
              User.create(UserData).then( user => {
    
                var token = jwt.sign({
                  name:user.name,
                  id:user.id,
                  email:user.email,
                },process.env.JWT_KEY);
    
                Response.send({success: true,token: token});
    
              }).catch(Error => {
    
                if(Error.code == 11000) {
                  Response.send({success: false, error: 'This email are already used'});
                } else {
                  Response.send({success: false,error: Error.message});
                }
              });
    
            }else{
              Response.send({success: false,error: Error.details[0].message});
            }
          });
    }

    changePassword() {

    }

    updateAvatar() {

    }

    addFriend() {

    }

    removeFriend() {
        
    }
}

module.exports = new UserController();
