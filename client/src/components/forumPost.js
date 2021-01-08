import React from "react";
import "../componentStyles/forumPost.css";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

export default class forumPost extends React.Component{
    constructor(){
        super();
        this.state = {
            postTimeStamp: "",
            userProfileImage: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v246-tent-33-business_2.jpg?bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&q=65&usm=15&vib=3&w=800&s=19ed9a41550e368fefefc653763e9497"
        }
    }

    componentDidMount(){
        this.configureTimeStamp()
        this.getName()
    }

    configureTimeStamp(){
        const year = this.props.post.createdAt[0] + this.props.post.createdAt[1] + this.props.post.createdAt[2] + this.props.post.createdAt[3]
        const month = this.props.post.createdAt[5] + this.props.post.createdAt[6]
        const day = this.props.post.createdAt[8] + this.props.post.createdAt[9]
        const time = this.props.post.createdAt[11] + this.props.post.createdAt[12] +this.props.post.createdAt[13] + 
        this.props.post.createdAt[14] + this.props.post.createdAt[15] + this.props.post.createdAt[16]
        + this.props.post.createdAt[17] + this.props.post.createdAt[18]

        const timeStamp = month+'/'+day+'/'+year+" at "+time
        this.setState({postTimeStamp: timeStamp})
    }

    getName(){
        if(typeof this.props.post.username != 'undefined'){
            if(this.props.post.username.length > 11){
                document.getElementById("forum-post-name").style.fontSize = "24px"
            }
            else{
                document.getElementById("forum-post-name").style.fontSize = "36px"
            }
        }
    }

    render(){

        return(
            <div>
                <div id = "post-container">
                    <div id = "forum-post-header">
                        <div id = "forum-post-name">
                            {this.props.post.username}
                        </div>
                        <img src = {this.state.userProfileImage} id = "forum-post-profile-pic"/>
                    </div>
                    <div id = "forum-post-title">
                        {this.props.post.postTitle} 
                     </div>
                    <div id = "forum-post-text">
                        {this.props.post.postText} 
                     </div>
                    <h5 id = "forum-post-timestamp">
                     {this.state.postTimeStamp} 
                    </h5>
                </div>

            </div>
        )
    }
}