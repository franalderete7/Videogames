const initialState = {
    loading: false,
    games: [],
    error: '',
    genres: [],
    game: {},
  
  };
  
  // 
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LIST_GAMES_SUCCESS':
        return {
          ...state,
          loading: true,
          games: action.payload,
          error: '',
        };
      case 'LIST_GAMES_FAILURE':
        return {
          ...state,
          loading: false,
          games: [],
          error: action.payload,
        };
      case 'FETCH_LIST_GAMES_REQUEST':
        return {
          ...state,
          loading: false,
        };
      case 'FETCH_GENRE_LIST_REQUEST':
        return {
          ...state,
          loading: false,
        };
      case 'GENRE_LIST_SUCCESS':
        return {
          ...state,
          loading: true,
          genres: action.payload,
          error: '',
        };
      case 'GENRE_LIST_FAILURE':
        return {
          ...state,
          loading: false,
          genres: [],
          error: action.payload,
        };
  
      case 'GET_VIDEOGAME_BY_ID':
        return {
          ...state,
          loading: true,
          game: action.payload,
          error: '',
      };
      case 'GET_VIDEOGAME_BY_ID_ERROR':
        return {
          ...state,
          loading: false,
          game: {},
          error: action.payload,
      };
  
      default:
        return state;
    }
  }
  
  export default rootReducer;