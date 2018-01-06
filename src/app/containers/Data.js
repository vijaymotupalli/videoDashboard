import React from "react";
import {connect} from "react-redux";
import InlineEdit from 'react-edit-inline';
import './styles.css';
import {uploadVideo,
    getSchools, getStandards, getSubjects, addSchool, addSubject, addStandard,
    editSchool, editSubject, editStandard, deleteSubject, deleteStandard, deleteSchool
} from "../actions/index";
import  moment from 'moment'
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';


class Data extends React.Component {
    constructor(props) {
        super(props);
        this.props.getSubjects();
        this.props.getStandards();
        this.props.getSchools();
        this.state = {
            school: "", subject: "", standard: "", editField: "", disabled: true, image:"",
            file:"",
            imagePreviewUrl:"",superAdmin :false,
            qlab:false,
            contentUploader:false,
            institute:false,standardError:"",subjectError:"",disableButton:false
        }
        this.editSchool = this.editSchool.bind(this);
        this.editSubject = this.editSubject.bind(this);
        this.editStandard = this.editStandard.bind(this);
        this.submitSchool = this.submitSchool.bind(this);
        this.submitStandard = this.submitStandard.bind(this);
        this.submitSubject = this.submitSubject.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this)
        this.clearImage = this.clearImage.bind(this)
        this.onDeleteStandard = this.onDeleteStandard.bind(this)
        this.onDeleteSubject = this.onDeleteSubject.bind(this)

    }

    onDeleteSubject(subject){
        confirmAlert({
            title: 'Confirm To Delete',                        // Title dialog
            message: 'Are you sure to do this.',               // Message dialog
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => this.props.deleteSubject(subject)   // Action after Confirm
        })

    }
    onDeleteStandard(standard){
        confirmAlert({
            title: 'Confirm To Delete',                        // Title dialog
            message: 'Are you sure to do this.',               // Message dialog
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => this.props.deleteStandard(standard)   // Action after Confirm
        })

    }

    editSchool(school) {
        this.props.editSchool({name: school.name, _id: this.state.editField})
    }

    editStandard(standard) {
        this.props.editStandard({name: Number(standard.name), _id: this.state.editField})
    }

    editSubject(subject) {
        this.props.editSubject({name: subject.name, _id: this.state.editField})
    }

    submitSchool(e) {
        e.preventDefault();
        const {school} = this.state;
        this.props.addSchool({name: school});
        this.setState({
            school: ''
        });
    }

    submitSubject(e) {
        e.preventDefault();
      //  this.setState({subjectError:""})
        this.setState({disableButton:true})
        const {subject,file} = this.state;
        if(!(subject && file )){
           // this.setState({subjectError:"Please Fill Required Fields"})
            this.setState({disableButton:false})
        }else {
            this.props.uploadVideo(file).then((result, err)=> {
                var logoUrl = JSON.parse(result)
                this.setState({image: logoUrl[0]})
                this.props.addSubject({
                    name: subject,
                    image: this.state.image
                }).then((result, err)=> {
                    this.setState({disableButton:false})
                    this.setState({
                        subject: "",
                        file: "",
                        imagePreviewUrl:""
                    })
                })

            })
        }


    }

    submitStandard(e) {
        e.preventDefault();
        this.setState({standardError:""})
        const {standard} = this.state;
        if(!standard){this.setState({standardError:"Please Fill Required Fields"})}else{
            this.props.addStandard({name: standard});
            this.setState({
                standard: ''
            });
        }

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

    render() {
        let {imagePreviewUrl} = this.state;
        // var schoolsList = this.props.schools.map((school) => {
        //     return (
        //         <div className="row" key={school._id}>
        //             <div className="col-sm-10" onClick={()=>this.setState({editField: school._id})}>
        //                 <InlineEdit
        //                     text={school.name}
        //                     paramName="name"
        //                     change={this.editSchool}
        //                     activeClassName="form-control"
        //                 />
        //
        //             </div>
        //             <div className="col-sm-2">
        //                 <button type="button" className="btn btn-default btn-sm" onClick={()=> {
        //                     this.props.deleteSchool(school._id)
        //
        //                 }}>
        //                     <span className="glyphicon glyphicon-trash"/>
        //                 </button>
        //             </div>
        //         </div>
        //     )
        //
        // })
        var standardsList = this.props.standards.map((standard)=> {
            // return (  <div className="row" key={standard._id}>
            //     <div className="col-sm-10" onClick={()=>this.setState({editField: standard._id})}>
            //         <InlineEdit
            //             text={String(standard.name)}
            //             paramName="name"
            //             change={this.editStandard}
            //             activeClassName="form-control"
            //         />
            //
            //     </div>
            //     <div className="col-sm-2">
            //         <button type="button" className="btn btn-default btn-sm" onClick={()=> {
            //             this.props.deleteStandard(standard._id)
            //
            //         }}>
            //             <span className="glyphicon glyphicon-trash"/>
            //         </button>
            //     </div>
            // </div>)
            return (
                <tr key={standard._id} >
                    <td onClick={()=>this.setState({editField: standard._id})}>
                        <InlineEdit
                        text={String(standard.name)}
                        paramName="name"
                        change={this.editStandard}
                        activeClassName="form-control"
                    /></td>
                    <td>
                        <button type="button" className="btn btn-default btn-sm" onClick={(e)=> {e.stopPropagation();
                            this.onDeleteStandard(standard._id)

                        }}>
                            <span className="glyphicon glyphicon-trash"/>
                        </button>
                    </td>
                </tr>
            );
        })
        var subjectsList = this.props.subjects.map((subject)=> {
            return (
                    <tr key={subject._id} >
                        <td>
                            <img  className="videoDisplay img-thumbnail" src={subject.image ? subject.image :"https://codeuniverse.s3.ap-south-1.amazonaws.com/no_image_placeholder.png"} />
                        </td>
                        <td onClick={()=>this.setState({editField: subject._id})}> <InlineEdit
                            text={String(subject.name)}
                            paramName="name"
                            change={this.editSubject}
                            activeClassName="form-control"
                        /></td>
                        <td>
                            <button type="button" className="btn btn-default btn-sm" onClick={(e)=> {
                                e.stopPropagation();
                                this.onDeleteSubject(subject._id)

                            }}>
                                <span className="glyphicon glyphicon-trash"/>
                            </button>
                        </td>
                    </tr>
                );

          // return (<div className="row eachNews" key={subject._id}>
          //       <div  className="cardTest">
          //           <div className="col-sm-2">
          //
          //           </div>
          //           <div className="col-sm-6" onClick={()=>this.setState({editField: subject._id})}>
          //               <InlineEdit
          //                   text={subject.name}
          //                   paramName="name"
          //                   change={this.editSubject}
          //                   activeClassName="form-control"
          //               />
          //
          //           </div>
          //           <div className="col-sm-2">
          //
          //           </div>
          //       </div>
          //   </div>)
            // return (<div className="row" key={subject._id}>
            //
            //     <div className="col-sm-4" onClick={()=>this.setState({editField: subject._id})}>
            //         <img  className="displayImage" src={subject.image ? subject.image :"https://codeuniverse.s3.ap-south-1.amazonaws.com/no_image_placeholder.png"} />
            //     </div>
            //
            //     <div className="col-sm-6" onClick={()=>this.setState({editField: subject._id})}>
            //         <InlineEdit
            //             text={subject.name}
            //             paramName="name"
            //             change={this.editSubject}
            //             activeClassName="form-control"
            //         />
            //
            //     </div>
            //     <div className="col-sm-2">
            //         <button type="button" className="btn btn-default btn-sm" onClick={()=> {
            //             this.props.deleteSubject(subject._id)
            //
            //         }}>
            //             <span className="glyphicon glyphicon-trash"/>
            //         </button>
            //     </div>
            // </div>)
        })
        return (
            <div className="container-fluid">
                <br/>
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#subjects">Subjects</a></li>
                    <li><a data-toggle="tab" href="#standards">Standards</a></li>
                </ul>

                <div className="tab-content">
                    <div id="subjects" className="tab-pane fade in active">
                        <div id="subjects" className="tab-pane fade in active">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="displaySubject">
                                            <h3>Subjects List</h3>
                                            <div className="gridTable">
                                                <table className="table table-striped table-bordered" cellSpacing="0" width="100%">
                                                    <thead>
                                                    <tr>
                                                        <th>image</th>
                                                        <th>Name</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {subjectsList }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="addSubject">
                                            <div className="cardWidget customCard">
                                                <div className="cardBottom">
                                                    <div className="row">
                                                        <form onSubmit={this.submitSubject}>
                                                            <h3>Add Subjects</h3>
                                                            <div className="form-group">
                                                                <div className="row mt30">
                                                                    <div className="col-md-3">
                                                                        <label className="colorGray">Subject<span className="required">*</span></label>
                                                                    </div>
                                                                    <div className="col-md-5">
                                                                        <input type="text" className="form-control" value={this.state.subject}
                                                                               onChange={(e)=>this.setState({subject: e.target.value})}
                                                                               placeholder="Add Subject"/>
                                                                    </div>
                                                                </div>

                                                                <div className="row mt30">
                                                                    <div className="col-md-3">
                                                                        <label className="colorGray">Image<span className="required">*</span></label>
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
                                                                {/*<div className="text-center">*/}
                                                                {/*<label className="errorcolor">*/}
                                                                {/*{ subjectError && <div>{subjectError}</div> }*/}
                                                                {/*</label><br/>*/}
                                                                {/*<button type="submit" className="btn btn-login float-right" disabled={!this.state.subject || !this.state.file || this.state.disableButton}>Submit</button>*/}
                                                                {/*</div>*/}

                                                                <div className="row mt30">
                                                                    <div className="col-md-2">
                                                                        <button type="submit" className="btn btn-default" disabled={!this.state.subject || !this.state.file || this.state.disableButton}>
                                                                            Submit
                                                                        </button>
                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                        </div>
                    </div>
                    <br/>
                    <div id="standards" className="tab-pane fade">
                        <div id="standards" className="tab-pane fade in active">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="displayStandards" >
                                        <h3>Standards List</h3>
                                        <div className="gridTable">
                                            <table className="table table-striped table-bordered" cellSpacing="0" width="100%">
                                                <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {standardsList }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="addStandards">
                                        <div className="cardWidget">
                                            <div className="cardBottom">
                                                <div className="row">
                                                    <form onSubmit={this.submitStandard}>
                                                        <h3>Add Standard</h3>
                                                        <div className="form-group addbox">
                                                            <div className="row mt30">
                                                                <div className="col-md-3">
                                                                    <label className="colorGray">Standard<span className="required">*</span></label>
                                                                </div>
                                                                <div className="col-md-5">
                                                                    <input type="text" className="form-control" value={this.state.standard}
                                                                           onChange={(e)=>this.setState({standard: e.target.value})}
                                                                           placeholder="Add Standard"/>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <button type="submit" className="btn btn-default" disabled={!this.state.standard}>
                                                                        Submit
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                
                
                {/*<div className="row">*/}
                        {/*<div className="col-sm-6">*/}
                            {/*<div id="subjects" className="tab-pane fade in active">*/}
                                {/*<div className="row">*/}
                                        {/*<div className="cardWidget customCard">*/}
                                            {/*<div className="cardBottom">*/}
                                                {/*<div className="row">*/}
                                                    {/*<form onSubmit={this.submitSubject}>*/}
                                                        {/*<div className="form-group">*/}
                                                            {/*<div className="row mt30">*/}
                                                                {/*<div className="col-md-3">*/}
                                                                    {/*<label className="colorGray">Subject<span className="required">*</span></label>*/}
                                                                {/*</div>*/}
                                                                {/*<div className="col-md-5">*/}
                                                                    {/*<input type="text" className="form-control" value={this.state.subject}*/}
                                                                           {/*onChange={(e)=>this.setState({subject: e.target.value})}*/}
                                                                           {/*placeholder="Add Subject"/>*/}
                                                                {/*</div>*/}
                                                            {/*</div>*/}

                                                            {/*<div className="row mt30">*/}
                                                                {/*<div className="col-md-3">*/}
                                                                    {/*<label className="colorGray">Image<span className="required">*</span></label>*/}
                                                                {/*</div>*/}
                                                                {/*<div className="col-md-5">*/}
                                                                    {/*<div >*/}
                                                                        {/*{imagePreviewUrl &&<div className="glyphicon corner" onClick={this.clearImage}>&#xe088;</div>}*/}
                                                                        {/*{imagePreviewUrl&& <img src={this.state.imagePreviewUrl} style={{width:"100%",marginTop:"10px"}} /> }*/}
                                                                    {/*</div>*/}
                                                                    {/*{!imagePreviewUrl && <div className="upload-btn-wrapper">*/}
                                                                        {/*<button className="btn">Select Image</button>*/}
                                                                        {/*<input type="file" name="myfile" onChange={(e)=>this._handleImageChange(e)}/>*/}
                                                                    {/*</div> }*/}
                                                                {/*</div>*/}
                                                            {/*</div>*/}

                                                            {/*<div className="row mt30">*/}
                                                                {/*<div className="col-md-8">*/}
                                                                    {/*<button type="submit" id="addbutton" className="btn btn-default addbutton">*/}
                                                                        {/*Submit*/}
                                                                    {/*</button>*/}
                                                                {/*</div>*/}

                                                            {/*</div>*/}

                                                        {/*</div>*/}

                                                    {/*</form>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                        {/*<h3>Subjects List</h3>*/}

                                    {/*<div className="gridTable">*/}
                                        {/*<table className="table table-striped table-bordered" cellSpacing="0" width="100%">*/}
                                            {/*<thead>*/}
                                            {/*<tr>*/}
                                                {/*<th>image</th>*/}
                                                {/*<th>Name</th>*/}
                                                {/*<th>Action</th>*/}
                                            {/*</tr>*/}
                                            {/*</thead>*/}
                                            {/*<tbody>*/}
                                            {/*{subjectsList }*/}
                                            {/*</tbody>*/}
                                        {/*</table>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*<div className="col-sm-6">*/}
                        {/*<div id="standards" className="tab-pane fade in active">*/}
                            {/*<div className="row">*/}
                                {/*<div >*/}
                                    {/*<div className="cardWidget customCard">*/}
                                        {/*<div className="cardBottom">*/}
                                            {/*<div className="row">*/}
                                                {/*<form onSubmit={this.submitStandard}>*/}
                                                    {/*<div className="form-group addbox">*/}
                                                        {/*<div className="row mt30">*/}
                                                            {/*<div className="col-md-3">*/}
                                                                {/*<label className="colorGray">Standard<span className="required">*</span></label>*/}
                                                            {/*</div>*/}
                                                            {/*<div className="col-md-5">*/}
                                                                {/*<input type="text" className="form-control" value={this.state.standard}*/}
                                                                       {/*onChange={(e)=>this.setState({standard: e.target.value})}*/}
                                                                       {/*placeholder="Add Standard"/>*/}
                                                            {/*</div>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="row mt30">*/}
                                                            {/*<div className="col-md-8">*/}
                                                                {/*<button type="submit" id="addbutton" className="btn btn-default addbutton">*/}
                                                                    {/*Submit*/}
                                                                {/*</button>*/}
                                                            {/*</div>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                                                {/*</form>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div >*/}
                                    {/*<h3>Standards List</h3>*/}
                                    {/*<div className="gridTable">*/}
                                        {/*<table className="table table-striped table-bordered" cellSpacing="0" width="100%">*/}
                                            {/*<thead>*/}
                                            {/*<tr>*/}
                                                {/*<th>Name</th>*/}
                                                {/*<th>Action</th>*/}
                                            {/*</tr>*/}
                                            {/*</thead>*/}
                                            {/*<tbody>*/}
                                            {/*{standardsList }*/}
                                            {/*</tbody>*/}
                                        {/*</table>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    {/*</div>*/}


            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        schools: state.Data.schools,
        subjects: state.Data.subjects,
        standards: state.Data.standards,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSchools: ()=> dispatch(getSchools()),
        getStandards: ()=> dispatch(getStandards()),
        getSubjects: ()=> dispatch(getSubjects()),
        addSubject: (subject)=> dispatch(addSubject(subject)),
        addStandard: (standard)=> dispatch(addStandard(standard)),
        addSchool: (school)=> dispatch(addSchool(school)),
        editSubject: (subject)=> dispatch(editSubject(subject)),
        editStandard: (standard)=> dispatch(editStandard(standard)),
        editSchool: (school)=> dispatch(editSchool(school)),
        deleteSubject: (subject)=> dispatch(deleteSubject(subject)),
        deleteStandard: (standard)=> dispatch(deleteStandard(standard)),
        deleteSchool: (school)=> dispatch(deleteSchool(school)),
        uploadVideo: (file) => dispatch(uploadVideo(file)),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Data);