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
import LowCal from "./LowCal";

import {Navbar,Nav, NavDropdown} from 'react-bootstrap';

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
        <NavDropdown title="Search" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#search">Search by Title</NavDropdown.Item>
          <NavDropdown.Item  href="#searchIngredient">Search by Ingredient</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Healthy" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#lowcal">Low Calorie</NavDropdown.Item>
      </NavDropdown>
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
            <Route exact path="/lowcal" component={LowCal}/>
          </div>
      </HashRouter>
      </div>
    );
  }
}
export default App;
