import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import FirstPage from './Components/FirstPage'
import SecondPage from './Components/SecondPage/SecondPage'

function App() {

  return (
    <BrowserRouter>
        <Routes>
        <Route exact path='/' element={<FirstPage/>}/>
        <Route exact path='/second' element={<SecondPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
