const router = require('express').Router();
const controller = require('../controllers/media.controller');
const auth = require('../middlewares/auth.middleware');
const { restrictTo } = require('../utils/auth');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/event/:id', controller.getByEvent);


// admin routes
router.post('/', restrictTo('admin'), controller.create);
router.put('/:id', restrictTo('admin'), controller.update);
router.delete('/:id', restrictTo('admin'), controller.delete);

module.exports = router;
