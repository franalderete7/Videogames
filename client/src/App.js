import './App.css';
import { Route, useLocation } from 'react-router-dom';
import Intro from './components/Intro'
import Home from './components/Home'
import Nav from './components/Nav';
import CreateGame from './components/CreateGame';
import { Videogame } from './components/Videogame';
 


function App() {
  const location = useLocation();
  
  return (
  <>
    {location.pathname === '/' ? null : <Nav />}
    <Route exact path='/' component={Intro} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/videogames/:id" component={Videogame} />
    <Route exact path="/createyourgame" component={CreateGame} />

  </>
  );
}

export default App;