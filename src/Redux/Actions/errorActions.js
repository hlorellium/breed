// RETURN ERRORS
import { CLEAR_ERRORS, GET_ERRORS } from './types';

// GET ERRORS
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id },
    };
};

// CLEAR ERRORS
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
