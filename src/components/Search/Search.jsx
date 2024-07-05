import React, { useEffect, useState } from 'react'

import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

import { useInputValidation } from '6pp'

import SearchItems from './SearchItems/SearchItems'
import { sampleUsers } from '../../common/ChatItemsContent/ChattemContent'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSearch } from '../../redux/Reducers/others'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/APICalling/api'
import toast from 'react-hot-toast'
import { useAsyncMutation } from '../../hooks/hooks'




// Random Trial users
// const users = ["1", "2", '3', "4"]



const Search = () => {

    // hooks for setting up the REDUX-STORE-VALUE
    const dispatch = useDispatch();

    // getting the daat form the redux-store
    const { isSearch } = useSelector(state => state.others);


    // getting the API SEARCH DATA
    const [searchUser] = useLazySearchUserQuery();
    // const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);
    const [sendFriendRequest] = useSendFriendRequestMutation();

    // hooks
    // for the setup of the users
    const [users, setUsers] = useState([])

    // creating an inbuilt hooks
    const search = useInputValidation("")

    const [isLoadingSendFriendRequest, setIsLoadingSendFriendRequest] = useState(false)



    // fnction to handle the make freind-request
    const addFriendHandler = async (id) => {
        // await sendFriendRequest("Sending Friend Request..", { userId: id });
        // console.log(id)

        setIsLoadingSendFriendRequest(true)
        // Showing the loading animation while sendning the friend rrequest
        const loadingToast = toast.loading("Sending Friend Request...")

        sendFriendRequest({ userId: id })
            .then((data) => {
                // console.log(data);
                if (data?.data) {
                    toast.remove(loadingToast)
                    toast.success(data?.data?.message)
                } else {
                    // console.log(data?.error?.data?.message);

                    toast.remove(loadingToast)
                    toast.error(data?.error?.data?.message || "Something went Wrong, Please try again");
                }
                setIsLoadingSendFriendRequest(false)
            })
            .catch((error) => {
                console.log(error)

                toast.error(error?.response?.data?.message || error?.response?.data?._message || "Something went Wrong, Please try again")
                setIsLoadingSendFriendRequest(false)
            })

    }




    // function to handle the close handler
    const handleSearchClose = () => {
        dispatch(setIsSearch(false))
    }




    // real time calling of the serach-Data of the user
    useEffect(() => {
        const timeOut = setTimeout(() => {
            // console.log("value:- ", search.value)

            searchUser(search.value)
                .then(({ data }) => {
                    console.log(data)

                    setUsers(data?.new_user_info)
                })
                .catch((error) => {
                    console.log(error);
                })

        }, 400);

        return () => {
            clearTimeout(timeOut)
        }
    }, [search.value]);



    return (
        <Dialog open={isSearch} onClose={handleSearchClose}>

            <Stack direction={"column"} width={"25rem"} p={"2rem"}>
                <DialogTitle textAlign={"center"}>
                    Search Friends
                </DialogTitle>

                {/* Search Feild */}
                <TextField
                    placeholder='Search Friend'
                    label=""
                    value={search.value}
                    onChange={search.changeHandler}
                    size="small"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Serach Users list */}
                <List>
                    {
                        users?.map((user, index) => {
                            return (
                                <SearchItems
                                    user={user}
                                    key={user._id}
                                    handler={addFriendHandler}
                                    loadingSearchHandler={isLoadingSendFriendRequest}
                                />
                            )
                        })
                    }
                </List>

            </Stack>

        </Dialog>
    )
}



export default Search
