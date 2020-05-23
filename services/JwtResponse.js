'use strict'

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey23456';

exports.createToken = function (user) {
  var accessToken = jwt.sign({
      subid: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      image: user.image,
    },
    SECRET_KEY, {
      expiresIn: '24h'
    });

  return accessToken;
};