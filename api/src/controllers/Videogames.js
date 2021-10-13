const axios = require('axios')
const {Videogame, Genre} = require('../db');
const Videogames = require('../models/Videogames');
const {API_KEY} = process.env;


async function addVideogame (req, res) {
    const { name, description, released, rating, platforms, image, genres} = req.body;
    try {
        let createGame = await VideoGame.create({
            name,
            description, 
            released, 
            rating, 
            image,
            platforms
            //platforms: platforms.split(',')
        })
        if (genres) {
            let gameWithGenre = await createGame.setGenres(genres)
        }     
            res.json(createGame);

    } catch(err) {
        res.send(err)
    }
};

async function getVideogameById (req, res, next) {

        const { id } = req.params;
        try {
            if (id.length > 7) {
                let getForId = await VideoGame.findOne({
                    where: {
                        id: id
                    },
                    include: [{
                        model: Genre,
                        attributes: ['id', 'name'],
                        through: {
                          attributes: []
                          } 
                    }]
                })           
                //console.log('GAME IDDDD: ', getForId)
                res.json(getForId ? getForId : 'No se encontró jueguito con ese ID');
                
            } else {
                let gameApiPromise = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    
                gameApiPromise = gameApiPromise.data;
                //console.log("GENEROSS: ", gameApiPromise.genres);
                let apiGame = {
                    id: gameApiPromise.id,
                    name: gameApiPromise.name,
                    image: gameApiPromise.background_image,
                    description: gameApiPromise.description,
                    released: gameApiPromise.released,
                    rating: gameApiPromise.rating,
                    platforms: gameApiPromise.platforms.map(plat => {
                        return {
                            id: plat.platform.slug,
                            name: plat.platform.name,
                            platImage: plat.platform.image_background
                        }
                    }),
                    Genres: gameApiPromise.genres.map(genre => {
                        return {
                            id: genre.slug,
                            name: genre.name
                        }
                    })
                }
                //console.log("API GAMEEE: ", apiGame)
                res.json(apiGame ? apiGame : 'No se encontró jueguito con ese ID');
            }
            
        } catch(err) {
            res.send(err);
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