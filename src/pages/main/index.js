import React, { Component } from 'react'
import Header from './../header'
import Nav from './nav'
import PersonalBoard from './personalBoard'

class Main extends Component{

    render(){
        return (
            <div className="main">
                <Header/>
                <div>
                    <Nav/>
                    <PersonalBoard/>
                </div>
            </div>
        )
    }
}

export default Main
