import React from "react";
import "../componentStyles/collegeGroup.css";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

export default class collegeGroup extends React.Component{

    constructor() {
        super();
        this.state = {

        }
      }

    render(){
        return(
        <div id = "collegeGroup-preview-background">
            <h6 id = "collegeGroup-preview-name">
                {this.props.name}
            </h6>
        </div>
        )
    }
}