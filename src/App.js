import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import {
  Route,
  HashRouter
} from "react-router-dom";
import ConnectDB from "./ConnectDB";
import TopCategory from "./TopCategory";
import SearchRecipe from "./SearchRecipe";
import SearchIngredient from "./SearchIngredient";

import {Navbar,Nav } from 'react-bootstrap';

class App extends React.Component{

  
  render(){
    return (
      <div>
  <Navbar bg="primary" variant="dark" sticky="top" >
  <Navbar.Brand href="#home">CIS 450 Project: Recipe Search</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
      <HashRouter>
      <Nav className="mr-auto">
        <Nav.Link href="#topten">Top Recipes</Nav.Link>
        <Nav.Link href="#topcat">Top Categories</Nav.Link>
        <Nav.Link href="#search">Search by Title</Nav.Link>
        <Nav.Link href="#searchIngredient">Search by Ingredient</Nav.Link>
      </Nav>
       </HashRouter>
  </Navbar.Collapse>
</Navbar>
      <HashRouter>
          <div className="App">
            <Route exact path="/topten" component={ConnectDB}/>
            <Route exact path="/topcat" component={TopCategory}/>
            <Route path="/search" component={SearchRecipe}/>
            <Route exact path="/searchIngredient" component={SearchIngredient}/>
          </div>
      </HashRouter>
      </div>
    );
  }
}
export default App;
