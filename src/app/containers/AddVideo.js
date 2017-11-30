import React from "react";
import {uploadVideo,uploadImage, setProgress, postVideo,setVideoError,getStandards,getSubjects} from "../actions/index";
import {connect} from "react-redux";
import './styles.css';

class Addvideo extends React.Component {
    constructor(props) {
        super(props);
        this.props.getSubjects();
        this.props.getStandards();
        this.props.setProgress(0)
        this.state = {
            title: "",
            description: "",
            uri: "",
            url: "",
            subject: "",
            standard: "",
            image:"",
            file:"",
            imagePreviewUrl:"",
            isDemo:(props.data && props.data.isDemo)?props.data.isDemo:false
        };
        this._handleSubmit = this._handleSubmit.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this._handleVideoChange = this._handleVideoChange.bind(this)
        this._handleImageChange = this._handleImageChange.bind(this)
        this.clearImage = this.clearImage.bind(this)
        this.cancel = this.cancel.bind(this)
    }


    clearImage(){
        this.setState({imagePreviewUrl:""})
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }
    onSubmit(e) {
        e.preventDefault();
        const {url, title, description, subject, standard,file,image,isDemo} = this.state;
        if(!(title && url && subject && standard)){
            this.props.setVideoError("Fill All Required Fields")
        }else {
            if(file){
                this.props.uploadImage(file).then((result, err)=> {
                    var logoUrl = JSON.parse(result)
                    this.setState({image: logoUrl[0]})
                    this.props.postVideo({
                        title: title,
                        description: description,
                        url: url,
                        subject: subject,
                        standard: standard,
                        videoThumbnail:this.state.image,
                        isDemo:isDemo
                    }).then((result, err)=> {
                        this.props.setProgress(0);
                        this.props.setVideoError("");
                        document.getElementById("test").value = ""
                        this.setState({
                            title: "",
                            description: "",
                            uri: "",
                            url: "",
                            subject: "",
                            standard: "",
                            file:"",
                            image:"",
                            imagePreviewUrl:""
                        })
                    })
                })
            }else{
                this.props.postVideo({
                        title: title,
                        description: description,
                        url: url,
                        subject: subject,
                        standard: standard,
                        videoThumbnail:this.state.image,
                        isDemo:isDemo
                    }).then((result, err)=> {
                        // this.props.setProgress(0);
                        this.props.setVideoError("");
                        document.getElementById("test").value = ""
                        this.setState({
                            title: "",
                            description: "",
                            uri: "",
                            url: "",
                            subject: "",
                            standard: "",
                            file:"",
                            image:"",
                            imagePreviewUrl:""
                        })
                    })

            }

        }
    }



    _handleSubmit(e) {
        e.preventDefault();
        const {uri} = this.state;
        this.props.uploadVideo(uri).then((result, err)=> {

            var videoUrl = JSON.parse(result)

            this.setState({url: videoUrl[0]})
        })

    }

    cancel(e) {
        e.preventDefault();
      this.setState({uri:"",url:"",image:"",imagePreviewUrl:""})
        this.props.setProgress(0)
        document.getElementById("test").value = ""
    }

    _handleVideoChange(e) {
        e.preventDefault();
        this.props.setProgress(0);
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                uri: file
            });
        }
        reader.readAsDataURL(file)
    }

    render() {
        const {imagePreviewUrl} = this.state
        var subjects = this.props.subjects ? this.props.subjects : []
        var listSubjects = subjects.map((subject)=> {
            return (
                <option key={subject._id} value={subject._id}>{subject.name}</option>
            )
        });
        var standards = this.props.standards ? this.props.standards : []
        var listStandards = standards.map( (standard)=> {
            return (
                <option key={standard._id} value={standard._id}>{standard.name}</option>
            )
        });
        return (
            <div>
                <div className="container">
                    <div className="modal fade" id="addvideo" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" onClick={this.cancel} className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Upload Video</h4>
                                </div>
                                <div className="modal-body">

                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Title <span className="required">*</span></label>
                                            </div>
                                            <div className="col-md-9">
                                                <input type="text" className="form-control" placeholder="Enter Title"
                                                       name="name"
                                                       onChange={e => this.setState({title: e.target.value})}
                                                       value={this.state.title} required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Description</label>
                                            </div>
                                            <div className="col-md-9">
                                                    <textarea placeholder="Enter Description" className="form-control"
                                                              rows="5" id="comment"
                                                              onChange={e => this.setState({description: e.target.value})}
                                                              value={this.state.description}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Subject <span className="required">*</span></label>
                                            </div>
                                            <div className="col-md-9">
                                                <select className="form-control"  onChange={e => this.setState({subject: e.target.value})} value={this.state.subject}>
                                                    <option value="" defaultValue="--Select Subject--" disabled>--Select Subject--</option>
                                                    {listSubjects}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Standard <span className="required">*</span></label>
                                            </div>
                                            <div className="col-md-9">
                                                <select className="form-control" onChange={e => this.setState({standard: e.target.value})} value={this.state.standard}>
                                                    <option value="" defaultValue="--Select Standard--" disabled>--Select Standard--</option>
                                                    {listStandards}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Select Video <span className="required">*</span></label>
                                            </div>
                                            <div className="col-md-9">
                                                <input type="file" id="test" accept="video/*" onChange={(e)=> {
                                                    this._handleVideoChange(e)
                                                }}/>
                                                <span><button className="submitButton"
                                                              type="submit"
                                                              onClick={(e)=>this._handleSubmit(e)}
                                                              disabled={!this.state.uri}>Upload</button></span>
                                            </div>
                                        </div>
                                    </div>
                                    {this.props.progress ? <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Video Url</label>
                                            </div>
                                            <div className="col-md-9">
                                                <input className="form-control" rows="5"
                                                       id="comment"
                                                       value={this.state.url ?this.state.url :"please wait getting URL ....."} disabled="disabled"/>
                                            </div>
                                        </div>
                                    </div> :""}
                                    {this.props.progress ? <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-12">
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar"
                                                         style={{width: this.props.progress + "%"}}>
                                                        {this.props.progress + "%"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : ""}

                                    <div className="form-group modalFields">
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Video Thumbnail <span className="required">*</span></label>
                                            </div>
                                            <div className="col-md-5">
                                                <div >
                                                    {imagePreviewUrl &&<div className="glyphicon corner" onClick={this.clearImage}>&#xe088;</div>}
                                                    {imagePreviewUrl && <img src={this.state.imagePreviewUrl} style={{width:"100%",marginTop:"10px"}} />}
                                                </div>
                                                {!imagePreviewUrl &&  <div className="upload-btn-wrapper">
                                                    <button className="btn">Select Image</button>
                                                    <input type="file" name="myfile" onChange={(e)=>this._handleImageChange(e)}/>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="text-center">
                                    <label className="errorcolor">
                                        { this.props.videoError && <div>{this.props.videoError}</div> }
                                    </label>
                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton" data-dismiss="modal" onClick={this.cancel}
                                                    style={{width: "100%", background: "#fff", color: "#333"}}>Cancel
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton" onClick={this.onSubmit} disabled={!this.state.url}
                                                    style={{width: "100%"}}>Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
;

const mapStateToProps = (state) => {
    return {
        progress: state.Videos.progress,
        videoError: state.Videos.videoError,
        subjects: state.Data.subjects,
        standards: state.Data.standards,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadVideo: (file) => dispatch(uploadVideo(file)),
        uploadImage: (file) => dispatch(uploadImage(file)),
        postVideo: (video) => dispatch(postVideo(video)),
        setProgress: (progress) => dispatch(setProgress(progress)),
        setVideoError: (videoError) => dispatch(setVideoError(videoError)),
        getStandards: ()=> dispatch(getStandards()),
        getSubjects: ()=> dispatch(getSubjects()),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Addvideo);
