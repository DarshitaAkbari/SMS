import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
// import Insert_Staff from '../form/Insert_Staff'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import '../Attndance/att.css'
import Modal from '@mui/material/Modal';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border:"none",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
const Staff = () => {
    const [search, setSearch] = useState("");
    const [c_data, setc_data] = useState([]);
    const [filterdata, setfilter] = useState([]);
    const [show,setshow] = useState(false);
    const [staffData,setStaffData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openupdate, setOpenupdate] = useState(false);
    const url="http://192.168.1.39:8070/staff/ragister"
    const [staffid,setstaffid]=useState("");
    const [data, setdata] = useState({
            Name:"",
            Email:"",
            Degree:"",
            Subject:"",
            Experience:"",
            Salary:"",
            Fresher:""
        });
                
    //tabledata......
    const getdata = async () => {
        try {
          const res = await axios.get("http://192.168.1.39:8070/staff/view?page=2&size=3");
          // console.log(res.data.data[0].Name)
          setc_data(res.data.data);
          setfilter(res.data.data);
        
          
        }
        catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getdata();
      }, []);
//insert............
function submit(e) {
    e.preventDefault();
    axios.post(url, data)
        .then(res => {
            console.log(res.data)
            //  
        })
}
function handle(e) {
    const newdata = { ...data }
    newdata[e.target.name] = e.target.value
    setdata(newdata)
    console.log(newdata)
}
//update........
const handleOpen = async(id) =>{
    console.log(id);
    setOpenupdate(true);
    try{
        const res = await axios.get(`http://192.168.1.39:8070/staff/viewById/${id}`);
        console.log(res.data.data)
        setdata(res.data.data)
        setstaffid(res.data.data._id);
        // alert(res.data._id)
    }
    catch(error){
        console.log("svjns",error)
    }
}
const updatestf=(e)=>{
    console.log(data);
    e.preventDefault();
    // console.log("----------");
        fetch(`http://192.168.1.39:8070/staff/edit/${staffid}`,{
        method:"PUT",
        headers:{
            'Accept':'application/json',
            'Content-type':"application/json"
        },
        body:JSON.stringify(data)
    }).then((rst)=>{
        rst.json().then((resp)=>{
            getdata();
        })
    })
}

//view................
const handleOpenUpdate =async (id)=>{
    setOpen(true);
   try{
   const res = await axios.get(`http://192.168.1.39:8070/staff/viewById/${id}`);
   console.log(res.data.data)
   setStaffData(res.data.data)
   }catch(error)
   {
     console.log(error);
   }
 } 
 const handleClose = () => setOpen(false);
 const handleCloseupdate = () => setOpenupdate(false);
//delete staff..........
function deletestaff(_id){
    fetch(`http://192.168.1.39:8070/staff/delete/${_id}`,{
      method:"DELETE"
    }).then((r)=>{
      r.json().then((resp)=>{
        console.log(resp); 
        getdata();
      })
    })
  }
    //datatable..............
    const columns =[
        {
          name : "Name",
          selector : (row) => row.Name,
          sort:true
        },
        {
          name : "Email",
          selector : (row) => row.Email
        },
        {
          name : "Degree",
          selector : (row) => row.Degree
        },
        {
          name : "Subject",
          selector : (row) => row.Subject
        },
        {
          name : "Salary",
          selector : (row) => row.Salary
        },
        {
          name : "Fresher",
          selector : (row) => row.Fresher
        },
       {
        name:"action",
        cell:(row) => <>
        
        
            {/* {/ <Link to={`${row._id}`}><EditIcon className="edit"/></Link> /} */}
            <EditIcon onClick={()=>handleOpen(row._id)}></EditIcon>
            <VisibilityIcon  onClick={() => handleOpenUpdate(row._id)} ></VisibilityIcon>
            <DeleteIcon onClick={()=>deletestaff(row._id)}></DeleteIcon>
        </>
      
      }
      ]
  return (
    <>
    {
          show ? <div className="box">
                        
                        <form method="" action="" name='test_form' onSubmit={(e)=>submit(e)}>
                            <label>Name<span>*</span></label>
                            <input type="text" name='Name'   value={data.Name} onChange={(e)=>handle(e)}></input>
                            <label>Email<span>*</span></label>
                            <input type="text" name='Email'  value={data.Email} onChange={(e)=>handle(e)} ></input>
                            <label>Degree<span>*</span></label>
                            <input type="text" name='Degree'  value={data.Degree} onChange={(e)=>handle(e)}  ></input>
                            <label>Subject<span>*</span></label>
                            <input type="text" name='Subject'   value={data.Subject} onChange={(e)=>handle(e)}  ></input>
                            <label>Experience<span>*</span></label>
                            <input type="text" name='Experience' value={data.Experience}  onChange={(e)=>handle(e)}  ></input>
                            <label>Salary<span>*</span></label>
                            <input type="text" name='Salary' value={data.Salary}  onChange={(e)=>handle(e)}  ></input>
                            <label>Fresher<span>*</span></label>
                            <select name="presant" value={data.Fresher} onChange={(e)=>handle(e)} >
                                <option value="0">0</option>
                                <option value="1">1</option>
                            </select>
                            <input type="submit" id="sub" class="btn-primary" value="SUBMIT"></input>
                         </form>      
                    </div> 
          : ""
        }
        <button onClick={()=>setshow(!show)} className="insert"> { show ? "X":"create Staff"}</button>
        {
            show?" ":<DataTable
          title="Staff list"
          columns={columns}
          data={filterdata}
          pagination
          fixedHeader
          fixedHeaderScrollHeight='550px'
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderAlign="left"
          subHeaderComponent={
            <input
              type="text"
              placeholder='search'
              className='w-25 form-control'
              value={search}
              onChange={(event) => setSearch(event.target.value)} />
          }
        />
        }
        <div>
        <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
        <div className="d-flex">
             <PersonIcon style={{"width":"100%", "height":"100px"}} />
        </div>
          <div className='d-flex view_staff'>
             <h6 >Name:</h6><p>{staffData.Name}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>Email:</h6><p>{staffData.Email}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>Degree:</h6><p>{staffData.Degree}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>Salary:</h6><p>{staffData.Salary}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>Subject:</h6><p>{staffData.Subject}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>Fresher:</h6><p>{staffData.Fresher}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>Experience:</h6><p>{staffData.Experience}</p>
          </div>
        </Box>
      </Modal>
    </div>
    <div>
        <Modal
        keepMounted
        open={openupdate}
        onClose={handleCloseupdate}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
                            <label>Name<span>*</span></label>
                            <input type="text" name='Name'   value={data.Name} onChange={(e)=>handle(e)}></input><br></br>
                            <label>Email<span>*</span></label>
                            <input type="text" name='Email'  value={data.Email} onChange={(e)=>handle(e)} ></input><br></br>
                            <label>Degree<span>*</span></label>
                            <input type="text" name='Degree'  value={data.Degree} onChange={(e)=>handle(e)}  ></input><br></br>
                            <label>Subject<span>*</span></label>
                            <input type="text" name='Subject'   value={data.Subject} onChange={(e)=>handle(e)}  ></input><br></br>
                            <label>Experience<span>*</span></label>
                            <input type="text" name='Experience' value={data.Experience}  onChange={(e)=>handle(e)}  ></input><br></br>
                            <label>Salary<span>*</span></label>
                            <input type="text" name='Salary' value={data.Salary}  onChange={(e)=>handle(e)}  ></input><br></br>
                            <label>Fresher<span>*</span></label>
                            <select name="presant" value={data.Fresher} onChange={(e)=>handle(e)} >
                                <option value="0">0</option>
                                <option value="1">1</option>
                            </select>
                            <input type="submit" id="sub" class="btn-primary" value="SUBMIT" onClick={(e)=>updatestf(e)}></input> 
        </Box>
      </Modal>
    </div>

</>)}
export default Staff
