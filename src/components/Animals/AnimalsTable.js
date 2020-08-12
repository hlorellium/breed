import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAnimals } from "../../Redux/Actions/animalActions";
import Navbar from "../Navbar/Navbar";

const AnimalsTable = ({ getAnimals, animal, currentUser }) => {
    useEffect(() => {
        !!currentUser ? getAnimals(currentUser.uid) : console.log("no user");
        console.log(currentUser.uid);
    }, [getAnimals, currentUser.uid]);

    console.log(animal);

    // const { animals } = animal;

    // animals.map((animal) => console.log(animal));

    return (
        <div>
            <Navbar />
        </div>
    );
};

const mapStateToProps = (state) => ({
    animal: state.animal,
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = {
    getAnimals,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimalsTable);
