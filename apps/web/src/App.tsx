import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import GreetingPage from './pages/greeting-page'
import LoginLayout from './layout/login-layout'
import SignUp from './pages/sign-up'
import SignIn from './pages/sign-in'
import ProtectedLayout from './layout/protected-layout'
import Layout from './layout/layout'
import NotFound from './pages/not-found'
import Home from './pages/home'
import Messages from './pages/messages'
import MessageGroups from './pages/messages-groups'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        {/*unprotected routes greeting, login and register routes */}
        <Route element={<LoginLayout />}>
          <Route path='/' element={<GreetingPage/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/message-groups' element={<MessageGroups />} />
        </Route>
      </Route>
      
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
