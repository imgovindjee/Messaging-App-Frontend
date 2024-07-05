import React, { Suspense, lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectRoutesDisplay from './Utils/ProtectRouteDisplay/ProtectRoutesDisplay'
import PageInitialLayOutLoader from './components/Loaders/PageInitialLoader/PageInitialLayOutLoader'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userExists, userNotExists } from './redux/Reducers/auth'
import toast, { Toaster } from 'react-hot-toast'
import { SocketProvider } from './socket/Socket'


// Pages....
const Home = lazy(() => import('./pages/Home/Home'))
const SignIn = lazy(() => import('./pages/SignIn/SignIn'))
const Groups = lazy(() => import('./pages/Groups/Groups'))
const Chat = lazy(() => import('./pages/Chat/Chat'))
const PageNotFound = lazy(() => import('./pages/404/PageNotFound'))


// Admin PAGES...
const AdminLogin = lazy(() => import("./pages/Admin_DashBoard/AdminLogin/AdminLogin"))
const AdminDashBoard = lazy(() => import('./pages/Admin_DashBoard/AdminDashBoard/AdminDashBoard'))
const ChatManagement = lazy(() => import("./pages/Admin_DashBoard/AdminPages/ChatMangement/ChatManagement"))
const UserManagement = lazy(() => import("./pages/Admin_DashBoard/AdminPages/UserManagement/UserManagement"))
const MessageManagement = lazy(() => import("./pages/Admin_DashBoard/AdminPages/MessageManagement/MessageManagement"))



// const user = true;





const App = () => {

  // getting the data form the store..
  const { user, isLoading } = useSelector(state => state.auth);

  // hooks for setting up the STORE-DATA
  const dispatch = useDispatch();


  // REAL TIME RENDERING OF THE USER DATA
  useEffect(() => {

    // API CALLING FOR GETTING THE USER LOGGED-IN DETAILS
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/user/getmyprofile",
      { withCredentials: true }
    )
      .then((res) => {
        // console.log(res);

        // storing the userInfo in the "redux-store"
        dispatch(userExists(res?.data?.userInfo))
      })
      .catch((error) => {
        // stroing the data of userIsNotAvailable for login in "redux-store"
        dispatch(userNotExists())
        toast.error(error?.respones?.data?.message || error?.respones?.data?._message || "Something fishy, Please try again")
      })
  }, [dispatch])








  return (
    <>
      {
        isLoading ? (
          <PageInitialLayOutLoader />
        ) : (
          <Suspense fallback={<PageInitialLayOutLoader />}>

            <Toaster />

            <Routes>

              {/* Routes to only display when user is logged in... */}
              <Route
                element={
                  <SocketProvider>
                    <ProtectRoutesDisplay user={user} />
                  </SocketProvider>
                }
              >
                <Route path="/" element={<Home />} />
                <Route path='/chat/:chatId' element={<Chat />} />
                <Route path='/groups' element={<Groups />} />
              </Route>


              <Route
                path="/signin"
                element={
                  <ProtectRoutesDisplay user={!user} redirect='/'>
                    <SignIn />
                  </ProtectRoutesDisplay>
                }
              />



              {/* ADMIN SECTION */}
              {/* PROTECTED */}
              <Route path='/admin' element={<AdminLogin />} />
              <Route path='/admin/dashboard' element={<AdminDashBoard />} />
              <Route path='/admin/user-management' element={<UserManagement />} />
              <Route path='/admin/chat-management' element={<ChatManagement />} />
              <Route path='/admin/message-management' element={<MessageManagement />} />
              <Route path='/admin/about-developer' element={<div>About Developer</div>} />


              <Route path='*' element={<PageNotFound />} />

            </Routes>


          </Suspense>
        )
      }
    </>
  )
}

export default App
