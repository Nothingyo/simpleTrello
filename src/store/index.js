import { combineReducers } from 'redux'
import loginReducer from './../pages/login/store/reducer'
import searchReducer from './../pages/header/search/store/reducer'
import boardReducer from './../pages/main/personalBoard/store/reducer'


export default combineReducers({
    loginReducer,
    searchReducer,
    boardReducer,
})