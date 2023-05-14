const {User} = require("../models/users");


class UserService{
  constructor(){};
  findByEmail(email){
    User.findOne({where:{email: email}})
      .then((data) => {return data;})
  }
  // save(user){
  //   User.create(user).then((data) => {return data});
  // }
}


module.exports = {UserService};