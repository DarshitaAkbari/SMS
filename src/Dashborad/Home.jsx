import React, { useEffect } from 'react'
import Card from './Card'
import Card2 from './Card2'
import '../Dashborad/home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
const Home = () => {
  // const token=localStorage.getItem("token")
  const [fees1,setfees1]=useState([])
  const navigate=useNavigate()
  const[cnt,setcnt]=useState([])
  const [data, setdata] = useState({
    email: "",
    password: ""
});
  function logout(e) {
    // e.preventDefault();
    // axios.post("http://192.168.1.40:8070/admin/login", {
    //     email: data.email,
    //     password: data.password
    // })
    //     .then(res => {
    //         console.log(res.data)
    //         localStorage.setItem("token", res.data.token);
    //         if (res.data.token) {
    //             window.location='/home'
    //         }
    //         else {
    //             window.location="/";
    //         }
    //     })
    e.preventDefault()
    localStorage.removeItem("token");
    navigate("/")
}
const fees = async () => {
  try {
    const res = await axios.get("http://192.168.1.40:8070/fees/view/countFeeData");
    // console.log(res.data.data[0].Name)
    console.log(res.data.data)
    setfees1(res.data.data)
  }
  catch (error) {
    console.log(error);
  }
};
const student = async () => {
  try {
    const res = await axios.get("http://192.168.1.40:8070/stud/countStud");
    // console.log(res.data.data[0].Name)
    console.log(res.data)
    setcnt(res.data.countData)
  }
  catch (error) {
    console.log(error);
  }
};
useEffect(()=>{
  fees();
  student();
})
  return (
    <>
          <div className='btnlog'>
            <button className='btn3 p-2 btn-primary' onClick={logout}>Logout</button>
          </div>
        <div className='container mx-0 py-0 my-0 px-0'>
        <div className='row'>
          <Card fee={fees1}
          stud={cnt}></Card>
        </div>
      </div>
    </>
  )    
}

export default Home
