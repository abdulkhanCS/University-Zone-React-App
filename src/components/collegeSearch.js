import React from "react";
import Axios from "axios";
import "../componentStyles/collegeSearch.css";

const collegeAPIurl =
  "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";
export default class home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collegeData: [],
      query: "",
      results: [],
      selectedCollege: "",
    };
  }

  handleOnInputChange = (e) => {
    const query = e.target.value;
    this.setState({ query: query });
    this.showSearchResults(query);
  };

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const collegeA = a.name.toUpperCase();
    const collegeB = b.name.toUpperCase();
    let comparison = 0;
    if (collegeA > collegeB) {
      comparison = 1;
    } else if (collegeA < collegeB) {
      comparison = -1;
    }
    return comparison;
  }

  showSearchResults(query) {
    this.setState({ results: [] });
    var foundCounter = 0;
    var resultsArray = [];
    for (var i = 0; i < this.state.collegeData.length; i++) {
      if (foundCounter == 10) {
        i = this.state.collegeData.length;
        const results = document.getElementsByClassName("searchResults");
        for (var k = 0; k < results.length; k++) {
          results[k].setAttribute("style", "display: block");
          results[k].innerHTML = resultsArray[k].name;
        }
      } else if (
        this.state.collegeData[i].name
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
        foundCounter = foundCounter + 1;
        resultsArray.push(this.state.collegeData[i]);
      } else if (i === this.state.collegeData.length - 1) {
        const results = document.getElementsByClassName("searchResults");
        for (var j = 0; j < results.length; j++) {
          if (j > foundCounter - 1) {
            results[j].setAttribute("style", "display: none");
          } else {
            results[j].setAttribute("style", "display: block");
            results[j].innerHTML = resultsArray[j].name;
          }
        }
      }
    }
    console.log(resultsArray);
  }

  choseSearchResult(e) {
    const searchBar = document.getElementById("search-input");
    this.setState({ selectedCollege: e.target.innerHTML });
    searchBar.value = e.target.innerHTML;
    const results = document.getElementsByClassName("searchResults");
    for (var j = 0; j < results.length; j++) {
      results[j].setAttribute("style", "display: none");
    }
  }

  submitCollege() {
    var chosenCollege = null
    var validCollege = false;
    const searchBar = document.getElementById("search-input");
    const goButton = document.getElementById("go-button");
    goButton.setAttribute("style", "color: #49d5d1")
    setTimeout(() => {
      goButton.setAttribute("style", "color: whitesmoke")
    }, 2500);
    if(searchBar.value == ""){
      console.log("Nothing was entered")
      return
    }
    for (var i = 0; i < this.state.collegeData.length; i++) {
      if (this.state.collegeData[i].name.toLowerCase() == searchBar.value.toLowerCase()) {
        chosenCollege = this.state.collegeData[i]
        validCollege = true;
      }
    }
    if(!validCollege){
      const error = document.getElementById("go-error")
      error.setAttribute("style", "display: block")
      setTimeout(() => {
        error.setAttribute("style", "display: none")
      }, 2500);
      console.log("Invalid college")
    }
    else if(validCollege){
     this.updateColleges(chosenCollege)
      this.props.dismissOnSubmit(chosenCollege)
      console.log("Valid college")
    }
  }

  updateColleges(chosenCollege){ 
    Axios.post("/homepage", {
      body : {
        college: chosenCollege,
        _id: this.props.thisUserId
      }, 
      params :{
        _id: this.props.thisUserId
      }
    }).then((res) => {
      console.log(res)
      console.log(res.data)
    })
    .catch((err) => console.log("error ", err))
  }

  render() {
    this.state.collegeData.sort(this.compare);
    return (
    <div id = "search-wrap" onClick = {this.props.dismiss.bind(this)}> 
      <div className="container">
        <h2 className="heading">Search for a College</h2>
        <label id = "go-error">
          Please select a valid college
        </label>
        <input
          type="text"
          id="search-input"
          placeholder="Search..."
          autoComplete = "none"
          onChange={this.handleOnInputChange.bind(this)}
        ></input>
        <button id="go-button" onClick={this.submitCollege.bind(this)}>
          Go
        </button>
        <button
          className="searchResults"
          id="first"
          onClick={this.choseSearchResult.bind(this)}
        >
          first
        </button>
        <button
          className="searchResults"
          id="second"
          onClick={this.choseSearchResult.bind(this)}
        >
          second
        </button>
        <button
          className="searchResults"
          id="third"
          onClick={this.choseSearchResult.bind(this)}
        >
          third
        </button>
        <button
          className="searchResults"
          id="fourth"
          onClick={this.choseSearchResult.bind(this)}
        >
          fourth
        </button>
        <button
          className="searchResults"
          id="fifth"
          onClick={this.choseSearchResult.bind(this)}
        >
          fifth
        </button>
        <button
          className="searchResults"
          id="sixth"
          onClick={this.choseSearchResult.bind(this)}
        >
          sixth
        </button>
        <button
          className="searchResults"
          id="seventh"
          onClick={this.choseSearchResult.bind(this)}
        >
          seventh
        </button>
        <button
          className="searchResults"
          id="eighth"
          onClick={this.choseSearchResult.bind(this)}
        >
          eighth
        </button>
        <button
          className="searchResults"
          id="ninth"
          onClick={this.choseSearchResult.bind(this)}
        >
          ninth
        </button>
        <button
          className="searchResults"
          id="tenth"
          onClick={this.choseSearchResult}
        >
          tenth
        </button>
      </div>
      </div> 
    );
  }

  componentDidMount() {
    fetch(collegeAPIurl)
      .then((res) => {
        return res.json();
      })
      .then((collegeInfo) => {
        const filteredData = collegeInfo.filter(
          (college) => college.country === "United States"
        );
        this.setState({ collegeData: collegeInfo }, () => {});
      });
  }
}
