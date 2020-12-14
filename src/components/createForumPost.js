import React from "react"
import Axios from "axios";
import "../componentStyles/createForumPost.css";

export default class createForumPost extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          postText: "",
          postTitle: ""
      };
    }

    submitPost(){
        const collegeName = this.props.college.name
        console.log("it is ", this.props.firstName, " and ", this.props.lastName, " and ", this.props.email);
        Axios.post("/forum",    {
                college: collegeName,
                firstName:  this.props.firstName,
                lastName:   this.props.lastName,
                username:   this.props.username,
                postTitle:  this.state.postTitle, 
                postText:   this.state.postText,
                email:  this.props.email
        }).then((res) =>{
            console.log(res.data)
        }).catch((err) =>{
            console.log(err)
        })
        this.props.hide()
    }

    handleChange(e) {
        if (e.target.name === "post-title") {
          this.setState({ postTitle: e.target.value });
        }
        if (e.target.name === "post-text") {
          this.setState({ postText: e.target.value });
        }
      }

    render(){
        return(
            <div id = "create-post-wrap" onClick = {this.props.dismiss.bind(this)}>
            <div id = "create-post-container">
                <h3 id = "create-post-text">
                    Create a post
                </h3>
                <h2 id = "create-post-title-label">
                    Title
                </h2>
                <textarea id = "create-title" name = "post-title" onChange = {this.handleChange.bind(this)}></textarea>
                <h2 id = "create-post-text-label">
                    Text
                </h2>
                <textarea id = "create-text" name = "post-text" onChange = {this.handleChange.bind(this)}></textarea>
                <div id = "create-post-submit" onClick = {this.submitPost.bind(this)}>
                    Submit
                </div>
            </div>
            </div>
        )
        }
}
