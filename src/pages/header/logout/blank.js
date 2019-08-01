import React, { Component } from 'react'
import './index.scss'
import { connect } from 'react-redux'
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

    clickLogout = () =>{
        const {logOut}=this.props
        localStorage.clear()
        logOut()
    }

    render() {
        
        return (
            <div className="logout_blank">
                <div className="logout_name">
                    <span>UserName</span>
                    <button></button>
                </div>
                <div></div>
                <ul className="logout_blank_ul">
                    {
                        blankContent.map((e, index) =>
                            <li key={'e' + index}><a href="/login">{e.content}</a></li>
                        )
                    }
                    <li key={'logout'} onClick={this.clickLogout}><a href='/login'>登出</a></li>
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
            type: 'logOut',
            value: false
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogoutBlank)