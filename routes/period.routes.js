const router = require('express').Router();
const controller = require('../controllers/period.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/event/:id', controller.getByEvent);


// admin routes
router.post('/', auth.authToken, auth.authRole('admin'), controller.create);
router.put('/:id', auth.authToken, auth.authRole('admin'), controller.update);
router.delete('/:id', auth.authToken, auth.authRole('admin'), controller.delete);

module.exports = router;
