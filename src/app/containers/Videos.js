import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import {setSelectedVideo, getVideos} from "../actions/index";
import './styles.css';
import Addvideo from './AddVideo'
import EditVideo from './EditVideo'

import {connect} from "react-redux";

class Videos extends React.Component {
    constructor(props) {
        super(props)
        this.props.getVideos()
    }

    render() {
        return (
            <div >
                <Addvideo/>
                <EditVideo/>
                <div className="row" id="title">
                    <div className="col-sm-10" id="userslist">All Videos</div>
                    <div className="col-sm-2">
                        <button type="button" className="btn btn-info btn-sm" data-toggle="modal"
                                data-target="#addvideo">
                            <span className="glyphicon glyphicon-plus"/> Upload Video
                        </button>
                    </div>

                </div>

                {this.props.videos.length > 0 && this.props.videos.map((video)=> {
                    return (
                            <div key={video._id} className="panel panel-default productWidget">
                                <div className="panel-heading">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <p ><strong >{video.title}</strong></p>
                                        </div>
                                        <div className="col-md-3">
                                            <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                                                this.props.setSelectedVideo(video)
                                            }} data-toggle="modal" data-target="#editVideo">
                                                <span className="glyphicon glyphicon-pencil"/> Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-body">
                                    <video className="videoDisplay" controls>
                                        <source src={video.url}/>
                                    </video>
                                </div>
                                <div className="panel-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p >Subject : <strong ><span
                                                className="label label-primary">{video.subject}</span></strong></p>
                                        </div>
                                        <div className="col-md-6">
                                            <p >Standard : <strong ><span
                                                className="label label-warning">{video.standard}</span></strong></p>
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
    console.log("====state====", state)
    return {
        videos: state.Videos.videos,
        selectedVideo: state.Videos.selectedVideo
    };
};


const mapDispatchToProps = (dispatch)=> {

    return {
        setSelectedVideo: (video) => dispatch(setSelectedVideo(video)),
        getVideos: () => dispatch(getVideos())
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(Videos);