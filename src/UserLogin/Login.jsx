import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../UserLogin/login.css'


const Login = () => {
    // const token=localStorage.getItem(res.data.token);
    const url = "http://192.168.1.40:8070/admin/login";
    const [data, setdata] = useState({
        email: "",
        password: ""

    });
    function submit(e) {
        e.preventDefault();
        axios.post(url, {
            email: data.email,
            password: data.password
        })
            .then(res => {
                console.log(res.data)
                localStorage.setItem("token", res.data.token);
                if (res.data.token) {
                    window.location='/home'
                }
                else {
                    window.location="/";
                }
            })

    }

    function handel(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setdata(newdata)
        console.log(newdata)
    }
    useEffect(() => {
        ;
    }, [data]);
    return (
        <>
            <div className='login'>
                <div className='log'>
                    <div className='logtit'>
                        <h1>Login Form</h1>
                    </div>
                    <div className='logform'>
                        <form onSubmit={(e) => submit(e)}>
                            <input onChange={(e) => handel(e)} id="email" value={data.email} type="email"  placeholder='Your Email Address' style={{ height: "35px", width: "300px" }}></input><br></br>
                            <input onChange={(e) => handel(e)} id="password" value={data.password} type="password" placeholder='Your password' style={{ height: "35px", width: "300px" }}></input><br></br>
                            <input type="checkbox" className='chk' style={{ height: "15px", width: "30px" }}></input><p>Agree with Terms & condition</p><br></br>
                            <button>Login</button><br></br>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
