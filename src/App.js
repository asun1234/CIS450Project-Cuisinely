import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Banana from "./Banana";
import ConnectDB from "./ConnectDB";

import {Button,ButtonGroup } from 'react-bootstrap';

class App extends React.Component{

  
  render(){
    return (
      <HashRouter>
        <div className= "App">
          <h1>CIS 450: Course Project</h1>
          <ButtonGroup> 
            <Button variant="outline-primary"><NavLink to="/bananas">Banana Recipes</NavLink></Button>
            <Button variant="outline-primary"><NavLink to="/topten">Top 10 Recipes</NavLink></Button>

          </ButtonGroup>
          <div className="content">
            <Route exact path="/bananas" component={Banana}/>
            <Route path="/topten" component={ConnectDB}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default App;
