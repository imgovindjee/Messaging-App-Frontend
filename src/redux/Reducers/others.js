import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isSearch: false,
    isNewGroup: false,
    isAddMember: false,
    isMobileMenu: false,
    isFileMenu: false,
    isDeleteMenu: false,
    uploadingLoader: false,
    isNotification: false,
    selectedDeleteChat: {
        chatId: "",
        groupChat: false,
    },
    isMoreOptions:false,
}

const otherSlice = createSlice({
    name: 'others',
    initialState,
    reducers: {
        setIsNewGroup: (state, action) => {
            state.isNewGroup = action.payload
        },
        setIsAddMember: (state, action) => {
            state.isAddMember = action.payload
        },
        setIsNotification: (state, action) => {
            state.isNotification = action.payload
        },
        setIsMobileMenu: (state, action) => {
            state.isMobileMenu = action.payload
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload
        },
        setIsSearch: (state, action) => {
            state.isSearch = action.payload
        },
        setIsDeleteMenu: (state, action) => {
            state.isDeleteMenu = action.payload
        },
        setSelectedDeleteChat: (state, action) => {
            state.selectedDeleteChat = action.payload
        },
        setUploadingLoader: (state, action) => {
            state.uploadingLoader = action.payload
        },
        setIsMoreOption: (state, action) => {
            state.isMoreOptions = action.payload
        }
    }
})



export default otherSlice
export const { setIsAddMember, setIsDeleteMenu, setIsFileMenu, setIsMobileMenu, setIsNewGroup, setIsNotification, setIsSearch, setSelectedDeleteChat, setUploadingLoader, setIsMoreOption } = otherSlice.actions