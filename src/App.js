/* eslint-disable jsx-a11y/iframe-has-title */
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
import LowCarb from "./LowCarb";
import LowFat from "./LowFat";
import LowSugar from "./LowSugar";
import HighProtein from "./HighProtein.js";

import {Navbar,Nav, NavDropdown} from 'react-bootstrap';
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      randGif: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {

  }
  randGif(){
    var gif0 = <iframe src="https://giphy.com/embed/b5Hcaz7EPz26I" width="480" height="357" frameBorder="1" ></iframe>;
    var gif1 = <iframe src="https://giphy.com/embed/N23cG6apipMmQ" width="480" height="342" frameBorder="1"></iframe>
    var gif2 = <iframe src="https://giphy.com/embed/CNocEFcF9IBegtgW3q" width="480" height="360" frameBorder="1"></iframe>
    var gif3 = <iframe src="https://giphy.com/embed/rkgX9MTBXJa1O" width="480" height="360" frameBorder="1"></iframe>
    var gif4 = <iframe src="https://giphy.com/embed/10sTpXkrooA2bK" width="480" height="357" frameBorder="1"></iframe>
    var randVal= Math.floor(Math.random);
    if(randVal % 5 === 0){
      console.log("randVal: " + 0);
      this.setState({
        randGif: gif0
      })
    }else if(randVal % 5 === 1){
      console.log("randVal: " + 1);
      this.setState({
        randGif: gif1
      })   
     }else if(randVal % 5 === 2){
      console.log("randVal: " + 2);
      this.setState({
        randGif: gif2
      }) 
    }else if(randVal % 5 === 3){
      console.log("randVal: " + 3);
      this.setState({
        randGif: gif3
      }) 
    }else if(randVal % 5 === 4){
      console.log("randVal: " + 4);
      this.setState({
        randGif: gif4
      }) 
    }
  }


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
          <NavDropdown.Item href="#lowfat">Low Fat</NavDropdown.Item>
          <NavDropdown.Item href="#lowcarb">Low Carb</NavDropdown.Item>
          <NavDropdown.Item href="#lowsugar">Low Sugar</NavDropdown.Item>
          <NavDropdown.Item href="#highpro">High Protein</NavDropdown.Item>
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
            <Route exact path="/lowfat" component={LowFat}/>
            <Route exact path="/lowcarb" component={LowCarb}/>
            <Route exact path="/lowsugar" component={LowSugar}/>
            <Route exact path="/highpro" component={HighProtein}/>
            <Route exact path="/home">
            <div className="results-container" id="results">
              <h3>Welcome to our recipes app! Happy cooking :)</h3>
              {this.state.randGif}
            </div>
            </Route>
          </div>
      </HashRouter>
      </div>
    );
  }
}
export default App;
