import React, { useContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'
import Profile from './pages/ProfileUpdate/Profile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/Firebase'
import { Appcontext } from './context/App-contex'

const App = () => {

  const navigate = useNavigate();
  const { loaduserdata } = useContext(Appcontext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate('/chat')

        await loaduserdata(user.uid)

      }
      else {//if user is not avaialble then it navigate user on login page

        navigate('/')



      }

    })

  }, [])
  return (
    <>
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path='/' element={<Login></Login>} ></Route>

        <Route path='/chat' element={<Chat></Chat>}></Route>

        <Route path='/profile' element={<Profile></Profile>}></Route>


      </Routes>


    </>
  )
}

export default App
