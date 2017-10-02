import React from "react";
import { setLoginSuccess } from "../actions/index";
import {connect} from "react-redux";
import Menu from './Menu'
import Newmenu from './Newmenu'
import Videos from './Videos'
import Myprofile from './Myprofile'
import { BrowserRouter,Route ,Redirect} from 'react-router-dom'
import './styles.css'

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        localStorage.getItem("loginuser")?this.props.setLoginSuccess(true):this.props.setLoginSuccess(false)
     if(!localStorage.getItem("loginuser")) {this.props.setLoginSuccess(false); this.props.history.push('/admin')}
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