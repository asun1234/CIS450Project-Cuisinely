import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from 'react-bootstrap';
import './style/Dashboard.css';
import Checkbox from '@material-ui/core/Checkbox';

class LowCarb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topten: [],
      recipes:[]
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  onChangeRec(e) {
    var recipesArr = this.state.recipes;
    let index = 0;

    if (e.target.checked) {
      recipesArr.push(e.target.value)
    } else {
      index = recipesArr.indexOf(e.target.value)
      recipesArr.splice(index, 1)
    }

    this.setState({
      recipes: recipesArr
    })
    
    if(localStorage.getItem("recipeCartJSON") === null){
      localStorage.setItem("recipeCartJSON", JSON.stringify(this.state.recipes));
    }else{
      var existing = JSON.parse(localStorage.getItem('recipeCartJSON'));
      existing = existing.concat(this.state.recipes);
      var set = existing.filter((x, i, a) => a.indexOf(x) === i)
      console.log(set);
      localStorage.setItem('recipeCartJSON', JSON.stringify(set));
    }
  }

  componentDidMount() {
    const handleClick = (event) => {
      this.checked = event.target.checked;
    };

    fetch("http://localhost:8081/lowcarb", {
      method: "GET",
    })
      .then(res => res.json())
      .then(tenList => {
        if(!tenList) return;
        var arr= tenList.rows;
        var tenDivs = arr.map((recipe, i) => {
          return (<tr>
            <td>{i+1}</td>
            <td>{recipe[0]}</td>
            <td>{recipe[1]}</td>
            <td>{Number((recipe[2]).toFixed(2))}</td>
            <td>
               <Checkbox
                key={i + 1}
                color="primary"
                checked={this.checked}
                onClick={handleClick}
                value={recipe[0]}
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
      <h3>Low Carb</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Recipe</th>
            <th>Carbohydrates</th>
            <th>Rating</th>
            <th>Add to Recipe Cart</th>
          </tr>
        </thead>
        <tbody>
        {this.state.topten}
        </tbody>
      </Table>
    </div>
    );
  }
}

export default LowCarb;
