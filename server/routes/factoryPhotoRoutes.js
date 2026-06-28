const express = require('express');
const router = express.Router();
const { getFactoryPhotos, addFactoryPhoto, deleteFactoryPhoto } = require('../controllers/factoryPhotoController');
const { protect } = require('../middleware/authMiddleware');
const { uploadFactoryPhoto } = require('../middleware/uploadMiddleware');

router.get('/', getFactoryPhotos);
router.post('/', protect, uploadFactoryPhoto, addFactoryPhoto);
router.delete('/:id', protect, deleteFactoryPhoto);

module.exports = router;
