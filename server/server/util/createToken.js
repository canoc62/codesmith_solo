const jwt = require('jsonwebtoken');
const secret_key = 'secret_key';

module.exports = function createToken(username, user_id) {
  const jwtObj = {
    'jwt_username': username,
    'jwt_user_id': user_id
  };

  const token = jwt.sign(jwtObj, secret_key);
  
  return token;
}