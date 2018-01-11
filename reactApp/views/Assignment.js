/**
 * Created by siyuanxu on 1/11/18.
 */
import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";

export default class Assignment extends React.Component{
    constructor(){
        super();
        this.state = {
            name: "",
            description: ""
        }
    }
    componentWillMount(){
        console.log(this.props);
        console.log(this.props.match.params.name);
        var that = this;
        axios.get("http://localhost:3000/assignment", {
            params: {
                name: this.props.match.params.name
            }
        })
            .then(resp => {
                console.log(resp);
                that.setState({
                    name: resp.data[0].name,
                    description: resp.data[0].description
                });
            })
            .catch(err => {
                console.log("ERROR: Cannot retrieve assignment from componentWillMount() ", err);
            });
    }
    render(){
        console.log(this.props);
        return(
            <div>
                {this.state.name}<br/>{this.state.description}
            </div>
        );
    }
}