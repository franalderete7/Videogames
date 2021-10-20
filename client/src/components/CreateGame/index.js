import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenreList } from "../../Redux/actions";
// import axios from "axios";

import './creategame.scss'

export default function CreateGame() {
    const dispatch = useDispatch();
    const genreList = useSelector(state => state.genres);
    useEffect(() => {
        dispatch(fetchGenreList());
    }, [dispatch]);
    const [newGame, setNewGame] = useState({
        name: "",
        description: "",
        release_date: "",
        rating: "",
        game_genres: [],
        plataforms: "",
    });
    //handleChange para cada checkbox

    const handleChangeGenres = (e) => {
        if(newGame.game_genres.includes(e.target.value)){
            setNewGame({
                ...newGame,
                game_genres: newGame.game_genres.filter(genre => genre !== e.target.value)
            })
        }
        else{
            setNewGame({
                ...newGame,
                game_genres: [...newGame.game_genres, e.target.value]
            })
        }
    };
    const handleChange = (e) => {
        setNewGame({
            ...newGame,
            [e.target.name]: e.target.value
        });
    };
   
    async function handleSubmit(e) {
        const response = await fetch("http://localhost:3001/videogames/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(newGame),
        });
        const data = await response.json();
        if(data.error){
            alert(data.error)
        }
    };

    // async function handleSubmit(e) {
    //   e.preventDefault();
    //    const response =  await axios.post("http://localhost:3001/videogames/add", newGame)
    //     .then(response => {
    //       console.log(response.data.data)
    //             if(response.data.message === "juego creado"){
    //                 window.location.href = `/gamecreated` 

    //             }})
    //           }







  return (
    <div className="creategame-main">
      <h1>Create your game</h1>
      <form className="form-container" >
          <h2>Game Name:</h2>
          <input 
          type="text" 
          name="name" 
          value={newGame.name} 
          className={!newGame.name && "input-error"} 
          onChange={handleChange} 
          required />
          {!newGame.name && <p className="alert">*Please enter a name</p>}
          <h2>Description:</h2> 
          <textarea 
          type="text" 
          name="description" 
          value={newGame.description} 
          className={!newGame.description && "input-error"} 
          onChange={handleChange} required/>
        {!newGame.description && <p className="alert">*Please enter a description</p>}
   
          <h2>Release Date:</h2>
          <input 
          type="date" 
          name="release_date" 
          value={newGame.release_date} 
          onChange={handleChange} 
          />
        {/* {!newGame.release_date && <p className="alert">*Please enter a release date</p>} */}
  
        <h2>Rating:</h2>
        {!newGame.rating && <p className="alert">*Please enter a rating</p>}
            <select 
            name="rating" 
            value={newGame.rating} 
            onChange={handleChange}
            className={!newGame.rating && "input-error"}
            >
              <option></option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          <h2>Platforms:</h2>
          <input 
          type="text" 
          name="plataforms" 
          value={newGame.plataforms} 
          className={!newGame.plataforms && "input-error"} 
          onChange={handleChange} 
          required
          />
          {!newGame.plataforms && <p className="alert">*Please enter a platforms</p>}
        <div className="genres-container">
          <h2>Genres:</h2>
          <p className="selected-genres">{newGame.game_genres.join(' - ')}</p>
            <div className="checkbox-container">
              {genreList.map(genre => (
                <div key={genre.id}>
                  <input type="checkbox" 
                  onChange={handleChangeGenres} 
                  name={genre.name} 
                  value={genre.name} />
                  {genre.name}
                </div>
              ))}
            </div>
        </div>
          <input 
          type="submit"
          value="Create your game" 
          className="form-submit"
          onClick={newGame.name && newGame.description && newGame.plataforms && newGame.rating && handleSubmit} 
          disabled={!newGame.name || !newGame.description || !newGame.plataforms || !newGame.rating}
          />  
      </form>
    </div>
  );
}