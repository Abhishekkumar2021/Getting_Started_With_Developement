import './App.css'
import {Routes, Route} from 'react-router'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Summary from './pages/Summary'
import AddExpense from './pages/AddExpense'
import EditExpense from './pages/EditExpense'

function App() {
  return (
    <div className='app'>
      {/* Define your routes here */}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/summary' element={<Summary />}/>
        <Route path='/add' element={<AddExpense />}/>
        <Route path='/edit/:id' element={<EditExpense />}/>
      </Routes>
    </div>
  )
}

export default App
