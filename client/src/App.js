import './App.css';
import { Route } from 'react-router-dom';
import Intro from './components/Intro'
 


function App() {
  return (
  <>
    <Route exact path='/' component={Intro} />
  </>
  );
}

export default App;