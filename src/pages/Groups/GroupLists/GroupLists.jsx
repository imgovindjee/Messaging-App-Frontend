import React from 'react'

import { Stack, Typography } from '@mui/material'

import GroupChatList from '../GroupChatList/GroupChatList'




const _chatId = "asdf";


const GroupLists = ({ w = "100%", myGroups = [], chatId }) => {
    return (
        <Stack
            width={w}
            sx={{
                bgcolor: "rgba(0,0,0,0.05)",
                height: "100vh",
                p:"0"
            }}
        >
            {
                myGroups?.length > 0 ? (
                    myGroups?.map((group, index) => {
                        return (
                            <GroupChatList key={index} group={group} chatId={chatId} />
                        )
                    })
                ) : (
                    <Typography textAlign={"center"} padding={"0.5rem"} bgcolor={"rgba(0,0,0,0.1)"}>
                        No Groups Joined
                    </Typography>
                )
            }
        </Stack>
    )
}

export default GroupLists