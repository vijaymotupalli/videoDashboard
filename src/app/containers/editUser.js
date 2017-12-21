import React from "react";
import {editUser,setUserError,uploadVideo} from "../actions/index";
import {connect} from "react-redux";
import './styles.css';


class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id:props.selectedUser._id,
            email: props.selectedUser.email,
            name: props.selectedUser.name,
            username: props.selectedUser.userName,
            phone: props.selectedUser.phone,
            error: "",
            image:props.selectedUser.profilePic ? props.selectedUser.profilePic:"",
            file:"",
            imagePreviewUrl:props.selectedUser.profilePic ? props.selectedUser.profilePic:"",

        };
        this.onSubmit = this.onSubmit.bind(this)
        this._handleImageChange = this._handleImageChange.bind(this)
        this.clearImage = this.clearImage.bind(this)
    }
    componentWillReceiveProps(nextProps){
        this.setState ({
            _id: nextProps.selectedUser._id,
            email: nextProps.selectedUser.email,
            name: nextProps.selectedUser.name,
            username: nextProps.selectedUser.userName,
            phone: nextProps.selectedUser.phone,
            image:nextProps.selectedUser.profilePic ? nextProps.selectedUser.profilePic:"",
            imagePreviewUrl:nextProps.selectedUser.profilePic ? nextProps.selectedUser.profilePic:""

        });
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({error:""})
        this.props.setUserError("");
        const {email, name, phone ,address,_id,file } = this.state;
        if(!((/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email))){ this.setState({
            error: "Email Not Valid"
        })}else if(!file){
            this.props.editUser(_id,{name: name,address:address,email:email}).then((result,err)=> {
                document.getElementById("close").click()
            })
        }else{
            this.props.uploadVideo(file).then((result, err)=> {
                var logoUrl = JSON.parse(result)
                this.setState({image: logoUrl[0],imagePreviewUrl:logoUrl[0]})
                this.props.editUser(_id,{name: name,address:address,email:email,profilePic:this.state.image}).then((result,err)=> {
                    document.getElementById("close").click()
                })
            })
        }


    }
    clearImage(){
        this.setState({imagePreviewUrl:""})
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
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
                                                    <label className="colorGray">Profile Pic</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <div >
                                                        {imagePreviewUrl &&<div className="glyphicon corner "  style={{width:"50%"}} onClick={this.clearImage}>&#xe088;</div>}
                                                        {imagePreviewUrl&&<figure className="browseImg">
                                                            <img src={this.state.imagePreviewUrl} style={{width:"50%",marginTop:"10px"}} />
                                                        </figure> }
                                                    </div>
                                                    {!imagePreviewUrl && <div className="upload-btn-wrapper">
                                                        <button className="btn">Select Image</button>
                                                        <input type="file" name="myfile" onChange={(e)=>this._handleImageChange(e)}/>
                                                    </div> }
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
                                                           onChange={e => this.setState({name: e.target.value})} value={this.state.name ? this.state.name :""} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">User Name</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control"  name="username"
                                                         disabled  value={this.state.username ? this.state.username :""} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Email</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="email"  className="form-control" placeholder="Type Email ID" name="email"
                                                           value={this.state.email ? this.state.email :""} onChange={e => this.setState({email: e.target.value})} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Phone</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control" value={this.state.phone ? this.state.phone :""}
                                                            disabled/>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="text-center">
                                        <label className="errorcolor">
                                            { this.state.error && <div>{this.state.error}</div>  }
                                            { this.props.userError && <div>{ this.props.userError}</div>}
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
        userError: state.User.error,
        selectedUser: state.User.selectedUser,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadVideo: (file) => dispatch(uploadVideo(file)),
        editUser: (userId,user) => dispatch(editUser(userId,user)),
        setUserError: (error) => dispatch(setUserError(error)),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
