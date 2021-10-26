import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getVideogameById } from '../../Redux/actions'
import './videogame.scss'


export function Videogame() {
    const { id } = useParams();
    const videogame = useSelector((state) => state.game);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideogameById(id));
        console.log('hola');
    }, [dispatch, id]);
    

  return (
 
    <div className="videogame-container">
      <h1 className="videogame-name">{videogame.name}</h1>
      <div className="videogame-data">
      <h4>Rating: {videogame.rating}</h4>
      <h4>Platforms: {videogame.plataforms}</h4>
      <h4>Release date: {videogame.release_date} </h4>
      <h4>Genres: {videogame.genres ?  videogame.genres.map(genre => genre.name).join(', ') : 
          videogame.game_genres
         }
      </h4>
      </div>
     <p className="videogame-description">{videogame.description ? videogame.description.replace(/<[^>]+>/g, '') : videogame.description}</p>

    
     <img className="videogame-img" src={videogame.background_image ?
              videogame.background_image :
              "https://images6.alphacoders.com/427/427535.jpg"
    } alt=""/>
   </div>
  );
}