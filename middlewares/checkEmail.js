// import { User } from "../models/users.js";
import { UserService } from '../services/userService.js';

const checkEmailUpdate = (req, res, next) => {
  const { email } = req.body;
  const emailSub = req.user.email;

  const us = new UserService();
  const user = us.findByEmail(email);
  if(user == null || user.email == emailSub){
    next();
  }else{
    res.status(400).json({
      message: "User found",
    });
  }

};
const checkEmail = (req, res, next) => {
  const us = new UserService();
  const user = us.findByEmail(req, res);
  if(user == null){
    next();
  }else{
    res.status(400).json({
      message: "User found",
    });
  }
};

export default { checkEmailUpdate, checkEmail };
