import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from 'react-bootstrap';
import './style/Dashboard.css';
import Checkbox from '@material-ui/core/Checkbox';

class ConnectDB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topten: [],
      recipes: [],
      ingredients: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  onChangeRec(e) {
    // current array of options
    var recipesArr = this.state.recipes;
    let index = 0;

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      recipesArr.push(e.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = recipesArr.indexOf(e.target.value)
      recipesArr.splice(index, 1)
    }

    // update the state with the new array of options
    this.setState({ 
      recipes: recipesArr
    })
  }

  componentDidMount() {

  const handleClick = (event) => {
    this.checked = event.target.checked;
  };
    fetch("http://localhost:8081/topten", {
      method: "GET",
    })
      .then(res => res.json())
      .then(tenList => {
        if(!tenList) return;
        var arr= tenList.rows;
        var tenDivs = arr.map((recipe, i) => {
          return (<tr>
            <td>{i+1}</td>
            <td>{recipe}</td>
            <td>
                <Checkbox 
                key = {i+1} 
                 color="primary"
                checked={this.checked}
                onClick={handleClick}
                value = {recipe}
                onChange={this.onChangeRec.bind(this)}
                >
                </Checkbox>
            </td>
          </tr>);
        });
        this.setState({
          topten: tenDivs
        })
      })
  }

  render() {
    return (
    <div className="results-container" id="results">
      <h3>Top Ten Recipes</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Recipe</th>
            <th>
              Add to Recipe Cart
            </th>
            <th>
              Add to Ingredient Cart
            </th>
          </tr>
        </thead>
        <tbody>
        {this.state.topten}
        </tbody>
      </Table>

      <div className="selected-recipes">
          {this.state.recipes.map((recipe, i) => 
             <p key={recipe}>Saved Recipe #{i+1}: {recipe}</p>
          )}
        </div>
    </div>
    );
  }
}

export default ConnectDB;
