const { Router } = require('express');
const router = Router();
const { addVideogame, getVideogameById, getVideogames, getVideogameByName } = require('../controllers/Videogames.js')

router.post('/add', addVideogame);
router.get('/:id', getVideogameById);
router.get('/', getVideogames);
router.get(':name', getVideogameByName)

module.exports = router;