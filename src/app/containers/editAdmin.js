import React from "react";
import {editAdmin,setAdminError} from "../actions/index";
import {connect} from "react-redux";
import './styles.css';


class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.selectedAdmin.email,
            name: props.selectedAdmin.name,
            phone: props.selectedAdmin.phone,
            error: "",
            address:props.selectedAdmin.address,
        };
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillReceiveProps(nextProps){
        this.setState ({
            email: nextProps.selectedAdmin.email,
            name: nextProps.selectedAdmin.name,
            phone: nextProps.selectedAdmin.phone,
            address:nextProps.selectedAdmin.address,
        });
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({error:""})
        this.props.setAdminError("");
        const {email, name, phone ,address } = this.state;
        if(!((/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email))){ this.setState({
            error: "Email Not Valid"
        })}else {
            this.props.editAdmin(email,{name: name, phone: phone,address:address}).then((result,err)=> {
                document.getElementById("close").click()
            })
        }
    }
    render() {
        return (
            <div>
                <div className="container" >
                    <div className="modal fade" id="myUserEditModal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button"  id="close" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Edit User</h4>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Email</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="email"  className="form-control" placeholder="Type Email ID" name="email"
                                                           value={this.state.email} disabled/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Name</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Type Name" name="name"
                                                           onChange={e => this.setState({name: e.target.value})} value={this.state.name} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Phone</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control" value={this.state.phone}
                                                           onChange={(e)=>this.setState({phone: e.target.value})} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Address</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control" value={this.state.address}
                                                           onChange={(e)=>this.setState({address: e.target.value})} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="text-center">
                                        <label className="errorcolor">
                                            { this.state.error && <div>{this.state.error}</div>  }
                                            { this.props.adminError && <div>{ this.props.adminError}</div>}
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton" data-dismiss="modal"
                                                    style={{width:"100%",background:"#fff",color:"#333"}}>CANCEL</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton"  onClick={this.onSubmit} style={{width:"100%"}}>SUBMIT</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
;

const mapStateToProps = (state) => {
    return {
        adminError: state.User.error,
        selectedAdmin: state.User.selectedAdmin,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        editAdmin: (userId,admin) => dispatch(editAdmin(userId,admin)),
        setAdminError: (error) => dispatch(setAdminError(error)),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
