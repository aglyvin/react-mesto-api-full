const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors/BadRequestError');
const { ConflictError } = require('../errors/ConflictError');
const { NotFoundError } = require('../errors/NotFoundError');
const { UnauthorizeError } = require('../errors/UnauthorizeError');
const user = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  user.find({})
    .then((users) => res.send(users))
    .catch((e) => {
      next(e);
    });
};

module.exports.getUser = (req, res, next) => {
  user.findById(req.params.userId)
    .then((founduser) => {
      if (!founduser) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        res.send(founduser);
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(e);
      }
    });
};

module.exports.getLoggedUser = (req, res, next) => {
  user.findById(req.user._id)
    .then((founduser) => {
      if (!founduser) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        res.send(founduser);
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(e);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      user.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((usr) => res.send({
          name, about, avatar, email, _id: usr.id,
        }))
        .catch((e) => {
          if (e.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
          } else if (e.code === 11000) {
            next(new ConflictError('Пользователь существует'));
          } else {
            next(e);
          }
        });
    });
};

module.exports.updateProfile = (req, res, next) => {
  const {
    name, about,
  } = req.body;
  user.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((usr) => {
      if (!usr) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        res.send(usr);
      }
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(e);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const {
    avatar,
  } = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then((usr) => {
      if (!usr) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        res.send(usr);
      }
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
      } else {
        next(e);
      }
    });
};

module.exports.login = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  user.findUserByCredentials(email, password)
    .then((usr) => {
      const token = jwt.sign(
        { _id: usr._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizeError('Некорректный токен'));
    });
};
