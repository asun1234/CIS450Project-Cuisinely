import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './style/Dashboard.css';
import {Table, Form, Button} from 'react-bootstrap';

class SearchRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowResults: [], curr_search: ''

        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {

    }

    searchRecipes(inputSearch) {
        fetch(`http://localhost:8081/search/${inputSearch}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(searchResults => {
                if (!searchResults) return;
                var arr = searchResults.rows;
                var searchDivs = arr.map((recipe, i) => {
                    return (<tr>
                      <td>{i+1}</td>
                      <td>{recipe[1]}</td>
                      <td>{recipe[2]}</td>
                      <td>{recipe[3]}</td>
                      <td>{recipe[4]}</td>
                      <td>{Number((recipe[5]).toFixed(2))}</td>
                    </tr>);
                  });

                this.setState({
                    rowResults: searchDivs
                })
            })
    }


    render() {
        return (
            <div className="Dashboard" class = "results-container">
                <h3>Search for a Recipe by Title</h3>
                <Form>
                <Form.Control type="recipe" placeholder="ingredient in title" value={this.state.curr_search}
                        onChange={e => {
                            this.setState({curr_search: e.target.value});
                        }} />
                    <Button variant="primary" onClick={() => this.searchRecipes(this.state.curr_search)}>
                        {'Submit'}
                    </Button>
                </Form>
                <br></br>
                <Table striped bordered hover size = "sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Recipe</th>
                        <th>Time</th>
                        <th>Num. Steps</th>
                        <th>Num. Ingredients</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rowResults}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default SearchRecipe;









