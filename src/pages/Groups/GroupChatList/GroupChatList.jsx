import React, { memo } from 'react'

import { Stack, Typography } from '@mui/material'

import { Link } from '../../../components/StyledComponents/StyeledComponents'
import AvatarCard from '../../../components/AvatarCard/AvatarCard'




const GroupChatList = ({ group, chatId }) => {

    // destructuring the data
    const { name, avatar, _id } = group

    return (
        <>
            <Link to={`?group=${_id}`}>

                <Stack
                    onClick={(e) => {
                        if (chatId == _id) e.preventDefault();
                    }}
                    direction={"row"}
                    spacing={"1rem"}
                    p={"0"}
                    alignItems={"center"}
                    // bgcolor={"red"}
                    // sx={{ "&:hover":{bgcolor:"rgba(0,0,0,0.04)"}}}
                >
                    <AvatarCard avatar={avatar} />
                    <Typography>
                        {name}
                    </Typography>
                </Stack>

            </Link>
        </>
    )
}

export default memo(GroupChatList)
