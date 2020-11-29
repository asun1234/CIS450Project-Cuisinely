import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class ConnectDB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topten: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8081/topten", {
      method: "GET",
    })
      .then(res => res.json())
      .then(tenList => {
        if(!tenList) return;
        var arr= tenList.rows;
        var tenDivs = arr.map((item, i) => {
          console.log(<div id = {i}>{item}</div>);
          return (<div id = {i}>{item}</div>);
        });
        this.setState({
          topten: tenDivs
        })
      })
  }

  render() {
    return (
    <div className="results-container" id="results">
      <p>Top Ten Recipes:</p>
        {this.state.topten}
    </div>
    );
  }
}

export default ConnectDB;
