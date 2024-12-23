import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, PURGE, REGISTER, REHYDRATE, FLUSH, PAUSE, PERSIST, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import  UserSlice  from "./userSlice";
import  SideBarSlice  from "./sideBarsSlice";
import  ChildSlice  from "./childSlice";


const routerRedurcer = combineReducers({
    currentUser: UserSlice,
    sideBard: SideBarSlice,
    myChild: ChildSlice
})

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    // whitelist: ["currentUser"]
}

const persistedReducer = persistReducer(persistConfig, routerRedurcer);

export const store = configureStore({
    reducer: persistedReducer,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),

})

export const persistor = persistStore(store)