import React, {Component} from "react";
import Axios from 'axios';
import '../stylesheets/RequestForm.css';


class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StaffID: null,
            StartDate: null,
            EndDate: null,
            Morning: 'off',
            Period1: 'off',
            Period2: 'off',
            Period3: 'off',
            Period4: 'off',
            Period5: 'off',
            LeaveType: null,
            Status: 'new',
            errors: {
                StaffID: '',
                StartDate: '',
                EndDate: '',
                Morning: '',
                Period1: '',
                Period2: '',
                Period3: '',
                Period4: '',
                Period5: '',
                LeaveType: '',
                Status: '',
            },
            valid: {
                StaffID: false,
                StartDate: false,
                EndDate: false,
                Morning: true,
                Period1: true,
                Period2: true,
                Period3: true,
                Period4: true,
                Period5: true,
                LeaveType: false,
                Status: true,
            },
            constraints: {
                PD: false,
            },
            formValid: false,
        };
    };



    handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        const errors =  this.state.errors;
        const valid = this.state.valid;
        const constraints = this.state.constraints;
        const today = new Date();
        const todayDateString = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        const todayDate = Date.parse(todayDateString);
        let startDate = '';
        let endDate = '';
        let dateDiff;

        switch (name) {
            case 'StaffID':
                if (value.length < 8) {
                    errors.StaffID = 'Error: Incorrect StaffID';
                    valid.StaffID = false;
                } else {
                    errors.StaffID = '';
                    valid.StaffID = true;
                }
                break;
            case 'StartDate':
                startDate = Date.parse(value);
                endDate = Date.parse(this.state.EndDate);
                if (startDate < todayDate) {
                    if (startDate > endDate) {
                        errors.StartDate = 'Error: Start Date < Today Date && Start Date > End Date';
                        valid.StartDate = false;
                    } else{
                        errors.StartDate = 'Error: Start Date < Today Date';
                        valid.StartDate = false;
                    }
                } else {
                    errors.StartDate = '';
                    valid.StartDate = true;
                }
                break;
            case 'EndDate':
                startDate = Date.parse(this.state.StartDate);
                endDate = Date.parse(value);
                if (endDate < startDate) {
                    errors.EndDate = 'Error: End Date < Start Date';
                    valid.EndDate = false;
                } else {
                    errors.EndDate = '';
                    valid.EndDate = true;
                }
                break;
            case 'Morning':
                errors.Morning = '';
                valid.Morning = true;
                break;
            case 'Period1':
                errors.Period1 = '';
                valid.Period1 = true;
                break;
            case 'Period2':
                errors.Period2 = '';
                valid.Period2 = true;
                break;
            case 'Period3':
                errors.Period3 = '';
                valid.Period3 = true;
                break;
            case 'Period4':
                errors.Period4 = '';
                valid.Period4 = true;
                break;
            case 'Period5':
                errors.Period5 = '';
                valid.Period5 = true;
                break;
            case 'LeaveType':
                if (value.length < 1) {
                    errors.LeaveType = 'Error: Leave Type = null';
                    valid.LeaveType = false;
                } else {
                    errors.LeaveType = '';
                    valid.LeaveType = true;
                }
                break;
            case 'Status':
                errors.Status = '';
                valid.Status = true;
                break;
            default:
                break;
        }

        if (this.state.LeaveType === 'PD') {
            dateDiff = (startDate - todayDate) / (24 * 3600 * 1000);
            switch (new Date(todayDate).getDay()) {
                case 1:
                    if (dateDiff < 5) {
                        errors.StartDate = 'Error: Must be apply 5 business days prior for Leave Type (PD)';
                        valid.StartDate = false;
                        constraints.PD = false;
                    }
                    else {
                        errors.StartDate = '';
                        valid.StartDate = true;
                        constraints.PD = true;
                    }
                    break;
                case 2 || 3 || 4 || 5 || 6:
                    if (dateDiff < 7) {
                        errors.StartDate = 'Error: Must be apply 5 business days prior for Leave Type (PD)';
                        valid.StartDate = false;
                        constraints.PD = false;
                    }
                    else {
                        errors.StartDate = '';
                        valid.StartDate = true;
                        constraints.PD = true;
                    }
                    break;
                case 7:
                    if (dateDiff < 6) {
                        errors.StartDate = 'Error: Must be apply 5 business days prior for Leave Type (PD)';
                        valid.StartDate = false;
                        constraints.PD = false;
                    }
                    else {
                        errors.StartDate = '';
                        valid.StartDate = true;
                        constraints.PD = true;
                    }
                    break;
                default:
                    break;
            }
        } else {
            constraints.PD = true;
        }

        this.setState({errors, [name]: value});

    };

        handleSubmit = (event) => {
            event.preventDefault();
            this.setState({
                formValid: this.state.valid.StaffID &&
                    this.state.valid.StartDate &&
                    this.state.valid.EndDate &&
                    this.state.valid.Morning &&
                    this.state.valid.Period1 &&
                    this.state.valid.Period2 &&
                    this.state.valid.Period3 &&
                    this.state.valid.Period4 &&
                    this.state.valid.Period5 &&
                    this.state.valid.LeaveType &&
                    this.state.valid.Status &&
                    this.state.constraints.PD
            })
            if(this.state.formValid === true) {
                Axios.post('http://localhost:3001/request', {
                    StaffID: this.state.StaffID,
                    StartDate: this.state.StartDate,
                    EndDate: this.state.EndDate,
                    Morning: this.state.Morning,
                    Period1: this.state.Period1,
                    Period2: this.state.Period2,
                    Period3: this.state.Period3,
                    Period4: this.state.Period4,
                    Period5: this.state.Period5,
                    LeaveType: this.state.LeaveType,
                    Status: this.state.Status,
                }).then(()=> {
                    alert("Status: Form is submitted. OK");
                });
            } else {
                if (this.state.valid.LeaveType === false) {
                    this.state.errors.LeaveType = "Error: Leave Type is required";
                } else {
                    alert("Error: Required fields are emptied or error");
                }
            }

        };


    render() {
        const {errors} = this.state;
        return (
            <div className={'wrapper'}>
                <div className={'form-wrapper'}>
                    <h2>Request Form</h2>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className='StaffID'>
                            <label htmlFor="StaffID">Staff ID</label>
                            <input type='text' name='StaffID' onChange={this.handleChange} />
                            {errors.StaffID.length > 0 && <span className='error'>{errors.StaffID}</span>}
                        </div>

                        <div className='StartDate'>
                            <label htmlFor="StartDate">Start Date</label>
                            <input type='date' name='StartDate' onChange={this.handleChange} />
                            {errors.StartDate.length > 0 && <span className='error'>{errors.StartDate}</span>}
                        </div>

                        <div className='EndDate'>
                            <label htmlFor="EndDate">End Date</label>
                            <input type='date' name='EndDate' onChange={this.handleChange} />
                            {errors.EndDate.length > 0 && <span className='error'>{errors.EndDate}</span>}
                        </div>


                        <div className='LeaveType'>
                            <label>Leave Type</label>
                            <select name="LeaveType"
                                    onChange={this.handleChange}
                            >
                                <option value="" selected disabled hidden>Select leave type</option>
                                <option value="PD">PD (approved)</option>
                                <option value="Excursion or Incursion">Excursion or Incursion</option>
                                <option value="Meeting">Meeting</option>
                                <option value="Sick or Medical leave">Sick or Medical leave</option>
                                <option value="Family carers leave">Family carers leave</option>
                                <option value="Short leave">Short leave</option>
                                <option value="LSL">LSL</option>
                                <option value="LWOP">LWOP</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.LeaveType.length > 0 && <span className='error'>{errors.LeaveType}</span>}
                        </div>


                        <label>Morning</label>
                        <input type="checkbox"
                               name="Morning"
                               onChange={this.handleChange}
                        />

                        <label>Period 1</label>
                        <input type="checkbox"
                               name="Period1"
                               onChange={this.handleChange}
                        />

                        <label>Period 2</label>
                        <input type="checkbox"
                               name="Period2"
                               onChange={this.handleChange}
                        />

                        <label>Period 3</label>
                        <input type="checkbox"
                               name="Period3"
                               onChange={this.handleChange}
                        />

                        <label>Period 4</label>
                        <input type="checkbox"
                               name="Period4"
                               onChange={this.handleChange}
                        />

                        <label>Period 5</label>
                        <input type="checkbox"
                               name="Period5"
                               onChange={this.handleChange}
                        />


                        <input type="submit" value="Send Request"/>
                    </form>
                </div>
            </div>
        )
    };
}

export default RequestForm;