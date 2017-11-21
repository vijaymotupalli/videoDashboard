import React from "react";
import {editAdmin,setAdminError,uploadVideo, setProgress} from "../actions/index";
import {connect} from "react-redux";
import './styles.css';


class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.selectedAdmin.email,
            name: props.selectedAdmin.name,
            phone: props.selectedAdmin.phone,
            error: "",
            address:props.selectedAdmin.address,
            school:props.selectedAdmin.school,
            schoolLogoUrl:props.selectedAdmin.schoolLogoUrl ? props.selectedAdmin.schoolLogoUrl :"https://codeuniverse.s3.ap-south-1.amazonaws.com/no_image_placeholder.png",
            image:this.props.selectedAdmin.profilePic ? this.props.selectedAdmin.profilePic:"",
            file:"",
            imagePreviewUrl:this.props.selectedAdmin.profilePic ? this.props.selectedAdmin.profilePic:"",
        };
        this.onSubmit = this.onSubmit.bind(this)
        this._handleImageChange = this._handleImageChange.bind(this)
        this.clearImage = this.clearImage.bind(this)
    }
    componentWillReceiveProps(nextProps){
        this.setState ({
            email: nextProps.selectedAdmin.email,
            name: nextProps.selectedAdmin.name,
            phone: nextProps.selectedAdmin.phone,
            address:nextProps.selectedAdmin.address,
            school:nextProps.selectedAdmin.school,
            schoolLogoUrl:nextProps.selectedAdmin.schoolLogoUrl ? nextProps.selectedAdmin.schoolLogoUrl :"https://codeuniverse.s3.ap-south-1.amazonaws.com/no_image_placeholder.png",
            image:nextProps.selectedAdmin.profilePic ? nextProps.selectedAdmin.profilePic:"",
            file:"",
            imagePreviewUrl:nextProps.selectedAdmin.profilePic ? nextProps.selectedAdmin.profilePic:"",

        });
    }

    _handleSubmit(e) {
        e.preventDefault();
        const {uri} = this.state;
        this.props.uploadVideo(uri).then((result, err)=> {

            var logoUrl = JSON.parse(result)

            this.setState({url: logoUrl[0],schoolLogoUrl:logoUrl[0]})
        })

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
        this.setState({error:""})
        this.props.setAdminError("");
        const {email, name, phone ,address,schoolLogoUrl,image, file,imagePreviewUrl } = this.state;
        if(!((/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email))){ this.setState({
            error: "Email Not Valid"
        })}else {
            if(!file){
                this.props.editAdmin(email,{name: name, phone: phone,address:address}).then((result,err)=> {
                    document.getElementById("close").click()
                })
            }else{
                this.props.uploadVideo(file).then((result, err)=> {
                    var logoUrl = JSON.parse(result)
                    this.setState({image: logoUrl[0]})
                    this.props.editAdmin(email,{name: name, phone: phone,address:address,profilePic:this.state.image}).then((result,err)=> {
                        document.getElementById("close").click()
                    })
                })
            }

        }
    }
    render() {
        let {imagePreviewUrl} = this.state;

        return (
            <div>
                <div className="container" >
                    <div className="modal fade" id="myUserEditModal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button"  id="close" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Edit User</h4>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        {/*{this.state.school && <div className="form-group modalFields">*/}
                                            {/*<div className="row mt30">*/}
                                                {/*<div className="col-md-3">*/}
                                                    {/*<label className="colorGray">School Logo<span className="required">*</span></label>*/}
                                                {/*</div>*/}
                                                {/*<div className="col-md-9">*/}
                                                    {/*<img src={this.state.schoolLogoUrl} width="30%"  />*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*</div> }*/}
                                        {/*{this.state.school && <div className="form-group modalFields">*/}
                                            {/*<div className="row mt30">*/}
                                                {/*<div className="col-md-3">*/}
                                                    {/*<label className="colorGray">Upload Logo<span className="required">*</span></label>*/}
                                                {/*</div>*/}
                                                {/*<div className="col-md-9">*/}
                                                    {/*<input type="file" id="test"  onChange={(e)=> {*/}
                                                        {/*this._handleImageChange(e)*/}
                                                    {/*}}/>*/}
                                                    {/*<span><button className="submitButton"*/}
                                                                  {/*type="submit"*/}
                                                                  {/*onClick={(e)=>this._handleSubmit(e)}*/}
                                                                  {/*disabled={!this.state.uri}>Upload</button></span>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*</div> }    {this.state.school && this.props.progress ? <div className="form-group modalFields">*/}
                                        {/*<div className="row mt30">*/}
                                            {/*<div className="col-md-3">*/}
                                                {/*<label className="colorGray">Logo Url</label>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-md-9">*/}
                                                {/*<input className="form-control" rows="5"*/}
                                                       {/*id="comment"*/}
                                                       {/*value={this.state.url ?this.state.url :"please wait getting URL ....."} disabled="disabled"/>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div> :""}*/}
                                        {/*{this.state.school && this.props.progress ? <div className="form-group modalFields">*/}
                                            {/*<div className="row mt30">*/}
                                                {/*<div className="col-md-12">*/}
                                                    {/*<div className="progress">*/}
                                                        {/*<div className="progress-bar" role="progressbar"*/}
                                                             {/*style={{width: this.props.progress + "%"}}>*/}
                                                            {/*{this.props.progress + "%"}*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*</div> : ""}*/}
                                        <div className="row mt30">
                                            <div className="col-md-3">
                                                <label className="colorGray">Profile Pic</label>
                                            </div>
                                            <div className="col-md-5">
                                                <div >
                                                    {imagePreviewUrl &&<div className="glyphicon corner" onClick={this.clearImage}>&#xe088;</div>}
                                                    {imagePreviewUrl&&<figure className="browseImg">
                                                        <img src={this.state.imagePreviewUrl} style={{width:"100%",marginTop:"10px"}} />
                                                    </figure> }
                                                </div>
                                                {!imagePreviewUrl && <div className="upload-btn-wrapper">
                                                    <button className="btn">Select Image</button>
                                                    <input type="file" name="myfile" onChange={(e)=>this._handleImageChange(e)}/>
                                                </div> }
                                            </div>
                                        </div>

                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Email</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="email"  className="form-control" placeholder="Type Email ID" name="email"
                                                           value={this.state.email} disabled/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Name</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Type Name" name="name"
                                                           onChange={e => this.setState({name: e.target.value})} value={this.state.name} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Phone</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control" value={this.state.phone}
                                                           onChange={(e)=>this.setState({phone: e.target.value})} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Address</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control" value={this.state.address}
                                                           onChange={(e)=>this.setState({address: e.target.value})} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="text-center">
                                        <label className="errorcolor">
                                            { this.state.error && <div>{this.state.error}</div>  }
                                            { this.props.adminError && <div>{ this.props.adminError}</div>}
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton" data-dismiss="modal"
                                                    style={{width:"100%",background:"#fff",color:"#333"}}>CANCEL</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton"  onClick={this.onSubmit} style={{width:"100%"}}>SUBMIT</button>
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
        adminError: state.User.error,
        selectedAdmin: state.User.selectedAdmin,
        progress: state.Videos.progress

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadVideo: (file) => dispatch(uploadVideo(file)),
        setProgress: (progress) => dispatch(setProgress(progress)),
        editAdmin: (userId,admin) => dispatch(editAdmin(userId,admin)),
        setAdminError: (error) => dispatch(setAdminError(error)),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
