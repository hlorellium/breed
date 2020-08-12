import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../Navbar/Navbar'

const Profile = () => {
    return (
       <Navbar />
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
