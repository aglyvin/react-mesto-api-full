const router = require('express').Router();
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');

router.use(require('./auth'));

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.use(auth);
router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res, next) => {
  next(new NotFoundError('Адрес не существует'));
});

module.exports = router;
