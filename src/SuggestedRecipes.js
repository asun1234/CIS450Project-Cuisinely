import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from 'react-bootstrap';

class SuggestedRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeDivs: [], 
            recipeString: this.props.location.recipes.recList,
            ingredientString: this.props.location.ingredients.ingList
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        let recList = this.state.recipeString;
        let ingList = this.state.ingredientString;
          fetch(`http://localhost:8081/suggestedRecipes/${recList}/${ingList}`, {
               method: "GET",
           }).then(res => res.json())
               .then(searchResults => {
                   if (!searchResults) return;
                   var arr = searchResults.rows;
                   var searchDivs = arr.map((recipe, i) => {
                       return (<tr>
                           <td>{i + 1}</td>
                           <td>{recipe}</td>
                       </tr>);
                   });
                   this.setState({
                    recipeDivs: searchDivs
                   })
               })
    }
    
    render() {
        return (
            <div className="results-container" id="results">
                <h3>Suggested Recipes</h3>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.recipeDivs}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default SuggestedRecipes;