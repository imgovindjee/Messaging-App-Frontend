import React, { useEffect, useState } from 'react'
import AdminLayOut from '../../AdminLayOut/AdminLayOut'
import Table from '../../Table/Table';
import { dashBoardData } from '../../../../common/ChatItemsContent/ChattemContent';
import { fileFormat, transformImage } from '../../../../library/Features/Features';
import moment from 'moment';
import { Avatar, Box, Skeleton, Stack } from '@mui/material';
import RenderAttachments from '../../../../common/RenderAttachments/RenderAttachments'
import axios from 'axios';


// constants...
const columns = [
    {
        field: "id",
        headerName: "ID",
        headerClassName: "table-header",
        width: 200,
    },
    {
        field: "attachments",
        headerName: "Attachments",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => {

            const { attachments } = params?.row;

            return (
                attachments.length > 0 ? (
                    attachments.map((a, index) => {
                        const url = a?.url
                        const file = fileFormat(url);

                        return (
                            <Box key={index}>
                                <a href={url} target='_blank' style={{ color: "black", display: "flex", alignContent: "center", justifyContent: "center", padding: "1rem" }} download>
                                    {RenderAttachments(file, url)}
                                </a>
                            </Box>
                        )
                        // return <Avatar alt={a?.name} src={a?.avatar} />
                    })
                ) : (
                    <span style={{ backgroundColor: "rgba(0,0,0,0.1)", padding: "0.6rem", borderRadius: "1rem" }}>
                        No Attachments
                    </span>
                )
            )

        }
    },
    {
        field: "content",
        headerName: "Content",
        headerClassName: "table-header",
        width: 400,
        renderCell: (params) => {

            const { content } = params?.row;
            return (
                content.length > 0 ? (
                    <Box>
                        {content}
                    </Box>
                ) : (
                    <span style={{ backgroundColor: "rgba(0,0,0,0.1)", padding: "0.7rem", borderRadius: "1rem" }}>
                        No Content / Messages
                    </span>
                )
            )
        },
    },
    {
        field: "sender",
        headerName: "Send By",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => {
            return (
                <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                    <Avatar alt={params?.row?.sender?.name} src={params?.row?.sender?.avatar} />
                    <span>
                        {params?.row?.sender?.name}
                    </span>
                </Stack>
            )
        }
    },
    {
        field: "chat",
        headerName: "Chat",
        headerClassName: "table-header",
        width: 220,
    },
    {
        field: "groupChat",
        headerName: "Group Chat",
        headerClassName: "table-header",
        width: 100,
    },
    {
        field: "createdAt",
        headerName: "Time",
        headerClassName: "table-header",
        width: 250,
    },
];



// Default Value of the Table-Feild Of COlumns
const defaultDataStaructure = [
    {
        _id: "",
        attachments: [],
        content: "",
        createdAt: "",
        chat: "",
        groupChat: "",
        sender: {
            _id: "",
            name: "",
            avatar: "",
        }
    }
]



const MessageManagement = () => {

    const [rows, setRows] = useState([]);

    // data to be render
    const [messages, setMessages] = useState(defaultDataStaructure)
    // console.log(messages)

    // loading amination effect
    const [isLoading, setIsLoading] = useState(true);


    // API DATA FETCHING
    useEffect(() => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/messages",
            { withCredentials: true }
        )
            .then(({ data }) => {
                // console.log(data);
                setMessages(data?.message_details)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error)
            })
    }, []);




    useEffect(() => {
        setRows(
            messages?.map((u) => ({
                ...u,
                id: u?._id,
                sender: {
                    name: u?.sender?.name,
                    avatar: transformImage(u?.sender?.avatar, 50),
                },
                createdAt: moment(u?.createdAt).format("MMMM Do YYYY, h:mm:ss a")
            }))
        )
    }, [messages])



    return (
        <AdminLayOut>
        {
        isLoading ? (
            <Skeleton height={"100vh"}/>
        ) : (
                <Table heading={"All Messsges"} rows={rows} columns={columns} rowHeight={200} />
            )
        }
            </AdminLayOut>
    )
}

export default MessageManagement
