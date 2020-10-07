import React, {Component} from "react";
import Axios from 'axios';
import '../stylesheets/navbar.css';
import '../stylesheets/leave_form.css';

class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                StaffID: {
                    value: ''
                },
                StartDate: {
                    value: ''
                },
                EndDate: {
                    value:''
                },
                Reason: {
                    value: ''
                },
                Period: {
                    value: ''
                },
            }
        }
    };

    changeHandler = event => {
        const target = event.target.name;
        const value = event.target.value;

        this.setState({
            [target]: value
        });
    };


    onSubmit = () => {
        Axios.post('http://localhost:3001/request', {
            StaffID: this.state.StaffID,
            StartDate: this.state.StartDate,
            EndDate: this.state.EndDate,
            Reason: this.state.Reason,
            Period: this.state.Period,
        }).then(()=> {
            alert("Request sent");
        });
    };


    render() {
        return (

            <form>

                <label>Staff ID</label>
                <input type="text"
                       name="StaffID"
                       onChange={this.changeHandler}
                />

                <label>Start Date</label>
                <input type="date"
                       name="StartDate"
                       onChange={this.changeHandler}
                />

                <label>End Date</label>
                <input type="date"
                       name="EndDate"
                       onChange={this.changeHandler}
                />

                <label>Reason</label>
                <select name="Reason"
                       onChange={this.changeHandler}
                >
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

                <label>Period</label>
                <select name="Period"
                       onChange={this.changeHandler}
                >
                    <option value="All day">All day</option>
                    <option value="Period 1">Period 1</option>
                    <option value="Period 2">Period 2</option>
                    <option value="Period 3">Period 3</option>
                    <option value="Period 4">Period 4</option>
                    <option value="Period 5">Period 5</option>
                </select>

                <button type="button" onClick={this.onSubmit}>Send Request</button>
            </form>
        )
    };
}

export default RequestForm;