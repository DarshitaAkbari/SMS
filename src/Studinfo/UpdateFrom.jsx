import React from 'react'
import { useState,useEffect } from 'react'
import './stud.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './Val.js'
import axios from 'axios'
const UpdateFrom = () => {
    const url = "http://192.168.1.3:8070/stud/ragister";
    const [data, setdata] = useState({
        name: "",
        fatherName:"",
        motherName: "",
        F_occupation: "",
        M_occupation: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        gender: "",
        RollNo:"",
        Class:""

    });
    console.log(data)
    function submit(e) {
        e.preventDefault();
        axios.post(url, data)
            .then(res => {
                console.log(res.data)
                //  
            })

    }
    function handel(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value
        setdata(newdata)
        console.log(newdata)
    }
    useEffect(() => {
        
    }, [data]);
  return (
    <>
        <div className='stud'>
            <div className='frmtit'>
                <h1>Student Information</h1>
            </div>
            <div className='fr'>
                <div className='container' >
                    <div className='row'>
                        <form name='frm' onSubmit={(e)=>submit(e)}>
                            <label>Student Name:</label>
                            <input  type="text" placeholder='Enter Student Name' name='name' value={data.name} onChange={(e) => handel(e)}></input>
                            <label>Father Name:</label>
                            <input type="text" placeholder='Enter Father Name' id='fname' name='fatherName' value={data.fatherName} onChange={(e) => handel(e)}></input>
                            <label>Mother Name:</label>
                            <input type="text" placeholder='Enter Mother Name' id='mname' name='motherName' value={data.motherName} onChange={(e) => handel(e)}></input>
                            <label>Father Occupation:</label>
                            <input type="text" placeholder='Enter Father Occupation' id='focc' name='F_occupation' value={data.F_occupation} onChange={(e) => handel(e)}></input>
                            <label>Mother Occupation</label>
                            <input type="text" placeholder='Enter Mother Occupation' id='mooc' name='M_occupation' value={data.M_occupation} onChange={(e) => handel(e)}></input>
                            <label>Email:</label>
                            <input type="email" placeholder='Enter Email' id='email' name='email' value={data.email} onChange={(e) => handel(e)}></input>
                            <label>Mobile No:</label>                   
                            <input type="number" placeholder='Enter Mobile Number' id='phno' name='phone' value={data.phone} onChange={(e) => handel(e)}></input>
                            <label>Fees:</label>
                            {/* <input type="number" placeholder='Enter Fees' id='fees' name='fees'></input> */}
                            {/* <Switch  className='swt' onClick={tgl}/> */}
                            <label>Address:</label>
                            <textarea cols="50" rows="4"  name="address" value={data.address} onChange={(e) => handel(e)}></textarea>
                            <label>City:</label>
                            <input type="text" placeholder='Enter Your City' id='city' name='city' value={data.city} onChange={(e) => handel(e)}></input>
                            <label>Gender:</label>
                            <select name="gender" onChange={(e)=>handel(e)}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <label>Roll No:</label>
                            <input type="text" placeholder='Enter Your Roll No' id='rno' name='RollNo' value={data.RollNo} onChange={(e) => handel(e)}></input>
                            <label>Class:</label>
                            <input type="text" placeholder='Enter Your Class' id='class' name='Class' value={data.Class} onChange={(e) => handel(e)}></input>
                            <input type="submit" id="sub" class="btn-primary" value="SUBMIT"></input>
                        </form>

                    </div>
                </div>                
            </div>
        </div>
    </>
  )
}

export default UpdateFrom
