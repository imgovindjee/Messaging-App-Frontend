import { createSlice } from "@reduxjs/toolkit"
import { getOrSaveFromStorage } from "../../library/Features/Features"
import { NEW_MESSSAGE_ALERT } from "../../constants/events"


const initialState = {
    notificationCount: 0,
    newMessagesAlert: getOrSaveFromStorage({key:NEW_MESSSAGE_ALERT, get:true}) || [{
        chatId: "",
        count: 0,
    }]
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        increamentNotification: (state) => {
            state.notificationCount = state.notificationCount + 1
        },
        resetNotificationCount: (state) => {
            state.notificationCount = 0
        },


        setNewMessagesAlert: (state, action) => {
            const idx = state.newMessagesAlert.findIndex(
                (item) => item.chatId === action.payload.chatId
            );

            if (idx !== -1) { // if not the first message
                state.newMessagesAlert[idx].count += 1;
            } else { // if its the first message
                state.newMessagesAlert.push({
                    chatId: action.payload.chatId,
                    count: 1,
                })
            }
        },
        removeNewMessagesAlert: (state, action) => {
            state.newMessagesAlert = state.newMessagesAlert.filter(
                (item) => item.chatId !== action.payload
            )
        }
    }
})



export default chatSlice
export const {
    increamentNotification,
    resetNotificationCount,
    setNewMessagesAlert,
    removeNewMessagesAlert
} = chatSlice.actions