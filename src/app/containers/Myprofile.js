// import React from "react";
// import {connect} from "react-redux";
// import './styles.css';
// import {getMyProfile,selectedUserData,selectedAdminData} from "../actions/index";
// import  moment from 'moment'
// import EditUser from './EditContentUploader'
//
// class Myprofile extends React.Component {
//     constructor(props) {
//         super(props);
//         this.props.getMyProfile()
//     }
//
//     render() {
//         return (
//             <div className="container-fluid">
//                 <h3  className="title">My Details</h3>
//                 <div  className="row">
//                     <div  className="col-md-12">
//                         <div  className="cardWidget">
//                             <div className="cardTop">
//                                 <div className="row">
//                                     <div className="col-md-12 text-center">
//                                         <figure>
//                                             <img src={this.props.myprofile.profilePic ?this.props.myprofile.profilePic: "https://codeuniverse.s3.ap-south-1.amazonaws.com/no_image_placeholder.png"}  />
//                                         </figure>
//                                         <figcaption>Profile Pic</figcaption>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div  className="cardBottom">
//                                 <div  className="row">
//                                     <div  className="col-md-6">
//                                         <p ><strong >Email</strong> <span >{this.props.myprofile.email}</span></p>
//                                         <p ><strong >Name</strong> <span >{this.props.myprofile.name}</span></p>
//                                         <p ><strong >Address</strong> <span >{this.props.myprofile.address}</span></p>
//                                     </div>
//                                     <div  className="col-md-4 text-center">
//                                         <p ><strong >Date of Joining</strong> <span >{moment(this.props.myprofile.createdAt).format('LL')}</span></p>
//                                         <p ><strong >Phone </strong> <span >{this.props.myprofile.phone} </span></p>
//                                     </div>
//                                     <div  className="col-md-2 text-right">
//                                         <button  onClick={()=>this.props.selectedAdminData(this.props.myprofile)} className="btn blackButton" data-toggle="modal" data-target="#myUserEditModal">Edit</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {this.props.myprofile && <EditUser selectedAdmin={this.props.myprofile}/> }
//             </div>
//
//         )
//     }
// }
//
//
// const mapStateToProps = (state) => {
//     return {
//         myprofile: state.Admin.myprofile
//     };
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getMyProfile:()=> dispatch(getMyProfile()),
//         selectedAdminData: (data) => dispatch(selectedAdminData(data)),
//     };
// }
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(Myprofile);











import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getMyProfile,selectedUserData,selectedAdminData,changePassword} from "../actions/index";
import  moment from 'moment'
import EditUser from './EditContentUploader'

class Myprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password:"",
            confirmPassword:""

        };
        this.props.getMyProfile()
        this.onChangePassword = this.onChangePassword.bind(this)

    }
    onChangePassword(e) {
        e.preventDefault();
        this.setState({error:""})
        const email = JSON.parse(localStorage.getItem('loginuser')) ? JSON.parse(localStorage.getItem('loginuser')).email :"";
        const {password,confirmPassword } = this.state;
        if(!password || !confirmPassword){
            this.setState({error:"Please Enter Password and Confirm Password"})
        }else if(password != confirmPassword){
            this.setState({error:"Password and Confirm Password Not Matched"})
        }else {
            this.props.changePassword({email:email,password:password}).then((result)=> {
                this.setState({password:"",confirmPassword:""})
                localStorage.clear();
                document.getElementById("close").click();
                this.props.history.push("/")
            },(err)=>{
                this.setState({error:err})
            })
        }

    }


    render() {
        return (
            <div className="container-fluid">
                <h3  className="title">My Details</h3>
                <div  className="row">
                    <div  className="col-md-12">
                        <div  className="cardWidget">
                            <div className="cardTop">
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <figure>
                                            <img src={this.props.myprofile.profilePic ?this.props.myprofile.profilePic: "https://codeuniverse.s3.ap-south-1.amazonaws.com/no_image_placeholder.png"}  />
                                        </figure>
                                        <figcaption>Profile Pic</figcaption>
                                    </div>
                                </div>
                            </div>
                            <div  className="cardBottom">
                                <div  className="row">
                                    <div  className="col-md-6">
                                        <p ><strong >Email</strong> <span >{this.props.myprofile.email}</span></p>
                                        <p ><strong >Name</strong> <span >{this.props.myprofile.name}</span></p>
                                        <p ><strong >Address</strong> <span >{this.props.myprofile.address}</span></p>
                                    </div>
                                    <div  className="col-md-6 ">
                                        <p ><strong >Date of Joining</strong> <span >{moment(this.props.myprofile.createdAt).format('LL')}</span></p>
                                        <p ><strong >Phone </strong> <span >{this.props.myprofile.phone} </span></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div  className="col-md-6 text-center"  style={{marginBottom:"15px"}}>
                                        <button  onClick={()=>this.props.selectedAdminData(this.props.myprofile)} className="btn blackButton" data-toggle="modal" data-target="#myUserEditModal">Edit</button>
                                    </div>
                                    <div  className="col-md-6 text-center">

                                        <button  className="btn blackButton" data-toggle="modal" data-target="#changePasswordModel">Change Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="modal fade" id="changePasswordModel" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button"  id="close" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Change Password</h4>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Password</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Enter Password" name="name"
                                                           onChange={e => this.setState({password: e.target.value})}  value={this.state.password} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Confirm Password</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Confirm Password" name="name"
                                                           onChange={e => this.setState({confirmPassword: e.target.value})}    value={this.state.confirmPassword} />
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                    <div className="text-center">
                                        <label className="errorcolor">
                                            { this.state.error && <div>{this.state.error}</div>  }
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
                                            <button type="button" className="btn blackButton" onClick={this.onChangePassword}  style={{width:"100%"}}>SUBMIT</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.myprofile && <EditUser selectedAdmin={this.props.myprofile}/> }
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
        selectedAdminData: (data) => dispatch(selectedAdminData(data)),
        changePassword: (data) => dispatch(changePassword(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Myprofile);