import { db, currentTimestamp } from "../../base";

import {
    ADD_ANIMAL,
    ANIMALS_LOADING,
    DELETE_ANIMAL,
    GET_ANIMALS,
} from "./types";

import { returnErrors } from "./errorActions";

const animalsRef = db.collection("animals");

export const addAnimal = ({ name, gender, father, mother, bday, uid }) => (
    dispatch
) => {
    animalsRef
        .add({
            name,
            gender,
            parents: { father, mother },
            bday,
            uid,
            createdAt: currentTimestamp,
        })
        .then((res) =>
            dispatch({
                type: ADD_ANIMAL,
                payload: res.data,
            })
        )
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const getAnimals = (uid) => (dispatch) => {
    dispatch(setAnimalsLoading());
    animalsRef
        .where("uid", "==", uid || null)
        .get()
        .then((querySnapshot) => {
            const animals = querySnapshot.docs.map((doc) => doc.data());
            dispatch({
                type: GET_ANIMALS,
                payload: animals,
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// export const deleteAnimal = (id) => (dispatch) => {
//     axios
//         .delete(`/api/animals/${id}`)
//         .then(() =>
//             dispatch({
//                 type: DELETE_ANIMAL,
//                 payload: id,
//             })
//         )
//         .catch((err) =>
//             dispatch(returnErrors(err.response.data, err.response.status))
//         );
// };

export const setAnimalsLoading = () => {
    return {
        type: ANIMALS_LOADING,
    };
};
