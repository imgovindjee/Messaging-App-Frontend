import React, { memo } from 'react'

import { Avatar, Button, ListItem, Stack, Typography } from '@mui/material'






const NotificationsItems = ({ sender, _id, handler }) => {

    // destructuring the data
    const { name, avatar } = sender;

    
    return (
        <ListItem sx={{ borderBottom: "0.5px solid rgba(0,0,0,0.1)" }}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>

                {/* USER PROFILE IMAGE */}
                <Avatar src={avatar}/>

                <Typography
                    variant='body1'
                    sx={{
                        flexGrow: 1,
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-box",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {name} send a friend Request
                </Typography>


                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                >
                    <Button onClick={() => handler({ _id, accept: true })}>
                        Accept
                    </Button>
                    <Button color='error' onClick={() => handler({ _id, accept: false })}>
                        Reject
                    </Button>
                </Stack>


            </Stack>
        </ListItem>
    )
}

export default memo(NotificationsItems)
