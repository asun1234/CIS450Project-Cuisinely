import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, ButtonGroup } from 'react-bootstrap';

class IngredientCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredientList: [],
            justIngred: []
        };
        this.getSuggestedRecipes = this.getSuggestedRecipes.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    getSuggestedRecipes() {
        var ingList = '';
        var recList = '';
        if (this.state.justIngred.length !== null && localStorage.getItem("recipeCart") !== null) {
            ingList = this.state.justIngred.map(function (a) { return "'" + a + "'"; }).join(",");
            console.log(ingList);

            let recs = JSON.parse(localStorage.getItem("recipeCart"));
            //console.log(recs[0]);
            recList = recs.map(function (a) { return "'" + a + "'"; }).join(",");
            console.log(recList);
        }
        this.props.history.push({
            pathname: `/suggestedRecipes/`,
            recipes: { recList },
            ingredients: { ingList },
        });
    }

    deleteAll() {
        localStorage.removeItem("recipeCart");
        this.setState({
            ingredientList: []
        })
        this.componentDidMount()
    }

    componentDidMount() {
        const recipeIds = getCartRecipeIds().join(', ');

        fetch(`http://localhost:8081/ingredientCart?recipeIds=${recipeIds}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(searchResults => {
                var arr = searchResults.rows;
                var ing = [];
                var resultDivs = arr.map((ingredient, i) => {
                    ing.concat(ingredient[0]);
                    return (<tr>
                        <td>{i + 1}</td>
                        <td>{ingredient[0]}</td>
                    </tr>);
                });
                this.setState({
                    ingredientList: resultDivs,
                    justIngred: ing
                })
                console.log(this.state.justIngred);
            });
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ingredientList}
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

export function getCartRecipeIds() {
    const json = localStorage.getItem("recipeCart")
    if (!json) {
        return [];
    }
    const recipes = JSON.parse(json)
    return recipes.map((recipe) => recipe[0])
}

