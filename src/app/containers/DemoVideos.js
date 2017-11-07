import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import {setSelectedVideo, getDemoVideos,deleteVideo} from "../actions/index";
import './styles.css';
import Addvideo from './AddVideo'
import EditVideo from './EditVideo'
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import 'style-loader!react-confirm-alert/src/react-confirm-alert.css'
import {connect} from "react-redux";

import Loadable from 'react-loading-overlay'
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

class DemoVideos extends React.Component {
    constructor(props) {
        super(props)
        this.props.getDemoVideos()
        this.state = {
            superAdmin :false
        }
        this.onDeleteVideo = this.onDeleteVideo.bind(this)
    }
    componentWillMount(){
        var role = JSON.parse(localStorage.getItem("loginuser")) ? JSON.parse(localStorage.getItem('loginuser')).role :"";
        if(role == "SUPER_ADMIN"){
            this.setState({
                superAdmin:true
            })
        }

    }

    onDeleteVideo(video){
        confirmAlert({
            title: 'Confirm To Delete',                        // Title dialog
            message: 'Are you sure to do this.',               // Message dialog
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => this.props.deleteVideo(video)   // Action after Confirm
        })

    }

    render() {
        return (
               <div>
                   <Addvideo/>
                   <EditVideo/>
                   <div className="row" id="title">
                       <div className="col-sm-10" id="userslist">Demo Videos</div>
                       {this.state.superAdmin && <div className="col-sm-2" >
                           <button type="button" className="btn btn-info btn-sm" data-toggle="modal"
                                   data-target="#addvideo">
                               <span className="glyphicon glyphicon-plus"/> Upload Video
                           </button>
                       </div>}

                   </div>
                   <OverlayLoader
                       color={'red'} // default is white
                       loader="ScaleLoader" // check below for more loaders
                       text="Loading... Please wait!"
                       active={this.props.loader}
                       backgroundColor={'white'} // default is black
                       opacity="0.4" // default is .9
                   >
                       {this.props.demoVideos.length > 0 ? this.props.demoVideos.map((video)=> {
                           return (
                               <div className="container, col-sm-4" key={video._id} style={{textAlign:"left"}}>
                                   <div  className="panel panel-default productWidget">
                                       <div className="panel-heading">
                                           <div className="row">
                                               <div className="col-sm-10">
                                                   <div className="videoTitle"> {video.title}</div>
                                               </div>
                                               <div className="col-sm-2">
                                                   <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                                                       this.props.setSelectedVideo(video)
                                                   }} data-toggle="modal" data-target="#editVideo">
                                                       <span className="glyphicon glyphicon-pencil"/>
                                                   </button>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="panel-body">
                                           <video  controls className="videoDisplay">
                                               <source src={video.url}/>
                                           </video>
                                       </div>
                                       <div className="panel-footer">
                                           {this.state.superAdmin && <div className="row">
                                               <div className="col-sm-2">
                                                   <p ><strong>Url : </strong></p>
                                               </div>
                                               <div className="col-sm-10">
                                                   <input type="text" className="form-control" disabled value={video.url}/>
                                               </div>
                                           </div>}
                                           <div className="row">
                                               <div className="col-sm-8">
                                                   <p ><strong>Subject :</strong> <strong ><span
                                                       className="label label-primary">{(video.subject && video.subject.name ) ? (video.subject.name):"No Subject"}</span></strong> </p>
                                               </div>
                                           </div>
                                           <div className="row">
                                               <div className="col-sm-8">
                                                   <p ><strong>Standard : </strong><strong><span style={{marginLeft:"auto"}}
                                                                                                 className="label label-success">{(video.standard && video.standard.name) ? (video.standard.name) :"No Standard"}</span></strong> </p>
                                               </div>
                                               <div className="col-sm-4">
                                                   <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                                                       this.onDeleteVideo(video)
                                                   }}>
                                                       <span className="glyphicon glyphicon-trash" /> Delete
                                                   </button>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>


                           )
                       }) : <h2 className="notFound">"Demo Videos Not Found"</h2> }
                   </OverlayLoader>
               </div>
        )
    }

}

const mapStateToProps = (state) => {


    return {
        demoVideos: state.Videos.demoVideos,
        loader: state.Videos.loader,
        selectedVideo: state.Videos.selectedVideo
    };
};


const mapDispatchToProps = (dispatch)=> {

    return {
        setSelectedVideo: (video) => dispatch(setSelectedVideo(video)),
        getDemoVideos: () => dispatch(getDemoVideos()),
        deleteVideo: (video) => dispatch(deleteVideo(video)),

    };

}

export default connect(mapStateToProps, mapDispatchToProps)(DemoVideos);


