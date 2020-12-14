import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {Table} from "react-bootstrap";


export function TopTenRecipes() {
    return <RecipePages
        title={"Top ten recipes"}
        url={"/topten"}
        columns={[{label: "Recipe"}]}
    />
}

export function HighProtein() {
    return <RecipePages
        title={"High protein"}
        url={"/highpro"}
        columns={[{label: "Recipe"}, {label: "Protein", format: formatNumberFn(2)}, {
            label: "Rating",
            format: formatNumberFn(2)
        }]}
    />
}


export function LowSugar() {
    return <RecipePages
        title={"Low Sugar"}
        url={"/lowsugar"}
        columns={[{label: "Recipe"}, {label: "Sugar"}, {label: "Rating", format: formatNumberFn(2)}]}
    />
}

export function LowCarb() {
    return <RecipePages
        title={"Low Carb"}
        url={"/lowcarb"}
        columns={[{label: "Recipe"}, {label: "Carbohydrates"}, {label: "Rating", format: formatNumberFn(2)}]}
    />
}

export function LowFat() {
    return <RecipePages
        title={"Low Fat"}
        url={"/lowfat"}
        columns={[{label: "Recipe"}, {label: "Total fat"}, {label: "Rating", format: formatNumberFn(2)}]}
    />
}

export function LowCal() {
    return <RecipePages
        title={"Low Cal"}
        url={"/lowcal"}
        columns={[{label: "Recipe"}, {label: "Calories", format: formatNumberFn(1)}, {
            label: "Rating",
            format: formatNumberFn(2)
        }]}
    />
}

export function TopHistory(props) {

    const inputCategory = props.history.location.pathname.toString().substring(9)

    return <RecipePages
        title={"Top Recipes for " + inputCategory.charAt(0).toUpperCase() + this.state.inputCategory.slice(1)}
        url={"/topHistory/" + inputCategory}
        columns={[{label: "Recipe"}, {label: "Rating", format: formatNumberFn(2)}]}
    />
}

function formatNumberFn(toFixed) {
    return (dbValue) => Number((dbValue).toFixed(toFixed));
}

/**
 * Props must be:
 *  - title: ReactNode placed at start
 *  - url: relative url for where to get recipes
 *  - columns: Column index corresponds to response[recipeIndex][i+1] in response.
 */
class RecipePages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableRecipes: [],
            cart: [],
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    updateCart(recipe, checked) {
        let newCart = this.state.cart;

        // Remove this recipe
        newCart = newCart.filter((r) => r[1] !== recipe[1])

        // Add if checked
        if (checked) {
            newCart.push(recipe)
        }

        this.setState({cart: newCart})
        localStorage.setItem("recipeCart", JSON.stringify(newCart));
    }

    componentDidMount() {
        const handleClick = (event) => {
            this.checked = event.target.checked;
        };

        const cart = localStorage.getItem("recipeCart");
        if (cart) {
            this.setState({cart: JSON.parse(cart)});
        }

        fetch("http://localhost:8081" + this.props.url, {
            method: "GET",
        })
            .then(res => res.json())
            .then(tenList => {
                if (!tenList) return;
                var arr = tenList.rows;
                var tenDivs = arr.map((recipe, i) => {
                    return (<tr>
                        <td>{i + 1}</td>
                        {this.props.columns.map((column, columnIndex) => <td>
                            {column.format ? column.format(recipe[columnIndex + 1]) : recipe[columnIndex + 1]}
                        </td>)}
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
                    topten: tenDivs
                })
            });
    }

    render() {
        return (
            <div className="results-container" id="results">
                <h3>{this.props.title}</h3>
                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        {this.props.columns.map(column => <td>{column.label}</td>)}
                        <th>
                            Add to Recipe Cart
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.topten}
                    </tbody>
                </Table>
            </div>
        );
    }
}