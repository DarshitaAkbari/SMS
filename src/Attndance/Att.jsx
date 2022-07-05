
import './att.css'
import { Switch } from '@mui/material'
// import Insert from "../form/Insert"

const Att = () => {
    const [show,setshow]=useState(false);
    // const url="http://192.168.1.30:8070/attendance/insert"
    const [ser,setSearch]=useState([]);
    const [filter,setfilter]=useState([]);
    const [togglee,settoggle] = useState(false);
    // const toggle =()=>{
    // togglee ? settoggle(false):settoggle(true)
    // alert(settoggle)
    // } 
    const [data, setdata] = useState({
                
    });
    const getdata = async () => {
        try {
          const res = await axios.get("http://192.168.1.30:8070/attendance/view");
          console.log(res.data.data)
          setdata(res.data.data);
        //   setfilter(res.data.data);
        }
        catch (error) {
          console.log(error);
        }
      };

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value
        setdata(newdata)
        console.log(newdata)
    }
    useEffect(() => {
        
    }, [data]);
//     function submit(e) {
//         e.preventDefault();
//         axios.post(url, data)
//             .then(res => {
//                 console.log(res.data)
//                 //  
//             })
// }
console.log(data)
const col=[
    {
        name:"SID",
        selector:(row)=>row.SID,
        sortable:true 
    },
    {
        name:"RollNo",
        selector:(row)=>row.Rollno,
        sortable:true 
    },
    {
        name:"Class",
        selector:(row)=>row.Class,
    },
    {
        name:"Date",
        selector:(row)=>(row.Attendance[0].date)
    },
    {
        name:"AB/PR",
        selector:(row)=>(row.Attendance[0].presant)

    }
]
useEffect(() => {
    getdata();
  }, []);

  return (
    <>  
        
        
            <DataTable 
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
            }>
                
            </DataTable>
        {/* } */}
    </>
  )
}

export default Att
