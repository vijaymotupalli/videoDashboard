import React from "react";
import {connect} from "react-redux";
import InlineEdit from 'react-edit-inline';
import './styles.css';
import {
    getSchools, getStandards, getSubjects, addSchool, addSubject, addStandard,
    editSchool, editSubject, editStandard, deleteSubject, deleteStandard, deleteSchool
} from "../actions/index";
import  moment from 'moment'


class Data extends React.Component {
    constructor(props) {
        super(props);
        this.props.getSubjects();
        this.props.getStandards();
        this.props.getSchools();
        this.state = {
            school: "", subject: "", standard: "", editField: "", disabled: true
        }
        this.editSchool = this.editSchool.bind(this);
        this.editSubject = this.editSubject.bind(this);
        this.editStandard = this.editStandard.bind(this);
        this.submitSchool = this.submitSchool.bind(this);
        this.submitStandard = this.submitStandard.bind(this);
        this.submitSubject = this.submitSubject.bind(this);
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
        const {subject} = this.state;
        this.props.addSubject({name: subject});
        this.setState({
            subject: ''
        });
    }

    submitStandard(e) {
        e.preventDefault();
        const {standard} = this.state;
        this.props.addStandard({name: standard});
        this.setState({
            standard: ''
        });
    }

    render() {
        var schoolsList = this.props.schools.map((school) => {
            return (
                <div className="row" key={school._id}>
                    <div className="col-sm-10" onClick={()=>this.setState({editField: school._id})}>
                        <InlineEdit
                            text={school.name}
                            paramName="name"
                            change={this.editSchool}
                            activeClassName="form-control"
                        />

                    </div>
                    <div className="col-sm-2">
                        <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                            this.props.deleteSchool(school._id)

                        }}>
                            <span className="glyphicon glyphicon-trash"/>
                        </button>
                    </div>
                </div>
            )

        })
        var standardsList = this.props.standards.map((standard)=> {
            return (  <div className="row" key={standard._id}>
                <div className="col-sm-10" onClick={()=>this.setState({editField: standard._id})}>
                    <InlineEdit
                        text={String(standard.name)}
                        paramName="name"
                        change={this.editStandard}
                        activeClassName="form-control"
                    />

                </div>
                <div className="col-sm-2">
                    <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                        this.props.deleteStandard(standard._id)

                    }}>
                        <span className="glyphicon glyphicon-trash"/>
                    </button>
                </div>
            </div>)
        })
        var subjectsList = this.props.subjects.map((subject)=> {
            return (<div className="row" key={subject._id}>
                <div className="col-sm-10" onClick={()=>this.setState({editField: subject._id})}>
                    <InlineEdit
                        text={subject.name}
                        paramName="name"
                        change={this.editSubject}
                        activeClassName="form-control"
                    />

                </div>
                <div className="col-sm-2">
                    <button type="button" className="btn btn-default btn-sm" onClick={()=> {
                        this.props.deleteSubject(subject._id)

                    }}>
                        <span className="glyphicon glyphicon-trash"/>
                    </button>
                </div>
            </div>)
        })
        return (
            <div className="container-fluid">
                <div>
                    <div className="row dataGrid">
                        <div className="col-sm-4">
                            <h3>Schools </h3>
                            <div className="cardWidget">
                                <div className="cardBottom">
                                    <form onSubmit={this.submitSchool}>
                                        <div className="form-group addbox">
                                            <input type="text" value={this.state.school} className="form-control"
                                                   onChange={(e)=>this.setState({school: e.target.value})}
                                                   placeholder="Add School"/>
                                        </div>
                                        <button type="submit" id="addbutton" className="btn btn-default addbutton">
                                            Submit
                                        </button>
                                    </form>
                                    {this.props.schools.length > 0 ? schoolsList : "No Schools Added"}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <h3>Subjects </h3>
                            <div className="cardWidget">
                                <div className="cardBottom">
                                    <form onSubmit={this.submitSubject}>
                                        <div className="form-group addbox">
                                            <input type="text" className="form-control" value={this.state.subject}
                                                   onChange={(e)=>this.setState({subject: e.target.value})}
                                                   placeholder="Add Subject"/>
                                        </div>


                                        <button type="submit" id="addbutton" className="btn btn-default addbutton">
                                            Submit
                                        </button>

                                    </form>
                                    <ul className="list-group listData">
                                        {this.props.subjects.length > 0 ? subjectsList : "No Subjects Added"}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <h3>Standards </h3>
                            <div className="cardWidget">
                                <div className="cardBottom">

                                    <form onSubmit={this.submitStandard}>
                                        <div className="form-group addbox">
                                            <input type="Number" className="form-control" value={this.state.standard}
                                                   onChange={(e)=>this.setState({standard: e.target.value})}
                                                   placeholder="Add Standard"/>
                                        </div>


                                        <button type="submit" id="addbutton" className="btn btn-default addbutton">
                                            Submit
                                        </button>


                                    </form>
                                    <ul className="list-group listData">
                                        {this.props.standards.length > 0 ? standardsList : "No Standards Added"}
                                    </ul>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

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
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Data);