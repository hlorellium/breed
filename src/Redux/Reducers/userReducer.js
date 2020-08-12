import { SET_CURRENT_USER } from "../Actions/types";

const initialState = {
    currentUser: {},
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, currentUser: action.payload };
        default:
            return state;
    }
};
