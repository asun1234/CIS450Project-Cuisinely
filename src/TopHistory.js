import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from 'react-bootstrap';
import './style/recipeRow.css'
import Checkbox from '@material-ui/core/Checkbox';

class TopHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topRecs: [],
            recipes: [],
            inputCategory: this.props.history.location.pathname.toString().substring(9)
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    updateCart(recipe, checked) {
        var recipesArr = this.state.recipes;
        const recipeId = recipe[1]
        recipesArr = recipesArr.filter((r) => r.id != recipeId)
        if (checked) {
            recipesArr.push({id: recipe[1], name: recipe[0]})
        }
        console.log('solen skinner')
        console.log("this.updateCart()", recipeId)

        this.setState({
            recipes: recipesArr
        })

            localStorage.setItem("recipeCart", JSON.stringify(this.state.recipes));
        }


    componentDidMount() {
        var inputSearch = this.state.inputCategory;
        const handleClick = (event) => {
            this.checked = event.target.checked;
        };

        const recipes = localStorage.getItem("recipeCart")
        if (recipes) {
            this.setState(
                {recipes: JSON.parse(recipes)})
        }

        fetch(`http://localhost:8081/topHistory/${inputSearch}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(searchResults => {
                if (!searchResults) return;
                var arr = searchResults.rows;
                console.log(arr);
                var searchDivs = arr.map((recipe, i) => {
                    return (<tr>
                        <td>{i + 1}</td>
                        <td>{recipe[0]}</td>
                        <td>{Number((recipe[1]).toFixed(2))}</td>
                        <td>
                            <Checkbox
                                key={i + 1}
                                color="primary"
                                checked={this.checked}
                                onClick={handleClick}
                                value={recipe[0]}
                                onChange={(event) => this.updateCart(recipe, event.target.checked)}
                            >
                            </Checkbox>
                        </td>
                    </tr>);
                });
                this.setState({
                    topRecs: searchDivs
                })
            })
    }
    render() {
        return (
            <div className="results-container" id="results">
                <h3>Top Recipes for {this.state.inputCategory.charAt(0).toUpperCase() + this.state.inputCategory.slice(1)}</h3>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipe</th>
                            <th>Rating</th>
                            <th>Add to Recipe Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.topRecs}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default TopHistory;
