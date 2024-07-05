import React, { Fragment, useRef, useState, useEffect, useCallback } from 'react'

import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';

import LayOut from '../../components/LayOut/LayOut'
import { InputBox } from '../../components/StyledComponents/StyeledComponents';
import FileMenu from '../../components/Dialogs/FileMenu';
import MessageComponent from '../../components/MessageComponents/MessageComponent';
import { sampleMessage } from '../../common/ChatItemsContent/ChattemContent';
import { grayColor } from '../../constants/colors';
import bg from '../../assets/Images/background1.jpg'
import { getSocket } from '../../socket/Socket';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, TYPING_END, TYPING_START } from '../../constants/events';
import { useChatDetailsQuery, useGetMessagesQuery } from '../../redux/APICalling/api';
import { useSocketEvents, useErrors } from '../../hooks/hooks';

import { useInfiniteScrollTop } from '6pp';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../../redux/Reducers/others';
import { removeNewMessagesAlert } from '../../redux/Reducers/Chat'
import TypingLoader from '../../components/LayOut/TypingLoader/TypingLoader';
import { useNavigate } from 'react-router-dom';


// const user = {
//     _id: "jhvsj",
//     name: "QWERTY",
// }


const Chat = ({ chatId, user }) => {

    // navigator hook
    const navigate = useNavigate()

    // hook
    // for changing the redux-store value
    const dispatch = useDispatch()

    // Hooks
    // for targeting the HTML content of the marked items..
    const containerRef = useRef(null);

    // Chat ending reference
    const buttomChatRef = useRef(null);

    // for setting up the messages
    const [message, setMessage] = useState("")

    // all messages for the particulars chats
    const [messages, setMessages] = useState([])

    // to get the old message in the chunks
    const [page, setPage] = useState(1)

    // setting the postion of the ATTACHMENT
    const [fileMenuAnchor, setFileMenuAnchor] = useState(null)

    // STATE to define the TYPING-WHOO-IS
    const [imtyping, setIMTyping] = useState(false)
    const [userTyping, setUserTyping] = useState(false)
    const typingTimeout = useRef(null) //refernece of the typing
    // console.log(userTyping);


    // API CALLING FOR GETTING ALL THE MESSAGES
    // Data Fetching
    const oldMessages = useGetMessagesQuery({ chatId, page })
    // console.log(oldMessages?.currentData)



    // PAGEinitation
    // INFINITE SCROLLING
    const { data: allOldMessages, setData: setAllOldMessages } = useInfiniteScrollTop(
        containerRef,
        oldMessages.currentData?.totalPages,
        page,
        setPage,
        oldMessages.currentData?.messages
    )
    // console.log(allOldMessages);




    // SOCKET CONNECT
    const socket = getSocket();

    // API CALLING
    const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
    // console.log(chatDetails.data);

    // accessing the members array
    const members = chatDetails?.data?.chat?.members

    // function to handle the send message
    const handleSendMessage = (e) => {
        e.preventDefault()

        // if no message is type then just return
        if (!message.trim()) {
            return;
        }

        // Sending the data VIA SOCKET in real time
        socket.emit(NEW_MESSAGE, { chatId, members, message });
        setMessage("");
    }

    // function to handle the send file open
    const handleOpenFileSend = (e) => {
        dispatch(setIsFileMenu(true));
        setFileMenuAnchor(e.currentTarget)
    }

    // function to handle the message-onChange
    const handleMessageOnChange = (e) => {
        setMessage(e.target.value)

        // showing the typing effect
        if (!imtyping) {
            socket.emit(TYPING_START, { members, chatId })
            setIMTyping(true)
        }

        // Before setting out the new timeOut..
        // clearing the prvious timeout
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }
        // after sometime of stop-user-typing
        typingTimeout.current = setTimeout(() => {
            socket.emit(TYPING_END, { members, chatId });
            setIMTyping(false)
        }, [1200]);
    }


    // resetting the data whenever new chat is opened
    useEffect(() => {
        socket.emit(CHAT_JOINED, { userId: user._id, members })
        dispatch(removeNewMessagesAlert(chatId));

        return () => {
            setMessages([])
            setMessage("")
            setAllOldMessages([])
            setPage(1)

            socket.emit(CHAT_LEAVED, { userId: user._id, members })
        }
    }, [chatId])


    useEffect(() => {
        if (buttomChatRef.current) {
            buttomChatRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages])


    useEffect(() => {
        if (chatDetails?.isError) {
            return navigate("/")
        }
    }, [chatDetails?.isError]);



    // Making the message in the DISPLAY 
    const newMessagesListener = useCallback((data) => {
        console.log(data);

        // if user-looged-in chatting to with "x"(say) and then 
        // "y" is also trying to send message then don't show that message of "y" in the "x" chats
        // console.log(chatId !== data?.chatId)
        if (chatId !== data?.chatId) {
            return;
        }
        setMessages((prev) => [...prev, data?.message])
    }, [chatId])


    // Showing the typing-start effect whenever someone is typing
    const typingStartListener = useCallback((data) => {
        // console.log(data)
        if (chatId !== data?.chatId) {
            return;
        }

        // console.log("typing:- ", data)
        setUserTyping(true);
    }, [chatId])

    // Showing the typing-end effect whenever someone is typing
    const typingEndListener = useCallback((data) => {
        // console.log(data)
        if (chatId !== data?.chatId) {
            return;
        }

        // console.log("typing-End:- ", data)
        setUserTyping(false)
    }, [chatId])

    // SHOWING THE ALERT WHN MESSAGE IS RECEIVED
    const alertListener = useCallback((data) => {
        console.log("alert:- ", data?.message)


        if (data?.chatId !== chatId) {
            return;
        }

        const messageForAlert = {
            content: data?.message,
            sender: {
                _id: "dkjhsjhs",
                name: 'Admin'
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        }
        setMessages((prevMsg) => [...prevMsg, messageForAlert])
    }, [chatId])


    // REAL TIME SENDING THE DATA FOMR THE USERS-IN THE APP
    const eventArr = {
        [ALERT]: alertListener,
        [NEW_MESSAGE]: newMessagesListener,
        [TYPING_START]: typingStartListener,
        [TYPING_END]: typingEndListener,
    }
    useSocketEvents(socket, eventArr);



    // if some ERROR OCCURS.. while retriving the old messages
    const errors = [
        { isError: chatDetails.isError, error: chatDetails.error },
        { isError: oldMessages.isError, error: oldMessages.error },
    ]
    useErrors(errors)



    // WHole some messages data
    const allMessages = [...allOldMessages, ...messages]
    // console.log(allMessages)





    return (

        chatDetails?.isLoading ? (
            <Skeleton />
        ) : (
            <Fragment>

                <Stack
                    ref={containerRef}
                    spacing={"1rem"}
                    padding={"1rem"}
                    boxSizing={"border-box"}
                    sx={{
                        overflowX: "hidden",
                        overflowY: "auto"
                    }}
                    height={"90%"}
                    bgcolor={grayColor}
                >
                    {/* Messages.. */}
                    {
                        allMessages.map((_message, index) => {
                            return (
                                <MessageComponent message={_message} key={index} user={user} />
                            )
                        })
                    }


                    {
                        userTyping && (
                            <TypingLoader />
                        )
                    }


                    {/* BOTTOM OF THE CHAT REFERENCE */}
                    <div ref={buttomChatRef} />
                </Stack>


                <form
                    style={{
                        height: "10%"
                    }}
                    onSubmit={handleSendMessage}
                >
                    <Stack
                        direction={"row"}
                        height={"100%"}
                        padding={"0.5rem"}
                        position={"relative"}
                        alignItems={"center"}
                    >
                        <IconButton
                            sx={{
                                position: "absolute",
                                rotate: "10deg",
                                left: "1.5rem"
                            }}
                            onClick={handleOpenFileSend}
                        >
                            <AttachFileIcon />
                        </IconButton>

                        <InputBox
                            placeholder='Type Message Here...'
                            value={message}
                            onChange={handleMessageOnChange}
                        />

                        <IconButton
                            type='submit'
                            sx={{
                                // bgcolor:"#ea7070",
                                color: "black",
                                marginLeft: '1rem',
                                padding: "0.5rem",
                                "&:hover": {
                                    bgcolor: "#e9e9e9"
                                },
                                rotate: "-10deg"
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Stack>

                </form>




                {/* file Menu */}
                <FileMenu anchorElement={fileMenuAnchor} chatId={chatId} />

            </Fragment>
        )

    )
}

export default LayOut()(Chat)
