import './App.css';
import { Route,Routes } from 'react-router-dom';
import Landing from './components/files/Landing';
import Navbar from './components/files/Navbar';
import Register from './components/files/Register';
import Login from './components/files/Login';
import AdminLanding from './components/files/AdminLanding';
import AddBuses from './components/files/AddBuses';
import EditBuses from './components/files/EditBuses';
import Footer from './components/files/Footer';
import AdminNavbar from './components/files/AdminNavbar';
import Payment from './components/files/Payment';
import Booking from './components/files/Booking';
import AddSeats from './components/files/AddSeats';
import Map from './components/files/Map';
import Loading from './components/files/Loading';


function App() {
  return (
    <>
      <Routes>
        <Route path='landing/' element={<Landing/>}/>
        <Route path='/alanding' element={<AdminLanding/>}/>
        <Route path='/nav' element={<Navbar/>}/>
        <Route path='/anav' element={<AdminNavbar/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/add' element={<AddBuses/>}/>
        <Route path='/edit/:id' element={<EditBuses/>}/>
        <Route path='/footer' element={<Footer/>}/>
        <Route path='/booking/:id' element={<Booking/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/addseats/:id' element={<AddSeats/>}/>
        <Route path='/map' element={<Map/>}/>
        <Route path='/loading' element={<Loading/>}/>
      </Routes>
    </>
  )
}

export default App;
