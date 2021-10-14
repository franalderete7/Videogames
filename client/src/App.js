import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home'


function App() {
  return (
  <>
    <Route exact path='/' component={Intro} />
  </>
  );
}

export default App;