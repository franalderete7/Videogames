   
import React, {useEffect, useState } from 'react';
import {fetchListGames, fetchGenreList} from '../../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import './videogamelist.scss'
import { Link } from 'react-router-dom';


export function VideogameList() {
    const dispatch = useDispatch();
    const listGames = useSelector(state => state.games);
    console.log(listGames);
    useEffect(() => {
        dispatch(fetchListGames());
    }, [dispatch]);
    const listGenres = useSelector(state => state.genres);
    useEffect(() => {
        dispatch(fetchGenreList());
    }, [dispatch]);
    console.log(listGenres);
    //paginado de los juegos
    const [currentPage, setCurrentPage] = useState(0);
    const[filters, setFilters] = useState({
        search: "",
        filter: "",
        sort: "",
        sortOrigin: "",
        ratingSort: "",
        platformsort: "",
        // release_dateSort: "",
    });


    const filteredGames = () => {
        // API array de objetos juegos... game_genres
        // DB array de objetos juegos... genres ... [name]
        
        if (filters.search.length > 0) return listGames.filter(game => game.name.toLowerCase().includes(filters.search.toLowerCase())).slice(currentPage, currentPage + 15);
        if (filters.filter.length > 0) return listGames.filter(game => game.game_genres.split(' - ').includes(filters.filter)).slice(currentPage, currentPage + 15);
        if (filters.sort === 'A-Z') return listGames.sort((a, b) => a.name.localeCompare(b.name)).slice(currentPage, currentPage + 15);
        if (filters.sort === 'Z-A') return listGames.sort((a, b) => b.name.localeCompare(a.name)).slice(currentPage, currentPage + 15);
        if (filters.sortOrigin === 'API') return listGames.filter(game => !(isNaN(game.id))).slice(currentPage, currentPage + 15);
        if (filters.sortOrigin === 'Database') return listGames.filter(game => isNaN(game.id)).slice(currentPage, currentPage + 15);
        if (filters.ratingSort === 'High to Low') return listGames.sort((a, b) => b.rating - a.rating).slice(currentPage, currentPage + 15);
        if (filters.ratingSort === 'Low to High') return listGames.sort((a, b) => a.rating - b.rating).slice(currentPage, currentPage + 15);
        // if (filters.release_dateSort === 'Recent to Older') return listGames.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)).slice(currentPage, currentPage + 15);
        // if (filters.release_dateSort === 'Older to Recent') return listGames.sort((a, b) => new Date(a.release_date) - new Date(b.release_date)).slice(currentPage, currentPage + 15);
        else return listGames.slice(currentPage, currentPage + 15)
    };



    const nextPage = () => {
            setCurrentPage(currentPage + 15);
    
    }
    const prevPage = () => {
        setCurrentPage(currentPage - 15);

    }

    // useEffect(() => {
    //     setFilters(JSON.parse(window.localStorage.getItem('filters')));
    //   }, []);
    
    //   useEffect(() => {
    //     window.localStorage.setItem('filters', filters);
    //   }, [filters]);

    const handleChange = (e) => {
        setCurrentPage(0);
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }


      return (
        <>
            <div className="search-bar">
                <div className="searchInputWrapper">
                <input 
                 name="search"
                 value={filters.search}
                 onChange={handleChange}
                 className="searchInput" 
                 type="text" 
                 placeholder='Search a videogame...'>
                </input>
                <i className="searchInputIcon fa fa-search"></i>
                </div>
            </div>
            <div className="filters">
                <div className="filter">
                    <h1 >
                        Filter by genre:
                    </h1>
                    <select
                        name="filter"
                        value={filters.filter}
                        onChange={handleChange}
                        className="select-genre"
                    >
                        <option value=""></option>
                    {
                        listGenres.map(genre => 
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                        )
                    }     
                    </select>
                </div>
                <div className="filter">
                    <h1 >
                        Sort by rating:
                    </h1>
                    <select
                    name="ratingSort"
                    value={filters.ratingSort}
                    onChange={handleChange}
                    className="select-rate"
                    >
                        <option value=""></option>
                        <option value="High to Low">High to Low</option>
                        <option value="Low to High">Low to High</option>
                    </select>
                </div>
                {/* <div className="filter">
                    <h1 >
                        Sort by release_date:
                    </h1>
                    <select
                    name="release_dateSort"
                    value={filters.release_dateSort}
                    onChange={handleChange}
                    className="select-release-date"
                    >
                        <option value=""></option>
                        <option value="Recent to Older">Recent to Older</option>
                        <option value="Older to Recent">Older to Recent</option>
                    </select>
                </div> */}
                <div className="filter" >
                    <h1 >
                        Filter by origin:
                    </h1>
                    <select
                        name="sortOrigin"
                        value={filters.sortOrigin}
                        onChange={handleChange}
                        className="select-origin"
                    >
                        <option value=""></option>
                        <option value="API">API</option>
                        <option value="Database">Database</option> 
                    </select>
                </div>
                <div className="filter">
                <h1 >
                    Sort by name:
                </h1>
                <select
                    name="sort"
                    value={filters.sort}
                    onChange={handleChange}
                    className="select-sort"
                >
                    <option value="">
                    </option>
                    <option value="A-Z">
                        A-Z
                    </option>
                    <option value="Z-A">
                        Z-A
                    </option>
                </select>
                </div>
            </div>
            {listGames.length === 0 ?<div className="spinner-container"> <div className="spinner"></div></div> : 
             filteredGames().length === 0 ? <h1 className="games-not-found">No games found</h1> :  
            <div className="list-container">
                {filteredGames().map(game =>
                    <div className="list-item" key={game.id}>
                            <div className="list-item-name">
                                <h1>{game.name}</h1>
                            </div>
                            <div className="list-item-genres">
                                <h4>{game.game_genres}</h4>
                            </div>
                            <div className="list-item-img">
                                <img 
                                src={game.background_image ? 
                                game.background_image 
                                : "https://images6.alphacoders.com/427/427535.jpg"} 
                                alt={game.name}/>
                            </div>
                           <div className="link-container">
                            <Link className="list-item-link" to={`/videogames/${game.id}`}>
                               <p> More info </p>
                            </Link>
                           </div>
                    </div>
                )}
            </div >
        }
            <div className="pagination">
                <button 
                    className="pagination-button"
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    
                >
                    Previous
                </button>
                <button
                    className="pagination-button"
                    onClick={nextPage}
                    disabled={filteredGames().length < 15}
                >
                    Next
                </button>
            </div>
        </>
    );
                                
}

 

export default VideogameList