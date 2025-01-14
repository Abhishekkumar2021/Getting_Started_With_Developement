import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import {Routes, Route} from "react-router"
import Signup from './components/Signup'
import NotFound from './components/NotFound'
import Home from './components/Home'

export default function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<h1>Dashboard</h1>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}
