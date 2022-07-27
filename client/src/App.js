import './App.css';
import { Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home';
import CreateDog from './components/CreateDog';
import DogDetail from './components/DogDetail';

function App() {
  return (

    <div className="App">
      <h1>Henry Dogs</h1>

      <Route exact path={'/'} render={() => <LandingPage />} />
      <Route exact path={'/home'} render={() => <Home />} />
      <Route exact path={'/dogs'} render={() => <CreateDog />} />
      <Route path={'/dogs/:id'} render={() => <DogDetail />} />

    </div>

  );
}

export default App;
