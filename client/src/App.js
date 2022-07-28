import './App.css';
import { Route } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import CreateDog from './components/CreateDog/CreateDog';
import DogDetail from './components/DogDetail/DogDetail';

function App() {
  return (
    <div className='fondo'>
    <div></div>
      <div className="App">
        <Route exact path={'/'} render={() => <LandingPage />} />
        <Route exact path={'/home'} render={() => <Home />} />
        <Route exact path={'/dogs'} render={() => <CreateDog />} />
        <Route path={'/dogs/:id'} render={() => <DogDetail />} />
      </div>

    </div>
  );
}

export default App;
