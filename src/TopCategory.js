import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from 'react-bootstrap';
import './style/recipeRow.css'

class TopCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        topcat: [],
      ingredients: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8081/topcat", {
      method: "GET",
    })
      .then(res => res.json())
      .then(tenList => {
        if(!tenList) return;
        var arr= tenList.rows;
        var tenDivs = arr.map((category, i) => {
          var cat = category.toString();
          var catCap = cat.charAt(0).toUpperCase() + cat.slice(1)
          return (<tr>
            <td>{i+1}</td>
            <td>{catCap}</td>
            
          </tr>);
        });
        this.setState({
            topcat: tenDivs
        })
      })
  }

  render() {
    return (
    <div className="results-container" id="results">
      <h3>Top Ten Categories</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Top Recipes</th>
          </tr>
        </thead>
        <tbody>
        {this.state.topcat}
        </tbody>
      </Table>
    </div>
    );
  }
}

export default TopCategory;
