const router = require('express').Router();
const controller = require('../controllers/comment.controller');
const auth = require('../middlewares/auth.middleware');

// Middleware to check if the user is authenticated
// const roleMiddleware = require('../middlewares/role.middleware');

// router.post


router.get('/event/:eventId', controller.getCommentsByEvent);
router.get('/approved', controller.approve);

router.get('/:id', controller.getById);
router.put('/:id', controller.updateStatus);
router.delete('/:id', controller.delete);

// Only authenticated users can create comments
router.post('/', auth.authToken, controller.create);

// Middleware utilisable uniquement si connecté en tant qu'admin
router.get('/', auth.authToken, auth.authRole('admin'), controller.getAll);
router.get('/pending', auth.authToken, auth.authRole('admin'), controller.getPending);
router.put('/:id/approve', auth.authToken, auth.authRole('admin'), controller.approve);
router.delete('/:id', auth.authToken, auth.authRole('admin'), controller.delete);
module.exports = router;
