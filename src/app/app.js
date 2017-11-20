import  React from "react";
import AdminLogin from './containers/AdminLogin'
import SuperAdminLogin from './containers/SuperAdminLogin'
import ForgotPassword from './containers/ForgotPassword'
import Admin from './containers/Admin'
import SuperAdmin from './containers/SuperAdmin'
import { BrowserRouter,HashRouter ,Route ,Redirect} from 'react-router-dom'
class App extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div >
            <Route  exact path="/" component={SuperAdminLogin} />
            <Route  path="/forgotpassword" component={ForgotPassword} />
            <Route  path="/dashboard" component={SuperAdmin} />
            </div>
    );
    }
}

export default App;
