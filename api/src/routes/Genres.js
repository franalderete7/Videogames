const { Router } = require('express');
const { getGenres } = require('../controllers/Genres.js')
const router = Router();

router.get('/', getGenres);

module.exports = router;