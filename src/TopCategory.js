import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class TopCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        topcat: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8081/topcat", {
      method: "GET",
    })
      .then(res => res.json())
      .then(tenList => {
        if(!tenList) return;
        var arr= tenList.rows;
        var tenDivs = arr.map((item, i) => {
          return (<div id = {i}>{i+1}: {item}</div>);
        });
        this.setState({
            topcat: tenDivs
        })
      })
  }

  render() {
    return (
    <div className="results-container" id="results">
      <p>Top Ten Categories:</p>
        {this.state.topcat}
    </div>
    );
  }
}

export default TopCategory;
