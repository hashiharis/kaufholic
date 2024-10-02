
import './App.css'
import { BSignIn } from './components/buyer/buyersignin/BSignIn'
import { BSignup } from './components/buyer/buyersignup/BSignUp'
import { Navbar } from './components/navbar/Navbar'
import { SignIn } from './components/seller/signin/SignIn'
import { SignUp } from './components/seller/signup/SignUp'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navbar/>}/>
      <Route path='/seller/signup' element={<SignUp/>}/>
      <Route path='/seller/signin' element={<SignIn/>}/>
      <Route path='/buyer/signin'  element={<BSignIn/>}/>
      <Route path='/buyer/signup' element={<BSignup/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
