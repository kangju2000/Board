import { combineReducers } from "redux";
import user from "./user_reducer";
import post from "./post";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};
const rootReducer = combineReducers({
    user,
    post,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
