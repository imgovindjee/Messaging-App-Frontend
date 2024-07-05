import React from 'react'

import { Stack } from '@mui/material'

import ChatItems from '../ChatItems/ChatItems'




const ChatList = ({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [
        {
            chatId: "",
            count: 0,
        },
    ],
    handleDeleteChat,
}) => {
    return (
        <Stack
            width={w}
            direction={"column"}
            overflow={"auto"}
            height={"100%"}
        >
            {
                chats?.map((data, index) => {
                    // console.log(data)

                    // data-chats destructure..
                    const { avatar, name, _id, groupChat, members } = data;

                    // const _avatar = avatar.map((a)=>a)

                    // is this ia alert for the nus message recived
                    const newMessageAlert = newMessagesAlert.find(
                        ({ chatId }) => chatId === _id
                    )

                    // is user is online
                    const isOnline = members?.some((mem) => onlineUsers.includes(mem));
            


                    return (
                        <ChatItems
                            key={_id}
                            newMessageAlert={newMessageAlert}
                            isOnline={isOnline}
                            _id={_id}
                            name={name}
                            avatar={avatar}
                            groupChat={groupChat}
                            sameSender={chatId === _id}
                            index={index}
                            handleDeleteChat={handleDeleteChat}
                        />
                    )
                })
            }
        </Stack>
    )
}

export default ChatList
