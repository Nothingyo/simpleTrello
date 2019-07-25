import React,{ Component } from "react"
import { connect } from 'react-redux'
import LogoutBlank from './blank'
import './index.scss'

class Logout extends Component{

    constructor(props){
        super(props)
        this.state={
            isLogin:this.props.isLogin,
            isLogoutBlank:false
        }
    }

    logoutBlank=()=>{
        this.setState({
            isLogoutBlank:!this.state.isLogoutBlank
        })
    }

    render(){
        return (
            <div className="logout">
                <span className="avator" onClick={this.logoutBlank}></span>
                {
                    this.state.isLogoutBlank &&
                    <LogoutBlank/> 
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log(100, { state, ownProps })
    return {
        isLogin: state.loginReducer.isLogin
    }
}

export default connect(mapStateToProps)(Logout)