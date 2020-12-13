import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from 'react-bootstrap';
import Checkbox from '@material-ui/core/Checkbox';
import './style/Dashboard.css';

class IngredientCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredList: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        var recipes = JSON.parse(localStorage.getItem("recipeToIng"));
        var i;
        for (i = 0; i < recipes.length; i++) {
            this.getIngredient(recipes[i]);
        }
    }

    getIngredient(recipeTitle){
        fetch(`http://localhost:8081/ingredientCart/${recipeTitle}`, {
            method: "GET",
        })
            .then(res => res.json())
            // eslint-disable-next-line no-loop-func
            .then(searchResults => {
                if (!searchResults) return;
                var arr = searchResults.rows;
                var searchDivs = arr.map((recipe, i) => {
                    return (
                        <tr>
                            <td>{i+1}</td>
                            <td>{recipe}</td>
                        </tr>
                    );
                });

                if (this.state.ingredList.length > 0) {
                    var oldDivs = this.state.ingredList;
                    oldDivs = oldDivs.concat(searchDivs);
                    searchDivs = oldDivs.filter((x, i, a) => a.indexOf(x) === i)
                }
                this.setState({
                    ingredList: searchDivs
                })
            })
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
                        {this.state.ingredList}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default IngredientCart;