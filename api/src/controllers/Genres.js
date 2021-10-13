const axios = require('axios')
const {Genre} = require('../db');
const {API_KEY} = process.env;


async function getGenres (req, res, next) {
    
    try{
        let GenresDatabase = await Genre.findAll()

        if(!GenresDatabase.length){
    
            let apiResult = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;

            let genres = apiResult.map(p => ({
                id: p.id,
                name: p.name
            }));

            let dbResult = await Genre.bulkCreate(genres)
             
            return res.send(dbResult);
        }else{

            return res.send(GenresDatabase)
        } 
        }catch(error){
            next(error)
        }
}

module.exports = {getGenres}; 