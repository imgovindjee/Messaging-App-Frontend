import React, { useEffect, useState } from 'react'

import axios from 'axios'

import AdminLayOut from '../../AdminLayOut/AdminLayOut'
import Table from '../../Table/Table'
import { Avatar, Skeleton } from '@mui/material';
import { dashBoardData } from '../../../../common/ChatItemsContent/ChattemContent';
import { transformImage } from '../../../../library/Features/Features';

import toast, { Toaster } from 'react-hot-toast'
import moment from 'moment';


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
            return <Avatar alt={params.row.name} src={params.row.avatar} />
        }
    },
    {
        field: "name",
        headerName: "Name",
        headerClassName: "table-header",
        width: 200,
    },
    {
        field: "username",
        headerName: "Username",
        headerClassName: "table-header",
        width: 200,
    },
    {
        field: "friends",
        headerName: "Friends",
        headerClassName: "table-header",
        width: 150,
    },
    {
        field: "groups",
        headerName: "Groups",
        headerClassName: "table-header",
        width: 200,
    },
    {
        field: "joinedAt",
        headerName: "Joined At",
        headerClassName: "table-header",
        width: 200,
    },
];


// Default Value of the Table-Feild Of COlumns
const defaultDataStaructure = [
    {
        _id: "",
        name: "",
        email: "",
        username: "",
        avatar: "",
        groupCount: 0,
        friendsCount: 0,
        createdAt: "",
    }
]



const UserManagement = () => {

    // making the dtaa for the CHART.JS
    const [rows, setRows] = useState([]);

    // data to be render
    const [users, setUsers] = useState(defaultDataStaructure)
    // console.log(users)

    // loading amination effect
    const [isLoading, setIsLoading] = useState(true);


    // API DATA FETCHING
    useEffect(() => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/users",
            { withCredentials: true }
        )
            .then(({ data }) => {
                // console.log(data);
                setUsers(data?.user_info)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error)
            })
    }, []);


    useEffect(() => {
        setRows(users.map((u) => ({
            ...u,
            id: u?._id,
            avatar: transformImage(u?.avatar, 50),
            groups: u?.groupCount,
            friends: u?.friendsCount,
            joinedAt: moment(u?.createdAt).format("MMMM Do YYYY, h:mm:ss a")
        })))
    }, [users]);


    return (
        <AdminLayOut>
            <Toaster />
            {
                isLoading ? (
                    <Skeleton height={"100vh"}/>
                ) : (
                    <Table heading={"All Users"} rows={rows} columns={columns} />
                )
            }
        </AdminLayOut>

    )
}

export default UserManagement
