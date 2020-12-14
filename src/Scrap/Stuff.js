import React from "react";
import '../style/index.css';
class Stuff extends React.Component {
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
      .then(peopleList => {
        if(!peopleList) return;
        var arr= peopleList.rows;
        const peopleDivs = arr.map((item, i) => {
          console.log(<div id = {i}>{item}</div>);
          return (<div id = {i}>{item}</div>);
        });
        this.setState({
          people: peopleDivs
        })
      })
  }

  render() {
    return (
      <div>
        <h2>STUFF</h2>
        <p>Random stuff in here:</p>
      </div>
    );
  }
}
 
export default Stuff;