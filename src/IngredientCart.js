import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from 'react-bootstrap';

class IngredientCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredList: [],
            justIngred: [], 
            midDivs:[]
        };
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
                console.log(searchIng);
                if (this.state.justIngred.length > 0) {
                    var oldDivs = this.state.justIngred;
                    oldDivs = [...new Set(oldDivs)];
                    searchIng = oldDivs.concat(searchIng);
                    searchIng = [...new Set(searchIng)];
                }
                searchIng = searchIng.sort();
                var i;
                var divs = [];
                const finalSet = new Set();
                var index = 0;
                for (i = 0; i < searchIng.length; i++) {
                    const currIng = searchIng[i][0];
                    if(!finalSet.has(currIng)){
                        divs[index] = (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{currIng}</td>
                            </tr>);
                        index++;
                        finalSet.add(currIng);
                    }
                }
                //console.log(divs);
                this.setState({
                    justIngred: searchIng,
                    ingredList: divs
                })
            })
    }


    componentDidMount() {
        var recipes = JSON.parse(localStorage.getItem("recipeToIng"));
        var i;
        for (i = 0; i < recipes.length; i++) {
            this.getIngredient(recipes[i]);
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