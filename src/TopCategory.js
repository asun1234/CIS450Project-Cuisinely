import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table, FormCheck, Form} from 'react-bootstrap';
import './style/recipeRow.css'
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

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
          return (<tr>
            <td>{i+1}</td>
            <td>{category}</td>
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
            <th>
              Add to Ingredient Cart
            </th>
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
