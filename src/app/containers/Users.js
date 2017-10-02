import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getUsers,selectedUserData,deleteAdmin} from "../actions/index";
import Newadd from './newaddUser'
import {Route, Link, Switch} from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getUsers();
    }
    selectedUser(user){
        const {context,history} = this.props
        this.props.selectedUserData(user);
        history.push(this.props.match.url+"/"+user.email)
    }
    render() {
        var users = this.props.users
        var listUsers = users.map(function (user) {
            return (
                <tr key={user._id} onClick={()=>this.selectedUser(user)}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.school ? "School" : "User"}</td>
                    <td>{user.createdAt}</td>
                    <td>
                        <button  className="btn blackButton" onClick={(e)=>{e.stopPropagation();this.props.deleteAdmin(user._id)}}>Remove</button>
                    </td>
                </tr>
            );
        }, this);
        return (
            <div>
                <div>
                    <Newadd/>
                    <div className="row" id="title">
                        <div className="col-sm-10" id="userslist">Users List</div>
                        <div className="col-sm-2" >
                            <button type="button" className="btn btn-info btn-sm" data-toggle="modal"
                                    data-target="#myUserAddModal">
                                <span className="glyphicon glyphicon-plus"/> Add User
                            </button>
                        </div>
                    </div>
                    <div className="gridTable">
                        <table className="table table-striped table-bordered" cellSpacing="0" width="100%">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Type</th>
                                <th>Added At</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listUsers }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.User.users,
        selectedUser: state.User.selectedUser
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
        selectedUserData: (data) => dispatch(selectedUserData(data)),
        deleteAdmin: (adminId) => dispatch(deleteAdmin(adminId)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(User);