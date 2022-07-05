import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import '../Studinfo/stud.css'
// import { BrowserRouter, Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import UpdateFrom from '../Studinfo/UpdateFrom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const Table = () => {
    // const url = "http://192.168.41.1:8070/stud/ragister";
    // const naviget=useNavigate();
    const [cont,setcont]=useState([]);
    const [ser,setSearch]=useState([]);
    const [filter,setfilter]=useState([]);
    const [studid,setsdtudid]=useState("");
    const [studview,setstudview]=useState([]);
    const [open, setOpen] = React.useState(false); 
    const [openview, setOpenview] = React.useState(false); 
    const [show,setshow]=useState(false);
    const url = "http://192.168.1.40:8070/stud/ragister";
        const [data, setdata] = useState({
            id:"",
            name: "",
            fatherName:"",
            motherName: "",
            F_occupation: "",
            M_occupation: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            gender: "male",
            Rollno:"",
            Class:""

        });
    //updet view
    const handleOpen = async(id) =>{
        console.log(id);
        setOpen(true);
        try{
            const res = await axios.get(`http://192.168.1.40:8070/stud/view/${id}`);
            console.log(res.data.data)
            setdata(res.data.data)
            setsdtudid(res.data.data._id);
            // alert(res.data._id)
        }
        catch(error){
            console.log("svjns",error)
        }
    }
    const handleClose = () => setOpen(false);
    //viewbyid
    const handleOpenview = async(id) =>{
        console.log(id);
        setOpenview(true);
        try{
            const res = await axios.get(`http://192.168.1.40:8070/stud/view/${id}`);
            console.log(res.data.data)
            setstudview(res.data.data)
            setsdtudid(res.data.data._id);
            // alert(res.data._id)
        }
        catch(error){
            console.log("svjns",error)
        }
    }
    const handleCloseview = () => setOpenview(false);
    function submit(e) {
        e.preventDefault();
        axios.post(url, data)
            .then(res => {
                console.log(res.data)
                //  
            })
}
//datainert
    function handel(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value
        setdata(newdata)
        console.log(newdata)
    }
    useEffect(() => {
        
    }, [data]);
//deleteuser
    function Deletuser(id){
        fetch(`http://192.168.1.40:8070/stud/view/delete/${id}`,{
            method:"DELETE"
        }).then((result)=>{
            console.log(result);
        })
    }
//update user
function updateuser(e){
    console.log(data);
    e.preventDefault();
    // console.log("----------");
        fetch(`http://192.168.1.40:8070/stud/view/edit/${studid}`,{
        method:"PUT",
        body:JSON.stringify(data)
    }).then((rst)=>{
        rst.json().then((resp)=>{
            getcont();
        })
    })
}
    //filter
    const getcont=async()=>{
        try{
            const res=await axios.get("http://192.168.1.40:8070/stud/view")
            console.log(res);
            setcont(res.data);
            setfilter(res.data);
        }
        catch{
            console.log("error....");
        }
    }
    const col=[
        {
            name:"Id",
            selector:(row)=>row.id,
            sortable:true 
        },
        {
            name:"Full Name",
            selector:(row)=>row.FullName,
            sortable:true 
        },
        {
            name:"Father Name",
            selector:(row)=>row.fatherName,
        },
        {
            name:"Mother Name",
            selector:(row)=>row.motherName
        },
        // {
        //     name:"Father Occuption",
        //     selector:(row)=>row.F_occupation
        // },
        // {
        //     name:"Mother Occuption ",
        //     selector:(row) =>row.M_occupation
        // },
        {
            name:"Email ",
            selector:(row) =>row.email
        },
        {
            name:"phone ",
            selector:(row) =>row.phone
        },
        {
            name:"Address ",
            selector:(row) =>row.address
        },
        {
            name:"City",
            selector:(row) =>row.city
        },
        {
            name:"Gender ",
            selector:(row) =>row.gender
        },
        {
            name:"RollNO ",
            selector:(row) =>row.Rollno
        },
        {
            name:"Class ",
            selector:(row) =>row.Class
        },
        {
            name:"action",
            cell:(row)=><>
                <DeleteIcon onClick={()=>Deletuser(row._id)}></DeleteIcon>
                <PreviewIcon onClick={()=>handleOpenview(row._id)}></PreviewIcon>
                <EditIcon onClick={()=>handleOpen(row._id)}></EditIcon>
            </>
        }

    ]
    useEffect(()=>{
        getcont();
    },[]);
    useEffect(()=>{
        const result=cont.filter(country=>{
            return country.email.toLowerCase().match(ser.toLowerCase());
        }); 
        setfilter(result);
    },[ser])
  return (
    <>
    {
        show?<div className='stud'>
            <div className='frmtit'>
                <h1>Student Information</h1>
            </div>
            <div className='fr'>
                <div className='container' >
                    <div className='row'>
                        <form name='frm' onSubmit={(e)=>submit(e)}>
                            <label>Student Name:</label>
                            <input  type="text" placeholder='Enter Student Name' name='FullName' value={data.FullName} onChange={(e) => handel(e)}></input>
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
                            <input type="text" placeholder='Enter Your Roll No' id='rno' name='Rollno' value={data.Rollno} onChange={(e) => handel(e)}></input>
                            <label>Class:</label>
                            <input type="text" placeholder='Enter Your Class' id='class' name='Class' value={data.Class} onChange={(e) => handel(e)}></input>
                            <input type="submit" id="sub" class="btn-primary" value="SUBMIT"></input>
                        </form>

                    </div>
                </div>                
            </div>
        </div> : " "
    } 
        <button  onClick={()=>setshow(!show)} className='b1 btn-info'>{show?"Back":"Create" }</button>
          {
            show ? " ":<DataTable 
            title="Countries details"
            columns={col} data={filter} 
            pagination 
            fixedHeader
            fixedHeaderScrollHeight='400px' 
            selectableRows 
            selectableRowsHighlight
            highlightOnHover
            // actions={<button className='btn-info'>insert </button>} 
            subHeader
            subHeaderAlign='left'
            subHeaderComponent={
            <input type="text" placeholder='Search here' className=' w-45 from-control' value={ser} onChange={(e)=>setSearch(e.target.value)}></input>
        }></DataTable>
          }
          
    <div>
      {/* <Button >Open modal</Button> */}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          {/* <form> */}
          <label style={{fontSize:"15px"}} >Full Name </label>
          <input type="text" style={{marginLeft:"5px",height:"25px"}}  name="FullName"  value={data.FullName} onChange={(e) => handel(e)}></input>
          <label style={{fontSize:"15px"}}>Father Name </label>
          <input type="text" style={{marginLeft:"5px",height:"25px"}} name="fatherName" value={data.fatherName} onChange={(e) => handel(e)}></input>
          <label style={{fontSize:"15px"}}>Mother Name </label>
          <input type="text" style={{marginLeft:"5px",height:"25px"}} name="motherName" value={data.motherName} onChange={(e) => handel(e)}></input>
          <label style={{fontSize:"15px"}}>F_occupation </label>
          <input type="text" style={{marginLeft:"5px",height:"25px"}} name="F_occupation" value={data.F_occupation} onChange={(e) => handel(e)}></input>
          <label style={{fontSize:"15px"}}>M_occupation</label>
          <input type="text" style={{marginLeft:"5px",height:"25px"}} name="M_occupation" value={data.M_occupation} onChange={(e) => handel(e)}></input>
          <label style={{fontSize:"15px"}}>Email</label>
          <input type="text" style={{marginLeft:"5px",height:"25px"}} name="email" value={data.email} onChange={(e) => handel(e)}></input><br></br>
          <label style={{fontSize:"15px"}}>Phone</label>
          <input type="text" style={{marginLeft:"10px",height:"25px"}} name="phone" value={data.phone} onChange={(e) => handel(e)}></input><br></br>
          <label style={{fontSize:"15px"}}>Address</label>
          <input type="text" style={{marginLeft:"10px",height:"25px"}} name="address" value={data.address} onChange={(e) => handel(e)}></input><br></br>
          <label style={{fontSize:"15px"}}>City</label>
          <input type="text" style={{marginLeft:"10px",height:"25px"}} name="city" value={data.city} onChange={(e) => handel(e)}></input><br></br>
          <label style={{fontSize:"15px"}}>RollNo</label>
          <input type="text" style={{marginLeft:"10px",height:"25px"}} name="RollNo" value={data.RollNo} onChange={(e) => handel(e)}></input><br></br>
          <label style={{fontSize:"15px"}}>Class</label>
          <input type="text" style={{marginLeft:"10px",height:"25px"}} name="Class" value={data.Class} onChange={(e) => handel(e)}></input><br></br>  
        <input type='submit' value="SAVE" className='btn-info' onClick={(e)=>updateuser(e)}></input>
          {/* </form> */}
        </Box>
      </Modal>
      <div>
        <Modal
        keepMounted
        open={openview}
        onClose={handleCloseview}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
        <div className="d-flex">
             <PersonIcon style={{"width":"100%", "height":"100px"}} />
        </div>
          <div className='d-flex view_staff'>
             <h6 >Name:</h6><p>{studview.FullName}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>fatherName:</h6><p>{studview.fatherName}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>motherName:</h6><p>{studview.motherName}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>F_occupation:</h6><p>{studview.F_occupation}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>M_occupation:</h6><p>{studview.M_occupation}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>Email:</h6><p>{studview.email}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>Phone:</h6><p>{studview.phone}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>Address:</h6><p>{studview.address}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>City:</h6><p>{studview.city}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>RollNO:</h6><p>{studview.RollNo}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>Class:</h6><p>{studview.Class}</p>
          </div>
        </Box>
      </Modal>
    </div>
    </div>
</>
  )
}

export default Table

  
