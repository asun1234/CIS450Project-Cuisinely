import React from "react";
import './index.css';
import {Table} from 'react-bootstrap';

class Banana extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bananas: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8081/bananas", {
      method: "GET",
    })
      .then(res => res.json())
      .then(bananasList => {
        if(!bananasList) return;
        var arr= bananasList.rows;
        var bananaDivs = arr.map((recipe, i) => {
          return (<tr>
            <td>{i+1}</td>
            <td>{recipe}</td>
          </tr>);
        });
        this.setState({
          bananas: bananaDivs
        })
      })
  }

  render() {
    return (
    <div className="results-container" id="results">
        <h3>Top Banana Recipes</h3>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Recipe</th>
          </tr>
        </thead>
        <tbody>
        {this.state.bananas}
        </tbody>
      </Table>
    </div>
    );
  }
}
 
export default Banana;