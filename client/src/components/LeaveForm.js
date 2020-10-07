import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import '../stylesheets/navbar.css';
import '../stylesheets/leave_form.css';
function LeaveForm() {

    const [StaffID, setStaffID] = useState('');
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [Reason, setReason] = useState('');
    const [Period, setPeriod] = useState('');


    useEffect(() => {
        Axios.get('http://localhost:3001/view').then((response)=> {
            setLeaveView(response.data);
        });
    }, []);

    const sendRequest = () => {
        Axios.post('http://localhost:3001/request', {StaffID: StaffID, StartDate: StartDate, EndDate: EndDate, Reason: Reason, Period: Period,
        }).then(()=> {
            alert("Request sent");
        });
    };

    return (
        <div className="LeaveForm">
            <div className={"navbar"}>
                <a href="">Home</a>
                <a href="http://localhost:3000">Leave form</a>
                <a href="">Page 2</a>
                <a href="http://localhost:3001/view">Check raw inputs</a>
            </div>

            <div className={"form"}>
                <h1>Leave Form</h1>

                <label htmlFor="StaffID">Staff ID</label>
                <input type="text" id="StaffID" name="StaffID" placeholder="Staff ID" required onChange={(e) => {setStaffID(e.target.value)}} />

                <label htmlFor="StartDate">Start date</label>
                <input type="date" id="StartDate" name="StartDate" placeholder="Start Date" required onChange={(e) => {setStartDate(e.target.value)}} />

                <label htmlFor="EndDate">End date</label>
                <input type="date" id="EndDate" name="EndDate" placeholder="End Date" required onChange={(e) => {setEndDate(e.target.value)}} />

                <label htmlFor="Reason">Select reason</label>
                <select id="Reason" name="Reason" required onChange={(e) => {setReason(e.target.value)}} >
                    <option value="" selected disabled>Select a reason</option>
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

                <label htmlFor="Period">Select period</label>
                <select id="Period" name="Period" required onChange={(e) => {setPeriod(e.target.value)}} >
                    <option value="" selected disabled>Select a period</option>
                    <option value="All day">All day</option>
                    <option value="Period 1">Period 1</option>
                    <option value="Period 2">Period 2</option>
                    <option value="Period 3">Period 3</option>
                    <option value="Period 4">Period 4</option>
                    <option value="Period 5">Period 5</option>
                </select>
                <button type="submit" onClick={sendRequest}>Send Request</button>
            </div>
        </div>
    );
}

export default LeaveForm;