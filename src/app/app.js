import  React from "react";
import AdminLogin from './containers/AdminLogin'
import Admin from './containers/Admin'
import { BrowserRouter,HashRouter ,Route ,Redirect} from 'react-router-dom'
class App extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div >
            <Route exact path="/" component={AdminLogin} />
            <Route  path="/admin" component={Admin} />
            </div>
    );
    }
}

export default App;
