import './App.css';
import Login from './UserLogin/Login'
import Nav from './Sidebar/Nav'
import { Routes, Route ,Protected} from 'react-router-dom';
import Home from './Dashborad/Home'
import Table from './Tbl/Table'
import Stud from './Studinfo/Stud'
import Fees from './fees/Fees'
import Staff from './Staff/Staff.jsx'
import Studfees from './fees/Studfees'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import Staff from './Staff/Staff';
import Att1 from './Attndance/Att1'
import UpdateFrom from './Studinfo/UpdateFrom';
function App() {
  const token=localStorage.getItem("token");
  return (
    <>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route element={<Nav></Nav>}>
              <Route path='home' element={token ? <Home /> : <Login></Login>}></Route>
              <Route path='userpro' element={token ? <Table></Table>:<Login></Login>}>
                <Route path='stud' element={token ? <Stud></Stud> :<Login />}></Route>
              </Route>
              <Route path='table' element={token ? <Att1></Att1> : <Login />}>
              </Route>
              <Route path='stud' element={token ? <Staff></Staff>:<Login/>}></Route>
              <Route path='fees' element={token ? <Studfees></Studfees> : <Login />}></Route>
            </Route>
          </Routes>
    </>
  );
}

export default App;
