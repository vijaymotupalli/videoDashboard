import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import {setSelectedVideo, getVideos,deleteVideo} from "../actions/index";
import './styles.css';
import Addvideo from './AddVideo'
import EditVideo from './EditVideo'
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import ApplyFilter from './ApplyFilter'
import 'style-loader!react-confirm-alert/src/react-confirm-alert.css'
import {connect} from "react-redux";

import Loadable from 'react-loading-overlay'
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

class Videos extends React.Component {
    constructor(props) {
        super(props)
        this.props.getVideos()
        this.state = {
            superAdmin :false,
            qlab:false,
            contentUploader:false,
            institute:false
        }
        this.onDeleteVideo = this.onDeleteVideo.bind(this)

    }
    componentWillMount(){
        var role = JSON.parse(localStorage.getItem("loginuser")) ? JSON.parse(localStorage.getItem('loginuser')).role :"";
        switch (role) {
            case "SUPER_ADMIN":
                this.setState({
                    superAdmin:true
                })
                break;
            case "QLAB":
                this.setState({
                    qlab:true
                })
                break;
            case "CONTENT_UPLOADER":
                this.setState({
                    contentUploader:true
                })
                break;

            case "INSTITUTE":
                this.setState({
                    institute:true
                })
                break;
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
                       <div className="col-md-10" id="userslist">All Videos</div>
                       {(this.state.qlab || this.state.contentUploader) && <div className="col-md-2" >
                           <button type="button" className="btn btn-info btn-sm" data-toggle="modal"
                                   data-target="#addvideo">
                               <span className="glyphicon glyphicon-plus"/> Upload Video
                           </button>
                       </div>
                       }
                   </div>
                   <div className="filter">
                       <ApplyFilter/>
                   </div>
                   <OverlayLoader
                       color={'red'} // default is white
                       loader="ScaleLoader" // check below for more loaders
                       text="Loading... Please wait!"
                       active={this.props.loader}
                       backgroundColor={'white'} // default is black
                       opacity="0.4" // default is .9
                   >

                       <div className="container-fluid">
                           <div className="row">
                               {this.props.videos.length > 0 ? this.props.videos.map((video)=> {
                                   return (
                                       <div >
                                           <div className="col-md-3" key={video._id}>
                                               {/*<div className="videoCard">*/}
                                                   {/*<div className="card-header">*/}
                                                       {/*<div className="row">*/}
                                                           {/*<div className="col-md-9">*/}
                                                               {/*<div> {video.title}</div>*/}
                                                           {/*</div>*/}
                                                           {/*<div className="col-md-3 text_right">*/}
                                                               {/*<button type="button" className="btn btn-default btn-sm" onClick={()=> {*/}
                                                                   {/*this.props.setSelectedVideo(video)*/}
                                                               {/*}} data-toggle="modal" data-target="#editVideo">*/}
                                                                   {/*<span className="glyphicon glyphicon-pencil"/>*/}
                                                               {/*</button>*/}
                                                           {/*</div>*/}
                                                       {/*</div>*/}
                                                   {/*</div>*/}
                                                   {/*<div className="card-body">*/}
                                                       {/*<div className="row">*/}
                                                           {/*<div className="col-md-12">*/}
                                                               {/*<video  controls controlsList="nodownload" className="video" poster={video.videoThumbnail ? video.videoThumbnail : "https://vrscience.s3.ap-south-1.amazonaws.com/no-thumbnail.jpg" }>*/}
                                                                   {/*<source src={video.url}/>*/}
                                                               {/*</video>*/}
                                                           {/*</div>*/}
                                                       {/*</div>*/}
                                                   {/*</div>*/}
                                                   {/*<div className="card-footer">*/}
                                                       {/*<div className="row">*/}
                                                           {/*<div className="col-md-8">*/}
                                                               {/*<p ><strong>Subject :</strong> <strong ><span*/}
                                                                   {/*className="label label-primary">{(video.subject && video.subject.name ) ? (video.subject.name):"No Subject"}</span></strong> </p>*/}
                                                           {/*</div>*/}
                                                       {/*</div>*/}
                                                       {/*<div className="row">*/}
                                                           {/*<div className="col-md-7">*/}
                                                               {/*<p ><strong>Standard : </strong><strong><span className="label label-success">*/}
                                                                   {/*{(video.standard && video.standard.name) ? (video.standard.name) :"No Standard"}</span></strong>*/}
                                                               {/*</p>*/}
                                                           {/*</div>*/}
                                                           {/*<div className="col-md-5">*/}
                                                               {/*<button type="button" className="btn btn-default btn-sm" onClick={()=> {*/}
                                                                   {/*this.onDeleteVideo(video)*/}
                                                               {/*}}>*/}
                                                                   {/*<span className="glyphicon glyphicon-trash" /> Delete*/}
                                                               {/*</button>*/}
                                                           {/*</div>*/}
                                                       {/*</div>*/}
                                                   {/*</div>*/}

                                               {/*</div>*/}

                                               <div  className="panel panel-default productWidget">
                                                   <div className="panel-heading">
                                                       <div className="row">
                                                           <div className="col-md-9">
                                                               <div className="videoTitle"> {video.title}</div>
                                                           </div>
                                                           <div className="col-md-3">
                                                               <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                                                                   this.props.setSelectedVideo(video)
                                                               }} data-toggle="modal" data-target="#editVideo">
                                                                   <span className="glyphicon glyphicon-pencil"/>
                                                               </button>
                                                           </div>
                                                       </div>
                                                   </div>
                                                   <div className="panel-body">
                                                       <div className="col-md-12 videoDisplay">
                                                           <video  controls controlsList="nodownload" className="video" poster={video.videoThumbnail ? video.videoThumbnail : "https://vrscience.s3.ap-south-1.amazonaws.com/no-thumbnail.jpg" }>
                                                               <source src={video.url}/>
                                                           </video>
                                                       </div>
                                                   </div>
                                                   <div className="panel-footer">
                                                       <div className="row">
                                                           <div className="col-md-12">
                                                               <p ><strong>Subject :</strong> <strong ><span
                                                                   className="label label-primary">{(video.subject && video.subject.name ) ? (video.subject.name):"No Subject"}</span></strong> </p>
                                                           </div>
                                                       </div>
                                                       <div className="row">
                                                           <div className="col-md-9">
                                                               <p ><strong>Standard : </strong><strong><span style={{marginLeft:"auto"}}
                                                                                                             className="label label-success">{(video.standard && video.standard.name) ? (video.standard.name) :"No Standard"}</span></strong> </p>
                                                           </div>
                                                           <div className="col-md-3">
                                                               <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                                                                   this.onDeleteVideo(video)
                                                               }}>
                                                                   <span className="glyphicon glyphicon-trash" />
                                                               </button>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>

                                           </div>
                                       </div>


                                   )
                               }) : <h2 className="notFound">"No Videos Found"</h2> }
                           </div>

                       </div>


                   </OverlayLoader>
               </div>
        )
    }

}

const mapStateToProps = (state) => {


    return {
        videos: state.Videos.videos,
        loader: state.Videos.loader,
        selectedVideo: state.Videos.selectedVideo
    };
};


const mapDispatchToProps = (dispatch)=> {

    return {
        setSelectedVideo: (video) => dispatch(setSelectedVideo(video)),
        getVideos: () => dispatch(getVideos()),
        deleteVideo: (video) => dispatch(deleteVideo(video)),

    };

}

export default connect(mapStateToProps, mapDispatchToProps)(Videos);


