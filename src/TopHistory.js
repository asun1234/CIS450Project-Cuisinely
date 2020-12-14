import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from 'react-bootstrap';
import './style/recipeRow.css'
class TopHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topRecs: [],
            justRecs: [],
            inputCategory: this.props.history.location.pathname.toString().substring(9)
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        var inputSearch = this.state.inputCategory;
        console.log(inputSearch);
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
