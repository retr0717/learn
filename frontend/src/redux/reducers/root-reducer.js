import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import studentReducer from "./student/student-reducer";
import facultyReducer from "./faculty/faculty-reducer";

const persistConfig = {
    key:'root',
    storage,
    whitelist:['student','faculty']
};


const rootReducer = combineReducers(
    {
        student : studentReducer,
        faculty : facultyReducer
    }
)

export default persistReducer(persistConfig,rootReducer);