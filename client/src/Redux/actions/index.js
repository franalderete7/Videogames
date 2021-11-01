import axios from 'axios';


export const getVideogameById = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogames/${id}`)
            .then(res => {
                dispatch({
                    type: 'GET_VIDEOGAME_BY_ID',
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'GET_VIDEOGAME_BY_ID_ERROR',
                    payload: err
                })
            })
    }
}

// export const getVideogameByI = (id) => {
//     return async (dispatch) => {
   
//         try {

//         const response = (await axios.get(`http://localhost:3001/videogames/?id=${id}`)).data
//         dispatch({
//             type: 'GET_VIDEOGAME_BY_ID',
//             payload: response
//         });
        
//     } catch (err) {
//         dispatch({
//             type: 'GET_VIDEOGAME_BY_ID_ERROR',
//             payload: err
//         })

//     }
// }
// };
    


export const fetchListGames = () => {
    return (dispatch) => {
        dispatch(fetchListGamesRequest());
        axios.get('http://localhost:3001/videogames')
            .then((response) => {
                const games = response.data;
                dispatch(fetchListGamesSuccess(games));
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchListGamesFailure(errorMessage))
            })
    }
}

export const fetchListGamesRequest = () => {
    return {    
        type: 'FETCH_LIST_GAMES_REQUEST',
    }
}


export const fetchListGamesSuccess = (games) => {
    return {
        type: 'LIST_GAMES_SUCCESS',
        payload: games     
    }
}

export const fetchListGamesFailure = (error) => {
    return {
        type: 'LIST_GAMES_FAILURE',
        payload: error
    }
}

export const fetchGenreList = () => {
    return (dispatch) => {
        dispatch(fetchGenreListRequest());
        axios.get('http://localhost:3001/genres')
            .then((response) => {
                const genres = response.data;
                dispatch(fetchGenreListSuccess(genres));
            })
            .catch((error) => {
                const errorMessage = error.message
                dispatch(fetchGenreListFailure(errorMessage))
            })
    }
}

export const fetchGenreListRequest = () => {
    return {    
        type: 'FETCH_GENRE_LIST_REQUEST',
    }
}

export const fetchGenreListSuccess = (genres) => {
    return {
        type: 'GENRE_LIST_SUCCESS',
        payload: genres     
    }
}

export const fetchGenreListFailure = (error) => {
    return {
        type: 'GENRE_LIST_FAILURE',
        payload: error
    }
}