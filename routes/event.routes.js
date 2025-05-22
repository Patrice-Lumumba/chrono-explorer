const router = require('express').Router();
const controller = require('../controllers/event.controller');
const auth = require('../middlewares/auth.middleware');


router.get('/', controller.getAll);
router.get('/:id', controller.getById);


// Ajouter un événement aux favoris

router.post('/:id/favorite', controller.addFavorite);
// Supprimer un événement des favoris
router.delete('/:id/favorite', controller.removeFavorite);
// Obtenir les événements favoris
router.get('/favorite', controller.getFavorites);
router.get('/:id/comments', controller.getAllComments);

router.get('/:id/media', controller.getMediasByEvent);

// admin event routes

router.post('/', auth.authToken, auth.authRole('admin'), controller.create);
router.put('/:id', auth.authToken, auth.authRole('admin'), controller.update);
router.delete('/:id', auth.authToken, auth.authRole('admin'), controller.delete);

module.exports = router;
