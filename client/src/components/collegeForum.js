import React from "react";
import ForumPost from "./forumPost.js"
import "../componentStyles/collegeForum.css";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { render } from "@testing-library/react";
import CreateForumPost from "./createForumPost.js"

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
            collegeName: "",
            collegeCountry: "",
            collegeWebPages: "",
            posts: []
        }
    }

    componentDidMount(){
      if(typeof this.props.location.state == 'undefined'){ //user not logged in 
        console.log("You are not logged in")
        this.props.history.push({
          pathname: '/',
          state: {}
          });
      }
      else{
      this.setState({collegeCountry: this.props.location.state.college.country})
      this.setState({collegeWebPages: this.props.location.state.college.web_pages})
      this.setState({collegeName: this.props.location.state.college.name})
      this.getPostData()
    }
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
      const url = "/forum/"+this.props.location.state.college.name
        Axios.get(url
        )
          .then((res) => {
            const postData = res.data;
            console.log("post data retrieved");
            this.setState({posts: postData.reverse()})
            this.forceUpdate()
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
        this.getPostData()
      }

    render(){
        console.log("rendering...")
          var i = -1;
          var renderPosts = this.state.posts.map(function(post){
          console.log("POST IS ", post)
          i = i + 1
          return(<ForumPost key = {i} post = {post}/>)
        })
        if(this.state.posts.length == 0){
          const post = {
            username: "Empty!",
            postTitle: "Be the first one to make a post using the Add button!",
            createdAt: "                    "
        }
          renderPosts = <ForumPost post = {post}/>
        }
        return(
            <div id = "forum-container">
                <div id = "forum-header">
                     <h3 id = "forum-college-country">
                      {this.state.collegeCountry}  
                    </h3>
                    <h1 id = "forum-college-name">
                        {this.state.collegeName}
                    </h1>
                    <h3 id = "forum-college-webpages">
                      {this.state.collegeWebPages}  
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

