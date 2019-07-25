import React,{Component} from 'react'
import imgURL from './../../../icons/HOME2.png'
import './index.scss'

export default class extends Component {
    render(){
        return(
            <a href="/main" className="home">
                <span className="house"><img src={imgURL}></img></span>
            </a>
        )
    }
}