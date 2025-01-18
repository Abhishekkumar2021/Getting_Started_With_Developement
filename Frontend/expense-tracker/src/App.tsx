import './App.css'
import {Routes, Route} from 'react-router'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Summary from './pages/Summary'

function App() {
  return (
    <div className='app'>
      {/* Define your routes here */}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/summary' element={<Summary />}/>
      </Routes>
    </div>
  )
}

export default App
