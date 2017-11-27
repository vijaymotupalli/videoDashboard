import  React from "react";
import SuperAdminLogin from './containers/SuperAdminLogin'
import ForgotPassword from './containers/ForgotPassword'
import SuperAdmin from './containers/QlabAdmin'
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
