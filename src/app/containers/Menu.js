import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import './styles.css';
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.onSignout = this.onSignout.bind(this)
    }

    onSignout(e) {
        localStorage.clear()
    }

    render() {
        const {match} = this.props
        return (
            <div className="container-fluid">
                <div id="mySidenav" className="sidenav">
                    <div className="mainLinks">
                        <NavLink to={match.url+'/myprofile'}  activeClassName="active"  exact> My Profile </NavLink>
                        <NavLink to={match.url+'/videos'}  activeClassName="active"  exact> Videos </NavLink>
                        <NavLink to="/" activeClassName="active" onClick={this.onSignout} exact> Signout </NavLink>
                    </div>
                </div>
            </div>
        )
    }

}



const mapStateToProps = (state) => {
    return {
        isLoginPending: state.Login.isLoginPending,
        isLoginSuccess: state.Login.isLoginSuccess,
        loginError: state.Login.loginError
    };
};


const mapDispatchToProps = (dispatch)=> {

    return {

    };

}

export default connect(mapStateToProps,mapDispatchToProps)(Menu);