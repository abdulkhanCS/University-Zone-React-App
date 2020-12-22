import React from "react";
import "../componentStyles/forumPost.css";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

export default class forumPost extends React.Component{
    constructor(){
        super();
        this.state = {
            userProfileImage: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v246-tent-33-business_2.jpg?bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&q=65&usm=15&vib=3&w=800&s=19ed9a41550e368fefefc653763e9497"
        }
    }

    render(){
        return(
            <div>
                <div id = "post-container">
                    <div id = "forum-post-name">
                        {this.props.post.firstName}
                    </div>
                    <div id = "forum-post-title">
                        {this.props.post.postTitle} 
                     </div>
                    <div id = "forum-post-text">
                        {this.props.post.postText} 
                     </div>
                    <img src = {this.state.userProfileImage} id = "forum-post-profile-pic"/>
                </div>

            </div>
        )
    }
}