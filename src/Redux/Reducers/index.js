import { combineReducers } from 'redux';
import { animalReducer } from './animalReducer';
import errorReducer from './errorReducer.js';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
    animal: animalReducer,
    error: errorReducer,
    user: userReducer
});
