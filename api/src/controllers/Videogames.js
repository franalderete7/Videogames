const axios = require('axios')
const {Videogame, Genre} = require('../db');
const Videogames = require('../models/Videogames');
const {API_KEY} = process.env;

async function addVideogame (req, res) {
    var  { name, description, rating, plataforms, release_date, game_genres } = req.body;
    if(!name || !description || !rating || !plataforms) {
        res.status(400).json({
            error: 'Complete the form!'
        })
    }else{
    if(!release_date){
        release_date = null;
    }
    
    const videogame = await Videogame.create({
        name,
        description,
        rating,
        plataforms,
        release_date,
       
    });
    // Buscamos id del genero en la base de datos
    if(game_genres){game_genres.forEach( async (genre) => {
    const genero = await Genre.findOne({
        where: {
            name: genre
        }
    })
    await videogame.setGenres(genero)
    })
    }
    res.json(videogame)
    }

};

async function getVideogameById (req, res, next) {
    const { id } = req.params;
    if(isNaN(id)){
        try{
            const videogame = await Videogame.findOne({
                where: {
                    id: id
                },
                include: Genre
            })
            res.json(videogame)
        }
        catch(error){
            next({error: 'No se encontro el videojuego'})
        }
    }
    else{
        const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        const data = await response.json()
        const platforms = [];
        data.parent_platforms.forEach(platform => {
            platforms.push(platform.platform.name)
        })
        const videogameApi = {
            name: data.name,
            id: data.id,
            description: data.description,
            rating: data.rating_top,
            plataforms: platforms.join(', '),
            release_date: data.released,
            game_genres: data.genres.map(genre => genre.name).join(', '),
            background_image: data.background_image,
    }
    res.json(videogameApi)
    }

};

async function getVideogameByName (req, res, next) {
    const { name } = req.params;
    if(name){
        try{
            const videogame = await Videogame.findOne({
                where: {
                     name
                },
                include: Genre
            })
            res.json(videogame)
        }
        catch(error){
            next({error: 'No se encontro el videojuego'})
        }
    }
 }; 

async function getVideogames (req, res, next) {
    try {
        let apiVideogames = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results
        let dbVideogames = await Videogame.findAll({include: Genre});
        let allVideogames = dbVideogames.concat(apiVideogames)

        res.send(allVideogames)
        
    } catch (error) {
        next(error)
    }
}





module.exports = {
    addVideogame,
    getVideogameById,
    getVideogameByName,
    getVideogames
};