import React from "react";
import CollegeGroup from "../components/collegeGroup.js"
import CollegeSearch from "../components/collegeSearch.js";
import "../componentStyles/homepage.css";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

export default class home extends React.Component {
  constructor(props) {
    super();

    this.state = {
      showSearch: false,
      userId: "",
      userFirstName: "",
      userLastName: "",
      userAdmin: false,
      userEmail: "",
      userCollegeGroups: [],
      username: ""
    };
    this.pushToForum.bind(this)
  }

  componentDidMount(){
    const getData = this.getUserData.bind(this)
    getData()
  }

  showSearchComponent() {
    this.setState({ showSearch: true });
  }

  collapseSearch(e) {
    console.log(e.target.id);
    if (this.state.showSearch && e.target.id == "search-wrap") { //User clicked on surrounding of search to collapse
      this.setState({ showSearch: false });
    }
  }

  collapseSearchAndAdd(chosenCollege) {
    this.setState(prevState => ({
      userCollegeGroups: [...prevState.userCollegeGroups, chosenCollege]
    }))
     this.setState({ showSearch: false,  });
  }

  getUserData() {
    console.log("getting ");
    Axios.get("/homepage", {
      params: {
        username: this.props.location.state.thisUsername,
      },
    })
      .then((res) => {
        const userData = res.data;
        this.setState((prevState) => ({
          userId : userData._id,
          userFirstName: userData.firstName,
          userLastName: userData.lastName,
          userEmail: userData.email,
          userAdmin: userData.admin,
          userCollegeGroups: userData.collegeGroups,
        }));
        console.log("user data retrieved");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  async pushToForum(e){
    const collegeName = e.target.textContent
    fetch("http://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json")
      .then((res) => {
        return res.json();
      })
      .then((collegeInfo) => {
        var foundCollege;
        collegeInfo.map(function(college){
          if(college.name == collegeName){
            foundCollege = college;
          }
        })
        return foundCollege
      })
      .then((foundCollege) =>{
        console.log("THIS IS FOUND COLLEGE ", foundCollege)
        this.props.history.push({
          pathname: '/forum',
          state: { thisUserID: this.state.userId, college: foundCollege, username: this.props.location.state.thisUsername, userFirstName: this.state.userFirstName, userLastName: this.state.userLastName, userEmail: this.state.userEmail }
          }); 
      })    
  }

  render() {
    const savedColleges = this.state.userCollegeGroups.map(function(college){
      return( 
           <CollegeGroup key = {college.name} name={college.name}/>
             )
    });
    return (
      <div>
        {this.state.showSearch ? (
          <CollegeSearch dismiss={this.collapseSearch.bind(this)} dismissOnSubmit={this.collapseSearchAndAdd.bind(this)} thisUserId = {this.state.userId}/>
        ) : null}
        <div id="homepage-div">
          <div id="college-groups" onClick = {this.pushToForum.bind(this)}>
              {savedColleges}
            {/* <img
              className="no-colleges"
              id="no-colleges-image"
              src="https://i.imgur.com/ozNNNIK.png"
            />
            <h4 className="no-colleges" id="no-colleges-text">
              You have no groups! Click the add button to add groups
            </h4> */}         
          </div>
          <button
            id="add-college-group"
            onClick={this.showSearchComponent.bind(this)}
          >
            Add
          </button>
          <div id="profile-section">
            <img
              id="profile-picture"
              src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v246-tent-33-business_2.jpg?bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&q=65&usm=15&vib=3&w=800&s=19ed9a41550e368fefefc653763e9497"
            />
            <h2 id="profile-name">{this.state.userFirstName}'s homepage</h2>
          </div>
          <div id="homepage-menu"></div>
        </div>
      </div>
    );
  }
}
