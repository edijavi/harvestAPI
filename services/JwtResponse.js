'use strict'

const  jwt  =  require('jsonwebtoken');
const SECRET_KEY = "secretkey23456";
const  expiresIn  =  24  *  60  *  60;

exports.createToken = function(user) {
  const accessToken = jwt.sign(
    {
      subid: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      image: user.image,
    }, 
    SECRET_KEY, {expiresIn: expiresIn});
  
  return accessToken;
};
