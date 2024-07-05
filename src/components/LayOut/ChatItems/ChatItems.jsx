import React, { memo } from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { motion } from 'framer-motion'

import { Link } from '../../StyledComponents/StyeledComponents'
import AvatarCard from '../../AvatarCard/AvatarCard'




const ChatItems = ({
    name,
    _id,
    isOnline,
    newMessageAlert,
    index = 0,
    groupChat = false,
    sameSender,
    handleDeleteChat,
    avatar = [],
}) => {
    // console.log(avatar)
    return (

        <Link
            key={_id}
            sx={{ padding: "0" }}
            to={`/chat/${_id}`}
            onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
        >

            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={_id}
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    paddingLeft: "0.4rem",
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                    position: "relative",
                    backgroundColor: sameSender ? "black" : "unset",
                    color: sameSender ? "white" : "unset",
                }}
            >

                {/* Profie Image [Avatar Card] */}
                <AvatarCard avatar={avatar} />


                <Stack>
                    <Typography>
                        {name}
                    </Typography>

                    {
                        newMessageAlert && (
                            <Typography>
                                {newMessageAlert?.count} New Messages
                            </Typography>
                        )
                    }
                </Stack>


                {/* DO user is online OR not */}
                {
                    isOnline && (
                        <Box
                            sx={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                position: "absolute",
                                backgroundColor: "green",
                                top: "50%",
                                right: "1rem",
                                transform: "translateY(-50%)",
                            }}
                        />
                    )
                }


            </motion.div>

        </Link>

    )
}

export default memo(ChatItems)
