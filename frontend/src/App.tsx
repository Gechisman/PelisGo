import {BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import ForgotPassword from './pages/ForgotPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<AuthLayout/>}>
            <Route index element={<LoginForm/>}/>
            <Route path='register' element={<RegisterForm/>}/>
            <Route path='forgot-password' element={<ForgotPassword/>}/>
            <Route path='confirm/:id' element={<ConfirmAccount/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
