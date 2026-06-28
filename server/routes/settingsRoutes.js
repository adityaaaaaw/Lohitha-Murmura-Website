const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, uploadLogo, uploadFavicon } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');
const { uploadLogo: logoMiddleware, uploadFavicon: faviconMiddleware } = require('../middleware/uploadMiddleware');

router.get('/', getSettings);
router.put('/', protect, updateSettings);
router.post('/logo', protect, logoMiddleware, uploadLogo);
router.post('/favicon', protect, faviconMiddleware, uploadFavicon);

module.exports = router;
