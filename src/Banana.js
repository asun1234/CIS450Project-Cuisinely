import React from "react";
import './index.css';
class Banana extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bananas: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8081/bananas", {
      method: "GET",
    })
      .then(res => res.json())
      .then(bananasList => {
        if(!bananasList) return;
        var arr= bananasList.rows;
        var bananaDivs = arr.map((item, i) => {
        return (<div id = {i}>{i+1}: {item}</div>);
        });
        this.setState({
          bananas: bananaDivs
        })
      })
  }

  render() {
    return (
    <div className="results-container" id="results">
        <p>Top Banana Recipes:</p>
        {this.state.bananas}
    </div>
    );
  }
}
 
export default Banana;