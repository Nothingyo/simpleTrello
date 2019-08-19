import React, { Component } from 'react'
import './index.scss'
import { connect } from 'react-redux'
import closeIconUrl from '../../../icons/close-black.png'
const blankContent = [
    {
        content: "个人资料与可见性"
    }, {
        content: "活动"
    }, {
        content: "设置"
    }, {
        content: "帮助"
    }, {
        content: "快捷键"
    }
]

class LogoutBlank extends Component {

    constructor(props){
        super(props)
    }

    clickLogout = () =>{
        const {logOut}=this.props
        localStorage.clear()
        logOut()
    }

    render() {
        const {onClick}=this.props
        return (
            <div className="logout_blank">
                <div className="logout_name">
                    <span>UserName</span>
                    <button
                        onClick={()=>onClick()}
                    >
                        <img className="close_icon_button" src={closeIconUrl}></img>
                    </button>
                </div>
                <div></div>
                <ul className="logout_blank_ul">
                    {
                        blankContent.map((e, index) =>
                            <li 
                                className="logout-blank-li" 
                                key={'e' + index}
                            >
                                <a className="logout-blank-a" href="/login">{e.content}</a>
                            </li>
                        )
                    }
                    <li
                        className="logout-blank-li" 
                        key={'logout'} 
                        onClick={this.clickLogout}>
                            <a className="logout-blank-a" href='/login' >登出</a> 
                    </li>
                </ul>

            </div>
        )
    }
}
function mapStateToProps(state, ownProps) {
    // console.log(100, { state, ownProps })
    return {
        isLogin: state.loginReducer.isLogin
    }
}

function mapDispatchToProps(dispatch) {
    // console.log(dispatch)
    return {
        logOut: () => dispatch({
            type: 'changeLogin',
            value: false
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogoutBlank)