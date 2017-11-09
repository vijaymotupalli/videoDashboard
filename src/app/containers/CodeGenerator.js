import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import {getCodes,postCodes,getStandards,setLoader} from "../actions/index";
import './styles.css';
import Select from 'react-select'
import 'style-loader!react-select/dist/react-select.css';
import  moment from 'moment'


import {connect} from "react-redux";

class CodeGenerator extends React.Component {
    constructor(props) {
        super(props)

        this.props.getCodes();
        this.props.getStandards();

        this.state = {
            paidStandards:"",
            numberOfCodes:""
        }

        this.handleStandardChange = this.handleStandardChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault();
        var paidStandards = this.state.paidStandards ?  this.state.paidStandards :""
        var numberOfCodes = this.state.numberOfCodes
        this.props.setLoader(true);
        this.props.postCodes({paidStandards,numberOfCodes}).then( (result)=> {
            this.props.setLoader(false)
        }, (error)=> {
            if(error)this.props.setLoader(false);
        })
    }

    handleStandardChange (value) {
        this.setState({ paidStandards :value });
    }

    render() {
        const { paidStandards } = this.state;
        var standards = this.props.standards.map((standard)=>{
            return {value:standard._id,label:standard.name}
        })


        return (
            <div >
                <div className="card">
                    <div className="row">
                        <div className="col-sm-4">
                            <Select
                                multi={false}
                                onChange={this.handleStandardChange}
                                options={standards}
                                placeholder="Select Standard(s)"
                                simpleValue
                                value={paidStandards}
                            />
                        </div>

                        <div className="col-sm-4">
                            <input type="Number" className="form-control" placeholder="Enter Number Of Codes To Generate" onChange={(e)=>this.setState({numberOfCodes:e.target.value})}/>
                        </div>

                        <div className="col-sm-4">
                            <button type="button" className="btn btn-default btn-sm btnDefault" onClick={this.onSubmit}>
                                <span className="glyphicon glyphicon-filter" /> Generate Codes
                            </button>
                        </div>
                    </div>

                </div>

                <div className="codesDisplay">
                    {this.props.codes.length > 0 ? this.props.codes.map((code)=> {
                        return (
                            <div className="displayCode" key={code._id}>
                                <div className="row">
                                    <div className="col-sm-8 "><strong>Code</strong>{code.code}</div>
                                    <div className="col-sm-4 createdAt">{moment(code.createdAt).format('DD-MM-YYYY')}</div>
                                </div>
                                {code.usedBy && code.usedOn && <div className="row">
                                    <div className="col-sm-8 "><strong>Used By:</strong>{code.usedBy ? code.usedBy :"Not Found"}</div>
                                    <div className="col-sm-4 createdAt">{code.usedOn ? moment(code.usedOn).format('DD-MM-YYYY') : "Not Found"}</div>
                                </div>}
                                <div className="row">
                                    <div className="col-sm-8"><strong>Standard:</strong>{code.paidStandards}</div>
                                </div>
                            </div>
                        )}) : <h2 className="notFound">"No Codes found"</h2>}
                </div>

            </div>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        codes: state.Codes.codes,
        standards: state.Data.standards
    }
};


const mapDispatchToProps = (dispatch)=> {

    return {
        getCodes: ()=> dispatch(getCodes()),
        getStandards: ()=> dispatch(getStandards()),
        postCodes: (codes)=> dispatch(postCodes(codes)),
        setLoader: (value)=> dispatch(setLoader(value)),

    };

}

export default connect(mapStateToProps, mapDispatchToProps)(CodeGenerator);


