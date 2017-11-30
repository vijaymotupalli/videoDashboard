import React from "react";
import {connect} from "react-redux";
import './styles.css';
import  moment from 'moment'

class CodeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codes:props.selectedCodeGroup ? props.selectedCodeGroup.codes : []
        };

    }
    componentWillReceiveProps(nextProps){
        this.setState ({
            codes: nextProps.selectedCodeGroup ? nextProps.selectedCodeGroup.codes :[],
        });
    }

    render() {

        return (
            <div>
                <div className="container">
                    <div className="modal fade" id="codeDetails" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button"  className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Codes Details</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {this.state.codes.length > 0 ? this.state.codes.map((code) => {
                                                return (
                                                    <div className="col-md-3" key={code.code}>
                                                        <div  className={code.usedBy ? "displayUsedCode" :"displayNotUsedCode"}>
                                                            <div className="row">
                                                                <div className="col-md-8 "><strong>Code : </strong>{code.code}</div>
                                                                <div className="col-md-4 createdAt">{moment(code.createdAt).format('DD-MM-YYYY')}</div>
                                                            </div>
                                                            {code.usedBy && code.usedOn && <div className="row">
                                                                <div className="col-md-8 "><strong>Used By : </strong>{code.usedBy ? code.usedBy :"Not Found"}</div>
                                                                <div className="col-md-4 createdAt">On : {code.usedOn ? moment(code.usedOn).format('DD-MM-YYYY') : "Not Found"}</div>
                                                            </div>}
                                                        </div>
                                                    </div>

                                                )
                                            }) : <h2 className="notFound">"No Codes found"</h2>}
                                        </div>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-md-12 text-center">
                                            <button type="button" className="btn blackButton"  style={{width:"100%"}}>Print</button>
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
       selectedCodeGroup:state.Codes.selectedCodeGroup,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(CodeDetails);
