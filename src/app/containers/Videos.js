import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import {setSelectedVideo, getVideos,deleteVideo} from "../actions/index";
import './styles.css';
import Addvideo from './AddVideo'
import EditVideo from './EditVideo'

import {connect} from "react-redux";

class Videos extends React.Component {
    constructor(props) {
        super(props)
        this.props.getVideos()
        this.state = {
            superAdmin :false
        }
    }
    componentWillMount(){
        var role = JSON.parse(localStorage.getItem("loginuser")) ? JSON.parse(localStorage.getItem('loginuser')).role :"";
        if(role == "SUPER_ADMIN"){
            this.setState({
                superAdmin:true
            })
        }

    }

    render() {
        return (
            <div >
                <Addvideo/>
                <EditVideo/>
                <div className="row" id="title">
                    <div className="col-sm-10" id="userslist">All Videos</div>
                    {!this.state.superAdmin && <div className="col-sm-2" >
                        <button type="button" className="btn btn-info btn-sm" data-toggle="modal"
                                data-target="#addvideo">
                            <span className="glyphicon glyphicon-plus"/> Upload Video
                        </button>
                    </div>}

                </div>

                {this.props.videos.length > 0 && this.props.videos.map((video)=> {
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
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <p >Subject : <strong ><span
                                                    className="label label-primary">{video.subject.name}</span></strong> </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <p >Standard : <strong><span style={{marginLeft:"auto"}}
                                                                             className="label label-warning">{video.standard.name}</span></strong> </p>
                                            </div>
                                            <div className="col-sm-4">
                                                <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                                                    this.props.deleteVideo(video)
                                                }}>
                                                    <span className="glyphicon glyphicon-trash" /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                    )
                })}

            </div>
        )
    }

}

const mapStateToProps = (state) => {


    return {
        videos: state.Videos.videos,
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


