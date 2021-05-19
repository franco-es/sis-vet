const { Veterinaria } = require("../models/users");

const checkEmailUpdate = (req, res, next) => {
  const { email } = req.body;
  const emailSub = req.user.email;

  Veterinaria.findOne({ email: email }, (err, user) => {
    if (err) {
      // un error indica que hubo problemas con la consulta
      res.status(500).json({
        error: "Server error",
      });
    }
    if (user === null) {
      console.log(emailSub);
      console.log(user);
      next();
    }
    if (user) {
      if (user.email == emailSub) {
        console.log(user.email);
        console.log(emailSub);
        next();
      } else {
        console.log(user.email);
        console.log(emailSub);
        // Si el usuario  existe
        res.status(400).json({
          message: "User found",
        });
      }
    }
  });
};
const checkEmail = (req, res, next) => {
  const { email } = req.body;

  Veterinaria.findOne({ email: email }, (err, user) => {
    if (err) {
      // un error indica que hubo problemas con la consulta
      res.status(500).json({
        error: "Server error",
      });
    }

    if (user === null) {
      console.log(user);
      next();
    } else {
      console.log(user.email);
      // Si el usuario  existe
      res.status(400).json({
        message: "User found",
      });
    }
  });
};

module.exports = { checkEmailUpdate, checkEmail };
