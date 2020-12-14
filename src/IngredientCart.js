import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, ButtonGroup } from 'react-bootstrap';

class IngredientCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredList: [],
            justIngred: [],
            midDivs: []
        };
        this.getSuggestedRecipes = this.getSuggestedRecipes.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    getIngredient(recipeTitle) {
        fetch(`http://localhost:8081/ingredientCart/${recipeTitle}`, {
            method: "GET",
        })
            .then(res => res.json())
            // eslint-disable-next-line no-loop-func
            .then(searchResults => {
                if (!searchResults) return;
                var searchIng = searchResults.rows;
                if (this.state.justIngred.length > 0) {
                    var oldDivs = this.state.justIngred;
                    oldDivs = [...new Set(oldDivs)];
                    searchIng = oldDivs.concat(searchIng);
                    searchIng = [...new Set(searchIng)];
                }
                searchIng = searchIng.sort();
                var i;
                var divs = [];
                var finalSet = new Set();

                var index = 0;
                for (i = 0; i < searchIng.length; i++) {
                    const currIng = searchIng[i][0];
                    if (!finalSet.has(currIng)) {
                        divs[index] = (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{currIng}</td>
                                <td>
                                    <Button
                                        variant="outline-secondary"
                                        value={index}
                                        onClick={this.deleteItem.bind(this)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>);
                        index++;
                        finalSet.add(currIng);
                    }
                }

                this.setState({
                    justIngred: searchIng,
                    ingredList: divs
                })
            })
    }

    deleteItem(e) {
        var list = this.state.justIngred;
        var index = e.target.value;
        console.log("pre split list: " + list);
        list.splice(index, 1)
        console.log("post split list: " + list);
        var divs = this.state.ingredList;

        this.setState({
            justIngred: list
        })

        this.componentDidMount()
    }

    deleteAll() {
        localStorage.removeItem("recipeToIng");
        this.setState({
            ingredList: [],
            justIngred: [],
            midDivs: []
        })
        this.componentDidMount()
    }

    getSuggestedRecipes() {
        var ingList = '';
        var recList = '';
        if (this.state.justIngred.length !== null && localStorage.getItem("recipeCartJSON") !== null) {
            ingList = this.state.justIngred.map(function (a) { return "'" + a + "'"; }).join(",");
            console.log(ingList);
            let recs = JSON.parse(localStorage.getItem("recipeCartJSON"));
            //console.log(recs[0]);
            recList = recs.map(function (a) { return "'" + a + "'"; }).join(",");
            console.log(recList);
        }
        this.props.history.push({
            pathname: `/suggestedRecipes/`,
            recipes: {recList},
            ingredients: {ingList},
        });
    }

    componentDidMount() {
        if (localStorage.getItem("recipeToIng") !== null) {
            var recipes = JSON.parse(localStorage.getItem("recipeToIng"));
            var i;
            for (i = 0; i < recipes.length; i++) {
                this.getIngredient(recipes[i]);
            }
        }
    }

    render() {
        return (
            <div className="results-container" id="results">
                <script crossOrigin="true" src="..."></script>
                <h3>Ingredient Cart</h3>
                <p></p>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ingredient</th>
                            <th>Delete Ingredient</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ingredList}
                    </tbody>
                </Table>
                <ButtonGroup>
                    <Button
                        variant="outline-primary"
                        onClick={this.deleteAll.bind(this)}>
                        Delete All
                </Button>
                    <Button
                        variant="outline-primary"
                        onClick={this.getSuggestedRecipes}>
                        Suggested Recipes
                </Button>
                </ButtonGroup>

            </div>
        );
    }
}

export default IngredientCart;