import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import {
  Route,
  NavLink,
  HashRouter,
  Router
} from "react-router-dom";
import Stuff from "./Stuff";
import ConnectDB from "./ConnectDB";

import { Form, Button,ButtonGroup } from 'react-bootstrap';

class App extends React.Component{

  
  render(){
    return (
      <HashRouter>
        <div className= "App">
          <h1>CIS 450: Course Project</h1>
          <ButtonGroup> 
            <Button variant="outline-primary"><NavLink to="/stuff">Stuff</NavLink></Button>
            <Button variant="outline-primary"><NavLink to="/people">Database</NavLink></Button>

          </ButtonGroup>

            <div className = "form">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </div>
          <div className="content">
            <Route exact path="/stuff" component={Stuff}/>
            <Route path="/people" component={ConnectDB}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default App;
