import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table, FormCheck, Form} from 'react-bootstrap';
import './style/Dashboard.css';
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

class ConnectDB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topten: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
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
              <Form>
                <FormCheck>
                  <FormCheckInput type="checkbox" id="blankCheckbox" value={i+1} aria-label="..."></FormCheckInput>
                </FormCheck>
              </Form>
            </td>
            <td>
              <Form>
                <FormCheck>
                  <FormCheckInput type="checkbox" id="blankCheckbox" value={i+1} aria-label="..."></FormCheckInput>
                </FormCheck>
              </Form>
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
    </div>
    );
  }
}

export default ConnectDB;
