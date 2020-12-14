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

    componentDidMount() {
        var inputSearch = this.state.inputCategory;
        const handleClick = (event) => {
            this.checked = event.target.checked;
        };

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
                                onChange={this.onChangeRec.bind(this)}
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
