import React from "react";
import {uploadVideo,setProgress,postVideo} from "../actions/index";
import {connect} from "react-redux";
import './styles.css';

class Addvideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            uri: "",
            url:"",
            subject:"",
            standard:""
        };
        this._handleSubmit = this._handleSubmit.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this._handleImageChange = this._handleImageChange.bind(this)
    }
    onSubmit(e){
        e.preventDefault();
        const {url,title,description,subject,standard} = this.state;
        this.props.postVideo({
            title: title,
            description: description,
            url:url,
            subject:subject,
            standard:standard
        }).then((result,err)=>{
            this.props.setProgress(0);
            document.getElementById("test").value=""
            this.setState({
                title: "",
                description: "",
                uri: "",
                url:"",
                subject:"",
                standard:""
            })
        })

    }

    _handleSubmit(e) {
        e.preventDefault();
        const {uri} = this.state;
        this.props.uploadVideo(uri).then((result,err)=>{
            console.log("----result url----",typeof result)
            var videoUrl = JSON.parse(result)
            console.log("----result url----",videoUrl[0]);
            this.setState({url:videoUrl[0]})
        })

    }
    _handleImageChange(e) {
        e.preventDefault();
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
        return (
            <div>
                <div className="container" >
                    <div className="modal fade" id="addvideo" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Upload Video</h4>
                                </div>
                                <div className="modal-body">

                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Title</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Enter Title" name="name"
                                                           onChange={e => this.setState({title: e.target.value})} value={this.state.title} required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Description</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <textarea placeholder="Enter Description" className="form-control" rows="5" id="comment"
                                                              onChange={e => this.setState({description: e.target.value})} value={this.state.description} />
                                                </div>
                                            </div>
                                        </div>
                                    <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Subject</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input placeholder="Enter Subject" className="form-control" rows="5" id="comment"
                                                              onChange={e => this.setState({subject: e.target.value})} value={this.state.subject} />
                                                </div>
                                            </div>
                                        </div>
                                    <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Standard</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input placeholder="Enter Standar" className="form-control" rows="5" id="comment"
                                                              onChange={e => this.setState({standard: e.target.value})} value={this.state.standard} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Select Video</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="file" id="test" onChange={(e)=>{this._handleImageChange(e)}}/>
                                                    <button className="submitButton"
                                                            type="submit"
                                                            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
                                                    <progress id="progressBar" value={Number(this.props.progress)} max="100">10
                                                    </progress>

                                                </div>
                                            </div>
                                        </div>

                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton" data-dismiss="modal"
                                                    style={{width:"100%",background:"#fff",color:"#333"}}>Cancel</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton" onClick={this.onSubmit} style={{width:"100%"}}>Submit</button>
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
        progress:state.Videos.progress
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadVideo: (file) => dispatch(uploadVideo(file)),
        postVideo: (video) => dispatch(postVideo(video)),
        setProgress: (progress) => dispatch(setProgress(progress)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Addvideo);
