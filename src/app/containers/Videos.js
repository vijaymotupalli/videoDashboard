import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import {selectedVideo, getVideos} from "../actions/index";
import './styles.css';
import Addvideo from './AddVideo'

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
                <div className="row" id="title">
                    <div className="col-sm-8" id="userslist">All Videos</div>
                    <div className="col-sm-4">
                        <button type="button"  className="btn btn-info btn-lg" data-toggle="modal"
                                data-target="#addvideo">Upload Video
                        </button>
                    </div>

                </div>
                {this.props.videos.length > 0 && this.props.videos.map(function (video) {
                    return (
                        <div key={video._id} className="panel panel-default productWidget">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-md-9">
                                        <p ><strong >{video.title}</strong></p>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <video className="videoDisplay" controls>
                                    <source src={video.url}/>
                                </video>
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
        selectedVideo: (video) => dispatch(selectedVideo(video)),
        getVideos: () => dispatch(getVideos())
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(Videos);