import {combineReducers} from 'redux';

import { messagesReducer } from './messagesReducer';
import { userReducer } from './userReducer';


const rootReducer = combineReducers({
    user: userReducer,
    chats: messagesReducer
});

export default rootReducer;
