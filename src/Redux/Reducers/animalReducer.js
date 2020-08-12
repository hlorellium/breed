import {
    ADD_ANIMAL,
    ANIMALS_LOADING,
    DELETE_ANIMAL,
    GET_ANIMALS,
} from "../Actions/types";

const initialState = {
    animals: [],
    loading: false,
};

export const animalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ANIMALS:
            return { ...state, animals: action.payload, loading: false };
        case ADD_ANIMAL:
            return { ...state, animals: [action.payload, ...state.animals] };
        case DELETE_ANIMAL:
            return {
                ...state,
                animals: state.animals.filter(
                    (animal) => animal._id !== action.payload
                ),
            };
        case ANIMALS_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
