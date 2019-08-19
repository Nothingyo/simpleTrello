import React,{ Component } from "react"
import Logout from './logout'
import Search from './search'
import Home from './home'
import './index.scss'

class Header extends Component{
    render(){
        return (
            <div className="header">
                <div className="left_part">
                    <Home/>
                    <Search/>
                </div>
                <div className="trello">Trello</div>
                <div className="right_part">
                    <Logout/>
                </div>
            </div>
        )
    }
}
export default Header