const { Router } = require('express');
const router = Router();
const { addVideogame, getVideogameById, getVideogameByName, getVideogames } = require('../controllers/Videogames.js')

router.post('/add', addVideogame);
router.get('/:id', getVideogameById);
router.get('/:name', getVideogameByName);
router.get('/', getVideogames);

module.exports = router;