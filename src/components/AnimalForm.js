import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { Formik, Form, Field } from 'formik';
import { addAnimal, getAnimals } from '../Redux/Actions/animalActions';

const AnimalForm = ({ addAnimal, currentUser, history }) => {
    const { uid } = currentUser;
    return (
        <>
            <Navbar />
            <div className='container'>
                <Formik
                    initialValues={{
                        name: '',
                        gender: '',
                        father: '',
                        mother: '',
                        bday: '',
                    }}
                    onSubmit={async (values) => {
                        try {
                            await addAnimal({ uid, ...values });
                        } catch (error) {
                            alert(error);
                        }
                        getAnimals();
                        history.push('/animals');
                    }}
                >
                    <Form>
                        <label htmlFor='name'>Name</label>
                        <Field
                            id='name'
                            name='name'
                            placeholder="Animal's name"
                        />
                        <div role='group' aria-labelledby='my-radio-group'>
                            <label>
                                <Field
                                    type='radio'
                                    name='gender'
                                    value='Male'
                                />
                                Male
                            </label>
                            <label>
                                <Field
                                    type='radio'
                                    name='gender'
                                    value='Female'
                                />
                                Female
                            </label>
                        </div>
                        <label htmlFor='father'>Father</label>
                        <Field
                            id='father'
                            name='father'
                            placeholder="Animal's father"
                        />
                        <label htmlFor='mother'>Mother</label>
                        <Field
                            id='mother'
                            name='mother'
                            placeholder="Animal's mother"
                        />
                        <label htmlFor='bday'>Bitrh date</label>
                        <Field
                            type='date'
                            id='bday'
                            name='bday'
                            placeholder="Animal's btirh date"
                        />
                        <button type='submit'>Submit</button>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = { addAnimal, getAnimals };

export default connect(mapStateToProps, mapDispatchToProps)(AnimalForm);
