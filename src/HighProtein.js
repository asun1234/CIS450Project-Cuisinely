import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from 'react-bootstrap';
import './style/Dashboard.css';

class HighProtein extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highPro: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8081/highpro", {
      method: "GET",
    })
      .then(res => res.json())
      .then(tenList => {
        if(!tenList) return;
        var arr= tenList.rows;
        var divs = arr.map((recipe, i) => {
          return (<tr>
            <td>{i+1}</td>
            <td>{recipe[0]}</td>
            <td>{Number((recipe[1]).toFixed(1))}</td>
            <td>{Number((recipe[2]).toFixed(2))}</td>
          </tr>);
        });
        this.setState({
            highPro: divs
        })
      })
  }

  render() {
    return (
    <div className="results-container" id="results">
      <h3>High Protein</h3>
      <Table striped bordered hover variant = "dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Recipe</th>
            <th>Protein</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
        {this.state.highPro}
        </tbody>
      </Table>
    </div>
    );
  }
}

export default HighProtein;
