const router = require('express').Router();
const controller = require('../controllers/comment.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.updateStatus);
router.delete('/:id', controller.delete);

module.exports = router;
