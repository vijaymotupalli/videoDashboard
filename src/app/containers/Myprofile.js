import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getMyProfile} from "../actions/index";
import  moment from 'moment'
//import EditUser from './editUser'

class Myprofile extends React.Component {
    constructor(props) {
        super(props);
        this.props.getMyProfile()
    }
    render() {
        return (
            <div className="container-fluid">
                <h3  className="title">My Details</h3>
                <div  className="row">
                    <div  className="col-md-12">
                        <div  className="cardWidget">
                            <div  className="cardBottom">
                                <div  className="row">
                                    <div  className="col-md-4">
                                        <p ><strong >Email</strong> <span >{this.props.myprofile.email}</span></p>
                                        <p ><strong >Name</strong> <span >{this.props.myprofile.name}</span></p>
                                    </div>
                                    <div  className="col-md-4 text-center">
                                        <p ><strong >Date of Joining</strong> <span >{moment(this.props.myprofile.createdAt).format('L')}</span></p>
                                        <p ><strong >Phone </strong> <span >{this.props.myprofile.phone} </span></p>
                                    </div>
                                    <div  className="col-md-4 text-right">
                                        <button  className="btn blackButton" data-toggle="modal" data-target="#myUserEditModal">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="well">
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#home" data-toggle="tab">Profile</a></li>
                        <li><a href="#profile" data-toggle="tab">Password</a></li>
                    </ul>
                    <div id="myTabContent" className="tab-content">
                        <div className="tab-pane active in" id="home">
                            <form id="tab">
                                <br/>
                                <label>Name</label>
                                <input type="text" value={this.props.myprofile.name} className="form-control" /><br/>
                                <label>Email</label>
                                <input type="text" value={this.props.myprofile.email} className="form-control" disabled="disabled"/><br/>
                                <label>Phone</label>
                                <input type="text" value={this.props.myprofile.phone} className="form-control" disabled="disabled"/><br/>
                                <label>Date of Joining</label>
                                <input type="text" value={moment(this.props.myprofile.createdAt).format('L')} className="form-control" disabled="disabled"/><br/>
                                <label>Address</label>
                                <textarea value="Smith" rows="3" className="form-control">2817 S 49th
    Apt 314
    San Jose, CA 95101
            </textarea><br/>

                                <div>
                                    <button className="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>
                        <div className="tab-pane fade" id="profile">
                            <form id="tab2">
                                <br/>
                                <label>New Password</label>
                                <input type="password" className="form-control" />
                                <br/>
                                <div>
                                    <button className="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>

            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        myprofile: state.Admin.myprofile
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMyProfile:()=> dispatch(getMyProfile())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Myprofile);