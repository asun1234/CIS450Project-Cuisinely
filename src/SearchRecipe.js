import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './style/Dashboard.css';
import {Row, Col, Table, Form,Button} from 'react-bootstrap';
import Checkbox from '@material-ui/core/Checkbox';

class SearchRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowResults: [],
            curr_search: '',
            recipes: []
        };
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

        if (localStorage.getItem("recipeCartJSON") === null || !e.target.checked) {
            localStorage.setItem("recipeCartJSON", JSON.stringify(this.state.recipes));
        } else {
            var existing = JSON.parse(localStorage.getItem('recipeCartJSON'));
            existing = existing.concat(this.state.recipes);
            var set = existing.filter((x, i, a) => a.indexOf(x) === i)
            console.log(set);
            localStorage.setItem('recipeCartJSON', JSON.stringify(set));
        }
    }
    
    searchRecipes(inputSearch) {
        const handleClick = (event) => {
            this.checked = event.target.checked;
        };

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
                      <td>
                      <Checkbox
                                key={i + 1}
                                color="primary"
                                checked={this.checked}
                                onClick={handleClick}
                                value={recipe[1]}
                                onChange={this.onChangeRec.bind(this)}
                            >
                            </Checkbox>
                        </td>
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
                    <Form.Group as={Row}>
                    <Col sm="11">
                        <Form.Control type="recipe" placeholder="keyword in title" value={this.state.curr_search}
                            onChange={e => {
                                this.setState({ curr_search: e.target.value });
                            }}/>
                     </Col>
                        <Button variant= "outline-primary" onClick={() => this.searchRecipes(this.state.curr_search)}>
                            {'Submit'}
                        </Button>
                    </Form.Group>
                </Form>
                <br></br>
                <Table striped size = "sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Recipe</th>
                        <th>Time</th>
                        <th>Num. Steps</th>
                        <th>Num. Ingredients</th>
                        <th>Rating</th>
                        <th>Add to Recipe Cart</th>
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









