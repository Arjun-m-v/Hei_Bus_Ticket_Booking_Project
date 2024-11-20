import './App.css';
import { Route,Routes } from 'react-router-dom';
import Landing from './components/files/Landing';
import Navbar from './components/files/Navbar';
import Register from './components/files/Register';
import Login from './components/files/Login';
import AdminLanding from './components/files/AdminLanding';
import AddBuses from './components/files/AddBuses';
import EditBuses from './components/files/EditBuses';
import Booking from './components/files/booking';
import Footer from './components/files/Footer';

function App() {
  return (
    <>
      <Routes>
        <Route path='landing/' element={<Landing/>}/>
        <Route path='/alanding' element={<AdminLanding/>}/>
        <Route path='/nav' element={<Navbar/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/add' element={<AddBuses/>}/>
        <Route path='/edit/:id' element={<EditBuses/>}/>
        <Route path='/footer' element={<Footer/>}/>
      </Routes>
    </>
  )
}

export default App;
