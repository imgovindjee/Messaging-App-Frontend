import React, { memo } from 'react'

import moment from 'moment'

import { motion } from 'framer-motion'

import { Avatar, Box, Icon, Typography } from '@mui/material';

import { lightBlue } from '../../constants/colors';
import { fileFormat } from '../../library/Features/Features';
import RenderAttachments from '../../common/RenderAttachments/RenderAttachments';




const MessageComponent = ({ message, user }) => {

    // destructuring the data
    const { sender, sender: { _id: senderId }, content, attachments = [], createdAt } = message;

    // if login user has send the message
    const sameSender = sender?._id === user?._id;

    // to given the messages time of creation
    const messageCreationTimeAlgo = moment(createdAt).fromNow();


    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: "-100%" }}
                whileInView={{ opacity: 1, x: 0 }}
                style={{
                    alignSelf: sameSender ? "flex-end" : "flex-start",
                    color: "black",
                    backgroundColor: "wheat",
                    padding: "0.5rem",
                    width: "fit-content",
                    borderRadius: "10px"
                }}
            >
                {/* Who is sending an Message */}
                {
                    !sameSender ? (
                        <Typography color={lightBlue} fontWeight={"600"} variant='caption' display={"flex"} gap={"5px"} alignItems={"center"}>
                            <Avatar sx={{ height: "12px", width: "12px" }} />
                            {sender?.name}
                        </Typography>
                    ) : (
                        <Typography color={"gray"} fontWeight={"600"} variant='caption' display={"flex"} gap={"5px"} alignItems={"center"}>
                            <Avatar sx={{ height: "12px", width: "12px" }} />
                            You
                        </Typography>
                    )
                }


                {/* Text messages Disply */}
                {
                    content && (
                        <Typography>
                            {content}
                        </Typography>
                    )
                }


                {/* Attachments */}
                {
                    attachments?.length > 0 && (
                        attachments?.map((attachment, index) => {
                            const url = attachment?.url
                            const file = fileFormat(url) //type of the file

                            return (
                                <Box key={index}>
                                    <a href={url} target='_blank' style={{ color: "black" }} download>
                                        {RenderAttachments(file, url)}
                                    </a>
                                </Box>
                            )
                        })
                    )
                }




                {/* Created At of the Message */}
                {
                    <Typography variant='caption' color={"text.secondary"}>
                        {messageCreationTimeAlgo}
                    </Typography>
                }
            </motion.div>
        </>
    )
}

export default memo(MessageComponent)
