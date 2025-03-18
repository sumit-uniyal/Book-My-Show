import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import Authreducer from './slice/AuthSlice'
import loginPopup from './slice/LoginPopupSlice'
import movieData from './slice/MovieSlice'

const persistConfig = {
    key: 'root',
    storage,
}
   
const persistedReducer = persistReducer(persistConfig, Authreducer)

const store = configureStore({
    reducer:{
        auth: persistedReducer,
        loginPopup:loginPopup,
        movieData:movieData
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Avoid warnings related to non-serializable values
        }),
})
const persistor = persistStore(store);

export {store, persistor}