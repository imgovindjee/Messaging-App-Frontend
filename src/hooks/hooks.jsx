import { useEffect, useState } from "react";
import toast from "react-hot-toast";



const useErrors = (errors = []) => {
    // RealTime Rendering of the data
    useEffect(() => {

        errors.forEach(({ isError, error, fallback }) => {
            // if some error OCCURS WHILE FETCHING THE DTA
            if (fallback) {
                fallback()
            } else if (isError) {
                // console.log(error)
                toast.error(error?.data?.errorMessage || error?.data?.message || "Something Went wromg, please reload the page")
            }
        });

    }, [errors]);
}



const useAsyncMutation = (mutationHook) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)

    const [mutate] = mutationHook()

    const executeMutation = async (toastMessage, ...args) => {

        setIsLoading(true)
        const loadingToast = toast.loading(toastMessage || "Updating data...")

        try {
            const res = await mutate(...args)
            // console.log(data);
            if (res?.data) {
                toast.success(res?.data?.message, { id: loadingToast })
                setData(res?.data)
            } else {
                // console.log(data?.error?.data?.message);

                toast.error(res?.error?.data?.message || "Something went Wrong, Please try again", { id: loadingToast });
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || error?.response?.data?._message || "Something went Wrong, Please try again", { id: loadingToast })
        } finally {
            setIsLoading(false)
        }
    }
    return [executeMutation, isLoading, data]
}


const useSocketEvents = (socket, handlers) => {
    useEffect(() => {
        Object.entries(handlers).forEach(([event, handler]) => {
            socket.on(event, handler)
        })


        return () => {
            Object.entries(handlers).forEach(([event, handler]) => {
                socket.off(event, handler)
            })
        }
    }, [socket, handlers])
}


export { useAsyncMutation, useErrors, useSocketEvents }