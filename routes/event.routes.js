const router = require('express').Router();
const controller = require('../controllers/event.controller');
const authToken = require('../middlewares/auth.middleware');

router.get('/', authToken, controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
