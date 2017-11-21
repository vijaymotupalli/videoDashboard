import React from "react";
import {requestCodeToResetPassword,verifyCode,changePassword,setForgotPasswordError} from "../actions/index";
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';

import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword:"",
            code:"",
            showForgotPassword:true,
            showLogin:true,
            showChangePassword:false,
            showChangePasswordSuccess:false,
            showEnterCode:false,
            loader:false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.onForgotPasswordSubmit = this.onForgotPasswordSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.onCodeSubmit = this.onCodeSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;
        this.props.login(email, password).then((result)=>{
            this.props.history.push("/dashboard/videos")
        });
        this.setState({
            email: '',
            password: ''
        });
    }
    onForgotPasswordSubmit(e) {
        e.preventDefault();
        this.props.setForgotPasswordError("")
        const {email} = this.state;
        if(!email)this.props.setForgotPasswordError("Please Enter Email")
        else{
            this.setState({loader:true})
            this.props.requestCodeToResetPassword({email:email}).then((result)=> {
                this.setState({loader:false})
                this.setState({showForgotPassword:false,showEnterCode:true})
            },(error)=>{
                this.setState({loader:false})
                this.props.setForgotPasswordError(error);
            })
        }


    }
    onCodeSubmit(e) {
        e.preventDefault();
        this.props.setForgotPasswordError("")
        const {email,code} = this.state;
       if(!code){this.props.setForgotPasswordError("Please Enter Code You Received")}
        else if(!email){this.props.setForgotPasswordError("Email Cant Be Empty")}
        else{
           this.setState({loader:true})
           this.props.verifyCode({email:email,code:code}).then((result)=> {
               this.setState({loader:false})
               this.setState({showEnterCode:false,showChangePassword:true})
           },(err)=>{
               this.setState({loader:false})
               this.props.setForgotPasswordError(err);
           })
       }
    }


    onChangePassword(e) {
        this.props.setForgotPasswordError("")
        e.preventDefault();
        const {password,confirmPassword,email} = this.state;
        if(!password || !confirmPassword){
            this.props.setForgotPasswordError("Please Fill Password and Confirm Password !")

        }else if(password != confirmPassword ){
            this.props.setForgotPasswordError("Password Mismatched !")
        }else{
            this.setState({loader:true})
            this.props.changePassword({email:email,password:password}).then((result)=> {
                this.setState({loader:false})
                this.setState({showChangePassword:false,showChangePasswordSuccess:true,password:"",email:"",code:"",confirmPassword:""})

            },(err)=>{
                this.setState({loader:false})
                this.props.setForgotPasswordError(err);
            })
        }

    }

    showLogin(){
        this.setState({showChangePasswordSuccess:false,showLogin:true})
    }

    forgotPassword(){
        this.setState({showForgotPassword:true,showLogin:false})
    }
    render() {
        let {forgotPasswordError} = this.props;
        return (
            <div>
                {this.state.showForgotPassword && <section className="login-block" >
                        <div className="container login">
                            <div className="row">
                                <div className="login-sec">
                                    <h2 className="text-center">Forgot Password ?</h2>
                                    <form className="login-form" onSubmit={this.onForgotPasswordSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email</label>
                                            <input type="text" className="form-control" placeholder="You Will Receive Code On Registered Email"
                                                   onChange={e => this.setState({email: e.target.value})} value={this.state.email}/>

                                        </div>

                                        <OverlayLoader
                                            color={'red'} // default is white
                                            loader="ScaleLoader" // check below for more loaders
                                            text="Loading... Please wait!"
                                            active={this.state.loader}
                                            backgroundColor={'white'} // default is black
                                            opacity="0.4" // default is .9
                                        >
                                        </OverlayLoader>

                                        <br/>
                                        <div className="text-center">
                                            <label className="errorcolor">
                                                { forgotPasswordError && <div>{forgotPasswordError}</div> }
                                            </label><br/>
                                            <button type="submit" className="btn btn-login float-right">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>}

                {this.state.showEnterCode && <section className="login-block" >
                    <div className="container login">
                        <div className="row">
                            <div className="login-sec">
                                <h2 className="text-center">Enter Code</h2>
                                <form className="login-form" onSubmit={this.onCodeSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Code</label>
                                        <input type="text" className="form-control" placeholder="Enter The Code You Receive In Your E-Mail"
                                               onChange={e => this.setState({code: e.target.value})} value={this.state.code}/>

                                    </div>

                                    <OverlayLoader
                                        color={'red'} // default is white
                                        loader="ScaleLoader" // check below for more loaders
                                        text="Loading... Please wait!"
                                        active={this.state.loader}
                                        backgroundColor={'white'} // default is black
                                        opacity="0.4" // default is .9
                                    >
                                    </OverlayLoader>

                                    <div className="text-center">
                                        <label className="errorcolor">
                                            { forgotPasswordError && <div>{forgotPasswordError}</div> }
                                        </label><br/>
                                        <button type="submit" className="btn btn-login float-right">Submit</button>
                                    </div>

                                </form>
                            </div>
                            {/*<div className="col-md-8 banner-sec">*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </section> }
                {this.state.showChangePassword &&  <section className="login-block" >
                    <div className="container login">
                        <div className="row">
                            <div className="login-sec">
                                <h2 className="text-center">Change Password</h2>
                                <form className="login-form" onSubmit={this.onChangePassword}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1" >Password</label>
                                        <input type="text" className="form-control" placeholder="Enter New Password"
                                               onChange={e => this.setState({password: e.target.value})} value={this.state.password}/>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                        <input type="password" className="form-control" placeholder="Confirm New Password"
                                               onChange={e => this.setState({confirmPassword: e.target.value})} value={this.state.confirmPassword}/>
                                    </div>
                                    <OverlayLoader
                                        color={'red'} // default is white
                                        loader="ScaleLoader" // check below for more loaders
                                        text="Loading... Please wait!"
                                        active={this.state.loader}
                                        backgroundColor={'white'} // default is black
                                        opacity="0.4" // default is .9
                                    >
                                    </OverlayLoader>
                                        <br/>
                                        <div className="text-center">
                                            <label className="errorcolor">
                                                { forgotPasswordError && <div>{forgotPasswordError}</div> }
                                            </label><br/>
                                            <button type="submit" className="btn btn-login float-right">Submit</button>
                                        </div>


                                </form>
                            </div>
                            {/*<div className="col-md-8 banner-sec">*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </section>  }
                {this.state.showChangePasswordSuccess && <section className="login-block" >
                    <div className="container login">
                        <div className="row">
                            <div className="login-sec">
                                <h2 className="text-center">Password Changed Successfully click <span className="link"><NavLink to='/' exact> HERE </NavLink></span>  to login</h2>
                            </div>
                        </div>
                    </div>
                </section> }


            </div>

        )
    }
}
;

const mapStateToProps = (state) => {
    return {
        forgotPasswordError: state.Login.forgotPasswordError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setForgotPasswordError: (error) => dispatch(setForgotPasswordError(error)),
        requestCodeToResetPassword: (data) => dispatch(requestCodeToResetPassword(data)),
        verifyCode: (data) => dispatch(verifyCode(data)),
        changePassword: (data) => dispatch(changePassword(data)),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
