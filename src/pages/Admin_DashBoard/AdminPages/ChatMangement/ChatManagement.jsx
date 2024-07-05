import React, { useEffect, useState } from 'react'

import axios from 'axios'

import AdminLayOut from '../../AdminLayOut/AdminLayOut'
import Table from '../../Table/Table'
import { Avatar, Skeleton, Stack } from '@mui/material';
import { dashBoardData } from '../../../../common/ChatItemsContent/ChattemContent';
import { transformImage } from '../../../../library/Features/Features';
import AvatarCard from '../../../../components/AvatarCard/AvatarCard';



// constants...
const columns = [
    {
        field: "id",
        headerName: "ID",
        headerClassName: "table-header",
        width: 200,
    },
    {
        field: "avatar",
        headerName: "Avatar",
        headerClassName: "table-header",
        width: 150,
        renderCell: (params) => {
            return (
                <AvatarCard avatar={params?.row?.avatar} />
            )
        }
    },
    {
        field: "name",
        headerName: "Name",
        headerClassName: "table-header",
        width: 200,
    },
    {
        field: "group",
        headerName: "Group Chat",
        headerClassName: "table-header",
        width: 150,
    },
    {
        field: "totalMembersCount",
        headerName: "Total Members",
        headerClassName: "table-header",
        width: 120,
    },
    {
        field: "members",
        headerName: "Members",
        headerClassName: "table-header",
        width: 300,
        renderCell: (params) => {
            return (
                // <AvatarCard max={100} avatar={params?.row?.members} />
                <AvatarCard max={100} avatar={params?.row?.members} />
            )
        }
    },
    {
        field: "totalMessagesCount",
        headerName: "Total Messages",
        headerClassName: "table-header",
        width: 120,
    },
    {
        field: "creator",
        headerName: "Created By",
        headerClassName: "table-header",
        width: 250,
        renderCell: (params) => {
            return (
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                    <Avatar alt={params?.row?.creator?.name} src={params?.row?.creator?.avatar} />
                    <span>
                        {params?.row?.creator?.name}
                    </span>
                </Stack>
            )
        }
    },
];



// Default Value of the Table-Feild Of COlumns
const defaultDataStaructure = [
    {
        _id: "",
        name: "",
        groupChat: "",
        membersAvatar: [],
        members: [
            {
                _id: "",
                avatar: "",
            }
        ],
        totalMembersCount: 0,
        totalMessagesCount: 0,
        creator: {
            name: "",
            avatar: "",
        }
    }
]





const ChatManagement = () => {


    const [rows, setRows] = useState([]);


    // data to be render
    const [chats, setChats] = useState(defaultDataStaructure)
    // console.log(chats)

    // loading amination effect
    const [isLoading, setIsLoading] = useState(true);


    // API DATA FETCHING
    useEffect(() => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/chats",
            { withCredentials: true }
        )
            .then(({ data }) => {
                // console.log(data);
                setChats(data?.chat_details)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error)
            })
    }, []);


    useEffect(() => {
        setRows(chats.map((u) => ({
            ...u,
            id: u?._id,
            group: u?.groupChat,
            avatar: u?.membersAvatar.map((a) => transformImage(a, 50)),
            members: u?.members.map((m) => transformImage(m?.avatar, 50)),
            creator: {
                name: u?.creator?.name,
                avatar: transformImage(u?.creator?.avatar, 50)
            }
        })))
    }, [chats]);


    return (
        <AdminLayOut>
            {
                isLoading ? (
                    <Skeleton height={"100vh"}/>
                ) : (
                    <Table heading={"All Chats"} rows={rows} columns={columns} />
                )
            }
        </AdminLayOut>
    )
}

export default ChatManagement
