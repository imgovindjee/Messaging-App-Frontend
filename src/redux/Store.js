import { configureStore } from '@reduxjs/toolkit'


import authSlice from './Reducers/auth'
import api from './APICalling/api'
import otherSlice from './Reducers/others'
import chatSlice from './Reducers/Chat'





const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [api.reducerPath]: api.reducer,
        [otherSlice.name]: otherSlice.reducer,
        [chatSlice.name]: chatSlice.reducer,
    },

    middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware]
})



export default store