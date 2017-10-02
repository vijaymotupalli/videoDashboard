import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getMyProfile,selectedUserData} from "../actions/index";
import  moment from 'moment'
import EditUser from './editUser'

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
                                    <div  className="col-md-6">
                                        <p ><strong >Email</strong> <span >{this.props.myprofile.email}</span></p>
                                        <p ><strong >Name</strong> <span >{this.props.myprofile.name}</span></p>
                                        <p ><strong >Address</strong> <span >{this.props.myprofile.address}</span></p>
                                    </div>
                                    <div  className="col-md-4 text-center">
                                        <p ><strong >Date of Joining</strong> <span >{moment(this.props.myprofile.createdAt).format('LL')}</span></p>
                                        <p ><strong >Phone </strong> <span >{this.props.myprofile.phone} </span></p>
                                    </div>
                                    <div  className="col-md-2 text-right">
                                        <button  onClick={()=>this.props.selectedUserData(this.props.myprofile)} className="btn blackButton" data-toggle="modal" data-target="#myUserEditModal">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <EditUser />
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
        getMyProfile:()=> dispatch(getMyProfile()),
        selectedUserData: (data) => dispatch(selectedUserData(data)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Myprofile);