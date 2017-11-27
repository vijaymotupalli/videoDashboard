import React from "react";
import { setLoginSuccess } from "../actions/index";
import {connect} from "react-redux";
import Menu from './Menu'
import Newmenu from './Newmenu'
import Videos from './Videos'
import DemoVideos from './DemoVideos'
import CodeGenerator from './CodeGenerator'
import Myprofile from './Myprofile'
import Data from './Data'
import Admins from './ContentUploaders'
import SuperAdmins from './SuperAdmins'
import Institutes from './Institutes'
import Users from './Users'
import AdminDetails from './ContentUploaderDetails'
import UserDetails from './UserDetails'
import { BrowserRouter,Route ,Redirect} from 'react-router-dom'
import './styles.css'
import SelectDemo from './ApplyFilter'

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        localStorage.getItem("loginuser")?this.props.setLoginSuccess(true):this.props.setLoginSuccess(false)
     if(!localStorage.getItem("loginuser")) {this.props.setLoginSuccess(false); this.props.history.push('/')}
    }
    render(){
        const {match} = this.props
        return (
            <div className="totalBlock,container-fluid">
                {/*<div ><Route  component={Menu} /></div>*/}
                <div ><Route  component={Newmenu} /></div>
                <div  id="toggleMenu">
                    <Route exact  path= {match.url+'/videos' } component={Videos} />
                    <Route exact  path= {match.url+'/myprofile' } component={Myprofile} />
                    <Route exact  path= {match.url+'/contentuploaders' } component={Admins} />
                    <Route exact  path= {match.url+'/superadmins' } component={SuperAdmins} />
                    <Route exact  path= {match.url+'/institutes' } component={Institutes} />
                    <Route exact  path= {match.url+'/users' } component={Users} />

                    <Route exact path={match.url+'/contentuploaders/:contentuploaderId'} render={(props) => (
                        <AdminDetails {...props} data={{title:"Content Uploader Details"}} />
                    )}/>
                    <Route exact path={match.url+'/institutes/:contentuploaderId'} render={(props) => (
                        <AdminDetails {...props} data={{title:"Institution Details"}} />
                    )}/>
                    <Route exact path={match.url+'/superadmins/:contentuploaderId'} render={(props) => (
                        <AdminDetails {...props} data={{title:"Super Admin Details"}} />
                    )}/>

                    <Route exact  path={match.url+'/users/:userId'} component={UserDetails} />
                    <Route exact  path= {match.url+'/data' } component={Data} />
                    <Route exact  path= {match.url+'/demovideos' } component={DemoVideos} />
                    <Route exact  path= {match.url+'/codes' } component={CodeGenerator} />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.Login.isLoginPending,
        isLoginSuccess: state.Login.isLoginSuccess,
        loginError: state.Login.loginError
    };
};


const mapDispatchToProps = (dispatch)=> {

    return {
        setLoginSuccess: (status) => dispatch(setLoginSuccess(status))
    };

}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);