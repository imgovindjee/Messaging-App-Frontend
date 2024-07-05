import React, { useEffect } from 'react'

import { Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'

import { sampleNotifications } from '../../common/ChatItemsContent/ChattemContent'
import NotificationsItems from './NotificationsItems/NotificationsItems'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/APICalling/api'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNotification } from '../../redux/Reducers/others'
import { useAsyncMutation } from '../../hooks/hooks'




const Notifications = () => {

    // hooks
    // for settup the redux-store value
    const dispatch = useDispatch();

    // retriving the data from the redux store
    const { isNotification } = useSelector(state => state.others);

    // NOTIFICATIONs-API CALLING
    const { data, isLoading, isError, error } = useGetNotificationsQuery();
    // console.log(data)

    // ACCEPT FRIEND-REQUEST-API
    const [acceptRequest] = useAcceptFriendRequestMutation();
    // const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);


    // RealTime Rendering of the data
    useEffect(() => {
        // if some error OCCURS WHILE FETCHING THE DTA
        if (isError) {
            toast.error(error?.data?.message || "Something Wnet wromg, please reload the page")
        }
    }, [isError, error]);



    // function to handle the frendRequest..
    const friendRequestHandler = async ({ _id, accept }) => {
        dispatch(setIsNotification(false));

        // acceptRequest("Accepting Request...", {requestId:_id, accept})

        try {
            const res = await acceptRequest({ requestId: _id, accept })
            if (res?.data?.success) {
                console.log("using Socket TO-DO")

                toast.success(res?.data?.message);
            } else {
                toast.error(res?.data?.message || "Something went Wrong, please try again")
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.response?.data?._message || "INternal Server Error")
        }
    }


    // function to handle the notifiaction close
    const handleNotificationClose = () => {
        dispatch(setIsNotification(false));
    }


    return (
        <Dialog open={isNotification} onClose={handleNotificationClose}>

            <Stack
                p={{ xs: "1rem", sm: "2rem" }}
                maxWidth={"25rem"}
            >
                <Toaster />

                <DialogTitle textAlign={"center"} letterSpacing={"0.1em"}>
                    Notifications
                </DialogTitle>

                {
                    isLoading ? (
                        <Skeleton />
                    ) : (
                        data?.allRequest?.length > 0 ? (
                            data?.allRequest?.map((data, index) => {
                                return (
                                    <NotificationsItems
                                        sender={data?.sender}
                                        _id={data?._id}
                                        handler={friendRequestHandler}
                                        key={data?._id}
                                    />
                                )
                            })
                        ) : (
                            <Typography textAlign={"center"} sx={{ bgcolor: "rgba(0,0,0,0.1)", width: "100%", p: "0.5rem" }}>
                                No Notification Available
                            </Typography>
                        )
                    )
                }
            </Stack>

        </Dialog >
    )
}

export default Notifications
