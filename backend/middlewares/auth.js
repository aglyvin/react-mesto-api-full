const jwt = require('jsonwebtoken');
const { UnauthorizeError } = require('../errors/UnauthorizeError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizeError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizeError('Неправильные имя пользователя или пароль'));
  }
  req.user = payload;
  next();
};
