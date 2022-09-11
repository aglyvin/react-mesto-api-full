const card = require('../models/card');
const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  card.create({
    name,
    link,
    owner,
  })
    .then((data) => res.send(data))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(e);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  card.findById(req.params.cardId)
    .then((foundCard) => {
      if (!foundCard) {
        next(new NotFoundError('Карточка не найдена'));
      } else if (!foundCard.owner.equals(req.user._id)) {
        next(new ForbiddenError('Нельзя удалить карточку, созданную другим пользователем'));
      } else {
        return foundCard.remove()
          .then(() => {
            res.send({ message: 'The card was deleted' });
          });
      }
      // eslint ругается, что нет возврата
      return null;
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(e);
      }
    });
};

module.exports.like = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((crd) => {
      if (!crd) {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        res.send({ data: 'like' });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(e);
      }
    });
};

module.exports.dislike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((crd) => {
      if (!crd) {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        res.send({ data: 'dislike' });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(e);
      }
    });
};
