const axios = require('axios')
const {Videogame, Genre} = require('../db');
const {API_KEY} = process.env;


async function addVideogame (req, res, next) {

    try {

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
    //buscar id del genero en la base de datos
    if(game_genres){game_genres.forEach( async (genre) => {
    const genero = await Genre.findOne({
        where: {
            name: genre
        }
    })

    .then(data => {
    videogame.setGenres(data); 
    res.json({"data":data, "message":"game created"})
     })

})}};
        
    } catch (error) {
        next(error)
        
    }
};
    




async function getVideogameById (req, res, next) {

    try {

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
                res.json({error: 'No se encontro el videojuego'})
            }
        }
        else{
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const data = await response.data
            const platforms = [];
            data.parent_platforms.forEach(platform => {
                platforms.push(platform.platform.name)
            })
            const videogameApi = {
                name: data.name,
                id: data.id,
                description: data.description,
                rating: data.rating_top,
                plataforms: platforms.join(' - '),
                release_date: data.released,
                game_genres: data.genres.map(genre => genre.name).join(' - '),
                background_image: data.background_image,
        }
        res.json(videogameApi)
        };
        
    } catch (error) {
        next(error)
    }
};

   




async function getVideogames (req, res, next) {

    try {

        if(req.query.name){
            const { name } = req.query;
            const videogames = await Videogame.findAll({
                where: {
                    name: name
                },
                include: Genre
            });
            if(videogames.length > 0){
                res.json(videogames);
            }else{
                const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`);
                const data = await response.data
                console.log(data)
                const videogamesApi = data.results;
                res.json(videogamesApi);
            }
            
        }else{
        const videogamesdb = await Videogame.findAll({include: Genre});
            let videogamesMapped = videogamesdb.map(videogame => {
            let genres = videogame.genres.map(genre => genre.name)
            const videogameData = {
                name: videogame.name,
                id: videogame.id,
                description: videogame.description,
                game_genres: genres.join(' - '),
                plataforms: videogame.plataforms,
                release_date: videogame.release_date,
                rating: videogame.rating,
            }
            return videogameData;
        })
    
    
    
    
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        const data = await response.data
        const responseNext = await axios.get(data.next)
        const dataNext = await responseNext.data
        const responseNext2 = await axios.get(dataNext.next)
        const dataNext2 = await responseNext2.data
        const responseNext3 = await axios.get(dataNext2.next)
        const dataNext3 = await responseNext3.data
        const responseNext4 = await axios.get(dataNext3.next)
        const dataNext4 = await responseNext4.data
    
        const games = [...data.results, ...dataNext.results, ...dataNext2.results, ...dataNext3.results, ...dataNext4.results].map(async game => {
            const description = await axios.get(`https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`)
            const dataDescription = await description.data
            const platforms = [];
            dataDescription.parent_platforms.forEach(platform => {
                platforms.push(platform.platform.name)
            })
            
    
            const videogame = {
                name: game.name,
                id: game.id,
                description: dataDescription.description,
                rating: game.rating_top,
                plataforms: platforms.join(' - '),
                release_date: game.released,
                game_genres: game.genres.map(genre => genre.name).join(' - '),
                background_image: game.background_image,
            }
            return videogame
        })
        await Promise.all(games)
        .then(videogames => {
            res.json(videogames.concat(videogamesMapped))
        }
        )};
        
    } catch (error) {
        next(error)
    }
};
    

async function getVideogameByName (req, res) {


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
                res.json({error: 'No se encontro el videojuego'})
            }
        }


 };






module.exports = {
    addVideogame,
    getVideogameById,
    getVideogames,
    getVideogameByName
};