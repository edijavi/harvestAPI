'use strict'

const jwt = require('../services/JwtResponse');
const bcrypt = require('bcryptjs');
var User = require('../models/user');



function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
    email: email
  }, (err, user) => {    
    if (err) return res.status(500).send('Server error!');
    if (!user) return res.status(404).send('User not found!');
    const result = bcrypt.compareSync(password, user.password);
    if (!result) return res.status(401).send('Password not valid!');
    res.status(200).send({
      user: user,
      access_token: jwt.createToken(user),
      expires_in: '24h'
    });
  });
};


function register(req, res) {
  var user = new User();
  var params = req.body;  
  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.role = 'ROLE_USER';
  user.image = 'null';
  
  if (params.password) {    
    //Encrypt the password
      user.password = bcrypt.hashSync(params.password, 8);
      if (user.name != null && user.surname != null && user.email != null) {
        //Save the user
        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({
              message: 'Error during the saving process'
            });
          } else {
            if (!userStored) {
              res.status(404).send({
                message: 'User not registered'
              });
            } else {
              res.status(200).send({
                user: userStored,
                access_token: jwt.createToken(userStored),
                expires_in: '24h'
              });
            }
          }
        });
      } else {
        res.status(200).send({
          message: 'Complete all the fields'
        });
      }
  } else {
    res.status(200).send({
      message: 'Type the password'
    });
  }
}

module.exports = {
  loginUser,
  register
};