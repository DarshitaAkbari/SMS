import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
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

const Fees = () => {
    const [studid,setsdtudid]=useState("");
    const [open, setOpen] = React.useState(false);
    const [feesdata,setfeesdata]=useState([]);
    const [openupdate, setOpenupdate] = useState(false);
    const [data,setdata]=useState([
        {
            SID:"",
            Fees:"",
            AdminName:"",
            Installment:""
        }
    ])
    const [show,setshow]=useState(false);
    //view all record----
    const getdata = async () => {
        try {
          const res = await axios.get("http://192.168.1.40:8070/fees/viewAll");
          console.log("sdfghjkl;",res.data.data)
          setdata(res.data.data)
        }
        catch (error) {
          console.log(error);
        }
    }
    //insert record----
    function submit(e) {
        e.preventDefault();
        axios.post("http://192.168.1.40:8070/fees/insert", data)
            .then(res => {
                console.log("response::",res)
                setdata(res.data.data)
            })
            .catch((err) => {
                console.log("Error::",err);
            })  
}
function handle(e) {
    const newdata = { ...data }
    newdata[e.target.name] = e.target.value
    setdata(newdata)
    console.log(newdata)
}
//view------------- 
// update------
    const handleOpen = async(_id) =>{
        console.log(_id);
        setOpen(true);
        try{
            const res = await axios.get(`http://192.168.1.40:8070/fees/viewById/${_id}`);
            console.log(res.data.data)
            setdata(res.data.data)
            setsdtudid(res.data.data._id);
        }
        catch(error){
            console.log("svjns",error)
        }
    }
    const handleClose = () => setOpen(false);
//datatabel....
        const col=[
            {
                name:"SID",
                selector:(row)=>row.SID,
                sortable:true 
            },
            {
                name:"Fees",
                selector:(row)=>row.Fees,
                sortable:true 
            },
            {
                name:"AdminName",
                selector:(row)=>row.AdminName,
            },
            {
                name:"Date",
                selector:(row)=>row.Date
            },
            {
                name:"Installment",
                selector:(row)=>row.Installment
        
            },
            {
                name:"action",
                cell:(row)=><>
                    <EditIcon onClick={()=>handleOpen(row._id)}></EditIcon>
                    <DeleteIcon ></DeleteIcon>
                    </>
            }
        ]
        useEffect(() => {
            getdata();
          }, []);
  return (
    <>
    {
          show ? <div className="box">
                        <form method="" action="" name='test_form' onSubmit={(e)=>submit(e)}>
                            <label>SID<span>*</span></label>
                            <input type="text" name='SID' autoComplete='off'  onChange={(e)=>handle(e)} value={data.SID} ></input>
                            <label>Fees<span>*</span></label>
                            <input type="text" name='Fees' autoComplete='off' onChange={(e)=>handle(e)} value={data.Fees}></input>
                            <label>AdminName<span>*</span></label>
                            <input type="text" name='AdminName' autoComplete='off'  onChange={(e)=>handle(e)} value={data.AdminName} ></input>
                            <label>Installment<span>*</span></label>
                            <input type="text" name='Installment' autoComplete='off'  onChange={(e)=>handle(e)} value={data.Installment} ></input>
                            <input type="submit" id="sub" class="btn-primary" value="SUBMIT"></input>
                         </form>
                </div> 
          : ""
        }
        <button onClick={()=>setshow(!show)} className="insert"> { show ? "X":"create Staff"}</button>
        {
            show?" ":<DataTable 
                title="Countries details"
                columns={col} 
                data={data} 
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
                <input type="text" placeholder='Search here' className=' w-45 from-control'></input>
                }></DataTable>
        }
        <div>
        <Modal
        keepMounted
        open={open}
        // onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
        <div className="d-flex">
             <PersonIcon style={{"width":"100%", "height":"100px"}} />
        </div>
          <div className='d-flex view_staff'>
             <h6 >SID:</h6><p>{feesdata.SID}</p>
          </div>
          <div>
          <h6>Fees:</h6><p>{feesdata.Fees}</p>
          </div>
          <div className='d-flex view_staff'>
          <h6>AdminName:</h6><p>{feesdata.AdminName}</p>
          </div>
          <div className='d-flex view_staff'>
            <h6>Installment:</h6><p>{feesdata.Installment}</p>
          </div>
        </Box>
      </Modal>
    </div>
    <div>
        <Modal
        keepMounted
        open={openupdate}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
                <label>SID<span>*</span></label>
                <input type="text" name='SID' autoComplete='off'  onChange={(e)=>handle(e)} value={data.SID} ></input>
                <label>Fees<span>*</span></label>
                <input type="text" name='Fees' autoComplete='off' onChange={(e)=>handle(e)} value={data.Fees}></input>
                <label>AdminName<span>*</span></label>
                <input type="text" name='AdminName' autoComplete='off'  onChange={(e)=>handle(e)} value={data.AdminName} ></input>
                <label>Installment<span>*</span></label>
                <input type="text" name='Installment' autoComplete='off'  onChange={(e)=>handle(e)} value={data.Installment} ></input>
                <input type="submit" id="sub" class="btn-primary" value="SUBMIT"></input> 
        </Box>
      </Modal>
    </div>
    </>
  )
}
export default Fees
