import './App.css';
import {  Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home';

function App() {
  return (
  
      <div className="App">
        <h1>Henry Dogs</h1>
        
        <Route exact path={'/'}render={()=><LandingPage/>} />
        <Route exact path={'/home'} render={() => <Home/>} />
        
      </div>
    
  );
}

export default App;
