import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from 'react-bootstrap';
import Checkbox from '@material-ui/core/Checkbox';
import './style/Dashboard.css';

class RecipesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesList: [],
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

    if (localStorage.getItem("recipeToIng") === null) {
      localStorage.setItem("recipeToIng", JSON.stringify(this.state.recipesToIngredients));
    } else {
      var existing = JSON.parse(localStorage.getItem('recipeToIng'));
      existing = existing.concat(this.state.recipesToIngredients);
      var set = existing.filter((x, i, a) => a.indexOf(x) === i)
      console.log(set);
      localStorage.setItem('recipeToIng', JSON.stringify(set));
    }
  }
  
  componentDidMount() {
    const handleClickCheck = (event) => {
      this.checked = event.target.checked;
    };
    if (localStorage.getItem("recipeCartJSON") !== null) {
      var parsedArr = JSON.parse(localStorage.getItem("recipeCartJSON"));
      var recipeDivs = parsedArr.map((recipe, i) => {
        return (
          <tr key = {i+1}>
            <td>{i + 1}</td>
            <td>{recipe}</td>
            <td>
              <Checkbox
                key={i + 1}
                color="primary"
                checked={this.checked}
                onClick={handleClickCheck}
                value={recipe}
                onChange={this.addToIng.bind(this)}
              >
              </Checkbox>
            </td>
          </tr>
        );
      });
    }

    this.setState({
      recipesList: recipeDivs
    })
    console.log(this.state.recipeDivs);
  }
  render() {
    return (
      <div className="results-container" id="results">
        <script crossOrigin = "true" src="..."></script>
        <h3>Recipes List</h3>
        <p></p>
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Recipe</th>
                <th>Add Ingredients</th>
              </tr>
            </thead>
            <tbody>
              {this.state.recipesList}
            </tbody>
          </Table>
      </div>
    );
  }
}

export default RecipesList;