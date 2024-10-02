
import './App.css'
import { BSignIn } from './components/buyer/buyersignin/BSignIn'
import { SignIn } from './components/seller/signin/SignIn'
import { SignUp } from './components/seller/signup/SignUp'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/seller/signup' element={<SignUp/>}/>
      <Route path='/seller/signin' element={<SignIn/>}/>
      <Route path='/buyer/signin'  element={<BSignIn/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
