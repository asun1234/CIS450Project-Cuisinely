import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import './style/Dashboard.css';

class RecipesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          recipesList: [],
        };
      }
      componentDidMount() {
          //var localLen = localStorage.getItem('recipesCartLength');
          if(localStorage.getItem("recipeCartJSON") !== null){
            var parsedArr = JSON.parse(localStorage.getItem("recipeCartJSON"));
            var recipeDivs = parsedArr.map((recipe, i) => {
              return(<ListGroupItem key = {i}>{recipe}</ListGroupItem>);
            });
          }
          this.setState({
            recipesList: recipeDivs
        })
      }
    render() {
        return(
        <div className="results-container" id="results">
            <ListGroup>
                <ListGroupItem variant = "primary"> Saved Recipes</ListGroupItem>
                {this.state.recipesList}
            </ListGroup>
        </div>
        );
    }
}

export default RecipesList;