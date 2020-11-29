import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class ConnectDB extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      people: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8081/people", {
      method: "GET",
    })
      .then(res => res.json())
      .then(peopleList => {
        console.log(peopleList)

        let peopleDivs = peopleList.map((person, i) => (
          <div key={i} className="person">
            <div className="title">{person.recipeTitle}</div>
          </div>
        ));

        this.setState({
          people: peopleDivs,
        });
      })
      .catch(err => console.log("THERE'S A PROBLEM\n" + err)); // Print the error if there is one.
  }

  render() {
    return (
    <div className="results-container" id="results">
        {this.state.people}
    </div>
    );
  }
}
