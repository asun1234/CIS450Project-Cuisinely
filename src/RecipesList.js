import React from "react";
import 'core-js';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from 'react-bootstrap';
import Checkbox from '@material-ui/core/Checkbox';
import './style/Dashboard.css';

class RecipesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesList: [],
      justRecipes: [],
      recipesToIngredients: []
    };
  }

  addToIng(e) {
    var recipesArr = this.state.recipesToIngredients;
    let index = 0;

    if (e.target.checked) {
      recipesArr.push(e.target.value)
    } else {
      index = recipesArr.indexOf(e.target.value)
      recipesArr.splice(index, 1)
    }

    this.setState({
      recipesToIngredients: recipesArr
    })

    if (localStorage.getItem("recipeToIng") === null || !e.target.checked) {
      localStorage.setItem("recipeToIng", JSON.stringify(this.state.recipesToIngredients));
    } else if (e.target.checked) {
      var existing = JSON.parse(localStorage.getItem('recipeToIng'));
      existing = existing.concat(this.state.recipesToIngredients);
      var set = existing.filter((x, i, a) => a.indexOf(x) === i)
      localStorage.setItem('recipeToIng', JSON.stringify(set));
    }
  }

  deleteItem(e) {

    var list = this.state.justRecipes;
    var index = list.indexOf(e.target.value)
    list.splice(index, 1)
    console.log(list);
    this.setState({
      justRecipes: list
    })

    localStorage.setItem('recipeCartJSON', JSON.stringify(this.state.justRecipes));
    this.componentDidMount()
  }


  deleteAll() {
    localStorage.removeItem("recipeCartJSON")
    this.setState({
      recipesList: []
    })
  }


  componentDidMount() {
    const handleCheck = (event) => {
      this.checked = event.target.checked;
    };
    if (localStorage.getItem("recipeCartJSON") !== null) {
      var parsedArr = JSON.parse(localStorage.getItem("recipeCartJSON"));
      var recipeDivs = parsedArr.map((recipe, i) => {
        return (
          <tr key={i + 1}>
            <td>{i + 1}</td>
            <td>{recipe}</td>
            <td>
              <Checkbox
                key={i + 1}
                color="primary"
                checked={this.checked}
                onClick={handleCheck}
                value={recipe}
                onChange={this.addToIng.bind(this)}
              >
              </Checkbox>
            </td>
            <td>
              <Button
                variant="outline-secondary"
                value={recipe}
                onClick={this.deleteItem.bind(this)}>
                Delete
          </Button>
            </td>
          </tr>
        );
      });
    }
    this.setState({
      justRecipes: parsedArr,
      recipesList: recipeDivs
    })
  }

  render() {
    return (
      <div className="results-container" id="results">
        <script crossOrigin="true" src="..."></script>
        <h3>Recipes List</h3>
        <p></p>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Recipe</th>
              <th>Add Ingredients</th>
              <th>Delete Ingredient</th>
            </tr>
          </thead>
          <tbody>
            {this.state.recipesList}
          </tbody>
        </Table>
        <Button
          variant="outline-primary"
          onClick={this.deleteAll.bind(this)}>
          Delete All
          </Button>
      </div>
    );
  }
}

export default RecipesList;