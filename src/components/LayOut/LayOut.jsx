import React, { useState, useCallback, useEffect, useRef } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { Drawer, Grid, Skeleton } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'



import Header from './Header/Header'
import Title from '../../common/Title/Title'
import ChatList from './ChatList/ChatList'
import { chatsSample } from '../../common/ChatItemsContent/ChattemContent'
import Profile from '../Profile/Profile'
import DeleteChatMenuDialog from '../Dialogs/DeleteChatMenuDialog'


import { useMyChatsQuery } from '../../redux/APICalling/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDeleteMenu, setIsMobileMenu, setSelectedDeleteChat, setIsMoreOption } from '../../redux/Reducers/others'
import { increamentNotification, setNewMessagesAlert } from '../../redux/Reducers/Chat'


import { useErrors, useSocketEvents } from '../../hooks/hooks'
import { getSocket } from '../../socket/Socket'
import { NEW_MESSSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS, ONLINE_USERS } from '../../constants/events'
import { getOrSaveFromStorage } from '../../library/Features/Features'




const LayOut = () => (WrappedComponent) => {
    return (props) => {

        // hook-state
        // for SHOWING THE ONLINE_USERS
        const [onlineUser, setOnlineUser] = useState([]);

        // hooks for setting up the daat in redux-store
        const dispatch = useDispatch();

        // geting the id from the URL-LINK of the page
        const params = useParams()
        const chatId = params.chatId;
        // console.log(chatId)

        // navtiagtor hook for changing the page
        const navigate = useNavigate();

        // cretaing the reference for the chatID target
        const deleteMenuAnchor = useRef(null)


        // REDUX-STORE
        const { user } = useSelector((state) => state.auth);
        const { isMobileMenu, isMoreOptions } = useSelector((state) => state.others)

        const { newMessagesAlert } = useSelector((state) => state.chat)
        // console.log("newMessagesAlert:- ", newMessagesAlert)


        // Destructuring the data from the API-Store
        // console.log(useMyChatsQuery(""))
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("")
        // console.log(data)

        // RealTime Rendering of the data
        useEffect(() => {
            // if some error OCCURS WHILE FETCHING THE DATA
            if (isError) {
                // toast.error(error?.data?.message)
                console.log(error)
            }
        }, [isError, error]);
        // useErrors([{isError, error}])

        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSSAGE_ALERT, value: newMessagesAlert })
        }, [newMessagesAlert])


        // function to handle the delete chats...
        const handleDeleteChat = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true))
            dispatch(setSelectedDeleteChat({ chatId, groupChat }))
            deleteMenuAnchor.current = e.currentTarget
        }

        // function handle the CLOSE-MOBILE-MENU
        const handleMobileClose = () => dispatch(setIsMobileMenu(false));






        // SOCKET
        const socket = getSocket();
        // console.log(socket)
        // console.log("Socket:- ", socket.id);


        // function make the ALERT
        const newMessageAlertListener = useCallback((data) => {
            // console.log("New Message Alert:- " + data.chatId)

            // only showing the notification if we're not on thet chat
            if (chatId === data?.chatId) {
                return;
            }
            dispatch(setNewMessagesAlert(data));
        }, [chatId])

        // function to make the request alert
        const newMessageRequestAlertListener = useCallback(() => {
            dispatch(increamentNotification());
        }, [dispatch]);

        // function to handle the REAL-TIME UPDATING OF THE CHAT
        const refetchAlertListener = useCallback(() => {
            refetch()
            navigate("/")
        }, [refetch, navigate]);

        // function to make the ONLINE_USER alert
        const onlineUsersAlertListener = useCallback((data) => {
            console.log(data)
            setOnlineUser(data)
        }, [onlineUser]);

        const eventHandlers = {
            [NEW_MESSSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST]: newMessageRequestAlertListener,
            [REFETCH_CHATS]: refetchAlertListener,
            [ONLINE_USERS]: onlineUsersAlertListener
        };
        useSocketEvents(socket, eventHandlers);





        return (
            <>
                <Title />
                <Header />

                <Toaster />

                {/* Menu of mobile view */}
                {
                    isLoading ? (
                        <Skeleton />
                    ) : (
                        <Drawer open={isMobileMenu} onClose={handleMobileClose}>
                            <ChatList
                                w="70vw"
                                chats={data?.chats}
                                chatId={chatId}
                                onlineUsers={onlineUser}
                                handleDeleteChat={handleDeleteChat}
                                newMessagesAlert={newMessagesAlert}
                            />
                        </Drawer>
                    )
                }

                {/* USER PROFILE MOBILE VIEW */}
                {
                    isMoreOptions && (
                        <Drawer
                            open={isMoreOptions}
                            onClose={() => dispatch(setIsMoreOption(false))}
                            sx={{
                                display: {
                                    md: "none"
                                },
                            }}
                        >
                            <Profile user={user} drawer={true}/>
                        </Drawer>
                    )
                }

                {/* Delete Chat Menu DIALOG */}
                <DeleteChatMenuDialog dispatch={dispatch} deleteOptionAnchor={deleteMenuAnchor} />



                {/* BODY FOR BIGGER SCREEN */}
                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid
                        item
                        sm={4}
                        md={3}
                        sx={{
                            display: {
                                xs: "none",
                                sm: "block"
                            },
                        }}
                        height={"100%"}
                    >
                        {
                            isLoading ? (
                                <Skeleton />
                            ) : (
                                <ChatList
                                    chats={data?.chats}
                                    chatId={chatId}
                                    onlineUsers={onlineUser}
                                    handleDeleteChat={handleDeleteChat}
                                    newMessagesAlert={newMessagesAlert}
                                />
                            )
                        }
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={isMoreOptions ? 5 : 9}
                        lg={isMoreOptions ? 6 : 9}
                        height={"100%"}
                    >
                        <WrappedComponent {...props} chatId={chatId} user={user} />
                    </Grid>

                    {
                        isMoreOptions && (
                            <Grid
                                item
                                md={4}
                                lg={3}
                                sx={{
                                    display: { xs: "none", md: "block" },
                                    padding: "2rem",
                                    bgcolor: "rgba(0,0,0,0.7)",
                                }}
                                height={"100%"}
                            >
                                <Profile user={user} />
                            </Grid>
                        )
                    }
                </Grid>

            </>
        )
    }
}

export default LayOut
