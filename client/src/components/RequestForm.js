import React, {Component} from "react";
import Axios from 'axios';
import '../stylesheets/RequestForm.css';

class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StaffID: '',
            StartDate: '',
            EndDate: '',
            Morning: 'off',
            Period1: 'off',
            Period2: 'off',
            Period3: 'off',
            Period4: 'off',
            Period5: 'off',
            LeaveType: '',
            Status: 'new',
        }
    };

    changeHandler = (event) => {
        const target = event.target.name;
        const value = event.target.value;

        this.setState({
            [target]: value
        });
    };


    onSubmit = (event) => {
        event.preventDefault();
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
            alert("Request sent");
        });
    };


    render() {
        return (
            <form onSubmit={this.onSubmit}>

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

                <label>Leave Type</label>
                <select name="LeaveType"
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

                <label>Morning</label>
                <input type="checkbox"
                       name="Morning"
                       onChange={this.changeHandler}
                />

                <label>Period 1</label>
                <input type="checkbox"
                       name="Period1"
                       onChange={this.changeHandler}
                />

                <label>Period 2</label>
                <input type="checkbox"
                       name="Period2"
                       onChange={this.changeHandler}
                />

                <label>Period 3</label>
                <input type="checkbox"
                       name="Period3"
                       onChange={this.changeHandler}
                />

                <label>Period 4</label>
                <input type="checkbox"
                       name="Period4"
                       onChange={this.changeHandler}
                />

                <label>Period 5</label>
                <input type="checkbox"
                       name="Period5"
                       onChange={this.changeHandler}
                />


                <input type="submit" value="Send Request"/>
            </form>
        )
    };
}

export default RequestForm;