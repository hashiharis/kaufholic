
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BuyerSignIn } from './components/buyer/signin/BuyerSignIn'
import { BuyerSignUp } from './components/buyer/signup/BuyerSignUp'
import { SignIn } from './components/seller/signin/SignIn'
import { SignUp } from './components/seller/signup/SignUp'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { DealCard } from './components/cards/deal-cards/DealCard';
import CardLayout from './components/CardLayout';
import { DealCardWrapper } from './components/cards/deal-cards/DealCardWrapper';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<DealCardWrapper/>}/>
      <Route path='/seller/signup' element={<SignUp/>}/>
      <Route path='/seller/signin' element={<SignIn/>}/>
      <Route path='/buyer/signin'  element={<BuyerSignIn/>}/>
      <Route path='/buyer/signup' element={<BuyerSignUp/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App