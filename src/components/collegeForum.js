import React from "react";
import ForumPost from "../components/forumPost.js"
import "../componentStyles/collegeForum.css";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { render } from "@testing-library/react";
import CreateForumPost from "../components/createForumPost.js"

export default class collegeForum extends React.Component{

    constructor(){
        super()
        this.state = {
            thisUserID: "",
            college: "", 
            username: "",
            userId: "",
            userFirstName: "",
            userLastName: "",
            userEmail: "",
            userAdmin: false,
            userCollegeGroups: [],
            showCreatePost: false,
            posts: []
        }
    }

    componentDidMount(){
        this.getPostData()
        console.log("LOADED")
    }

    collapseCreatePost(e) {
      if (this.state.showCreatePost && e.target.id == "create-post-wrap") { //User clicked on surrounding of search to collapse
        this.setState({ showCreatePost: false });
      }
      console.log("STATE IS ", this.state.showCreatePost)
    }
  
    collapseCreatePostAndSubmit(chosenCollege) {
      this.setState(prevState => ({
        userCollegeGroups: [...prevState.userCollegeGroups, chosenCollege]
      }))
       this.setState({ showCreatePost: false,  });
    }

    getPostData() {
      console.log("COLLEGE RIGHT HERE IS ", this.props.location.state.college.name)
        Axios.get("/forum", 
        {college : this.props.location.state.college.name})
          .then((res) => {
            const postData = res.data;
            this.setState({posts: postData})
            console.log("post data retrieved");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      showCreatePost(){
        this.setState({showCreatePost: true})
      }

      hideCreatePost(){
        this.setState({showCreatePost: false})
      }

    render(){
         var i = -1;
        const renderPosts = this.state.posts.map(function(post){
          console.log("POST IS ", post)
          i = i + 1
          return(<ForumPost key = {i} post = {post}/>)
        })
        return(
            <div id = "forum-container">
                <div id = "forum-header">
                     <h3 id = "forum-college-country">
                      {this.props.location.state.college.country}  
                    </h3>
                    <h1 id = "forum-college-name">
                        {this.props.location.state.college.name}
                    </h1>
                    <h3 id = "forum-college-webpages">
                      {this.props.location.state.college.web_pages}  
                    </h3>
                    <div id = "add-post-to-forum" onClick = {this.showCreatePost.bind(this)}>
                    <h6>
                    Add
                    </h6>
                    </div>
                </div>
                
                <div id = "forum-feed">
                    {renderPosts}
                </div>
                {this.state.showCreatePost ? (
          <div>        
          <CreateForumPost dismiss = {this.collapseCreatePost.bind(this)} college = {this.props.location.state.college} 
          username = {this.props.location.state.username} firstName = {this.props.location.state.userFirstName} lastName = {this.props.location.state.userLastName}
          email = {this.props.location.state.userEmail} hide = {this.hideCreatePost.bind(this)}/>
          </div>
        ) : null}
            </div>
        )
    }
   
}

