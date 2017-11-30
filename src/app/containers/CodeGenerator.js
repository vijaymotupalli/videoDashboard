import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import {getCodes,postCodes,getStandards,setLoader,getInstitutes,setSelectedCodeGroup} from "../actions/index";
import './styles.css';
import Select from 'react-select'
import 'style-loader!react-select/dist/react-select.css';
import  moment from 'moment'
import CodesDetails from './codesDetails'


import {connect} from "react-redux";

class CodeGenerator extends React.Component {
    constructor(props) {
        super(props)

        this.props.getCodes();
        this.props.getStandards();
        this.props.getInstitutes();

        this.state = {
            paidStandards:"",
            numberOfCodes:"",
            institute:""
        }

        this.handleStandardChange = this.handleStandardChange.bind(this)
        this.handleInstituteChange = this.handleInstituteChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault();
        var paidStandards = this.state.paidStandards ?  this.state.paidStandards :""
        var numberOfCodes = this.state.numberOfCodes
        var institute = this.state.institute
            this.props.setLoader(true);
            this.props.postCodes({paidStandards,numberOfCodes,institute}).then( (result)=> {
                this.props.setLoader(false)
            }, (error)=> {
                if(error)this.props.setLoader(false);
            })


    }

    handleStandardChange (value) {
        this.setState({ paidStandards :value });
    }
    handleInstituteChange (value) {
        this.setState({ institute :value });
    }

    render() {
        const { paidStandards,institute } = this.state;
        var standards = this.props.standards.map((standard)=>{
            return {value:standard._id,label:standard.name}
        })
        var institutes = this.props.institutes.map((institute)=>{
            return {value:institute._id,label:institute.name}
        })


        return (
            <div >
                <div className="card">
                    <div className="row">
                        <div className="col-sm-3">
                            <Select
                                multi={false}
                                onChange={this.handleStandardChange}
                                options={standards}
                                placeholder="Select Standard(s)"
                                simpleValue
                                value={paidStandards}
                            />
                        </div>
                        <div className="col-sm-3">
                            <Select
                                multi={false}
                                onChange={this.handleInstituteChange}
                                options={institutes}
                                placeholder="Select Institute"
                                simpleValue
                                value={institute}
                            />
                        </div>

                        <div className="col-sm-3">
                            <input type="Number" className="form-control" placeholder="Enter Number Of Codes To Generate" onChange={(e)=>this.setState({numberOfCodes:e.target.value})}/>
                        </div>

                        <div className="col-sm-3">
                            <button type="button" className="btn btn-default btn-sm btnDefault" onClick={this.onSubmit} disabled={!this.state.numberOfCodes}>
                                <span className="glyphicon glyphicon-filter" /> Generate Codes
                            </button>
                        </div>
                    </div>

                </div>
                <CodesDetails/>
                <div className="codesDisplay">
                    <div className="row">
                        {this.props.codes.length > 0 ? this.props.codes.map((code) => {
                            return (
                                <div key={code._id} className="col-md-2 codeDisplayNew" data-toggle="modal"
                                     data-target="#codeDetails" onClick={()=> {
                                    this.props.setSelectedCodeGroup(code)
                                }}>
                                    <h5>Paid Standard:{code.paidStandards}</h5>
                                    <h5>Institute:{code.institute ? code.institute : "Individual"}</h5>
                                    <h5>No. Codes:{ code.codes.length }</h5>
                                </div>)

                        }) : <h2 className="notFound">"No Codes found"</h2>}
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        codes: state.Codes.codes,
        standards: state.Data.standards,
        institutes:state.Data.institutes
    }
};


const mapDispatchToProps = (dispatch)=> {

    return {
        getCodes: ()=> dispatch(getCodes()),
        getStandards: ()=> dispatch(getStandards()),
        getInstitutes: ()=> dispatch(getInstitutes()),
        postCodes: (codes)=> dispatch(postCodes(codes)),
        setLoader: (value)=> dispatch(setLoader(value)),
        setSelectedCodeGroup: (codeGroup)=> dispatch(setSelectedCodeGroup(codeGroup)),

    };

}

export default connect(mapStateToProps, mapDispatchToProps)(CodeGenerator);


