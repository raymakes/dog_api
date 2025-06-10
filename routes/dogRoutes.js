const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');
const authMiddleware = require('../middlewares/auth');

// Register a new dog
router.post('/register', authMiddleware, dogController.registerDog);

// Adopt a dog
router.post('/adopt/:dogId', authMiddleware, dogController.adoptDog);

// Remove a dog
router.delete('/remove/:dogId', authMiddleware, dogController.removeDog);

// List registered dogs via user
router.get('/registered', authMiddleware, dogController.listRegisteredDogs);

// List adopted dogs via owner
router.get('/adopted', authMiddleware, dogController.listAdoptedDogs);

module.exports = router;