import app from "../../base";
import { SET_CURRENT_USER } from "./types";

export const setCurrentUser = () => dispatch => {
    app.auth().onAuthStateChanged(user => {
        dispatch({
            type: SET_CURRENT_USER,
            payload: user,
        })
    })
}