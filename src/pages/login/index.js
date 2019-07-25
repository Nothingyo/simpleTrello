import React, { Component } from 'react';
// import Main from './../main'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import { Redirect } from 'react-router-dom'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: this.props.email,
            password: this.props.password,
            isLogin: this.props.isLogin,
        }
    }

    storageIsLogin = () => {
        let isLogin = localStorage.getItem('isLogin')
        if (isLogin) {
            return true
        }
        return false

    }

    handleInputChange = e => {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    fetchIsLogin = () => {
        let url = './trello.json'
        // GET请求
        fetch(url)
            .then(res => res.json())
            .then(json => {
                const { loginClick, loginFail } = this.props
                if (json.isLogin==="true") {
                    loginClick()
                } else {
                    if (json.email === this.state.email && json.password === this.state.password) {
                        // console.log('loginClick2')
                        loginClick()
                    } else {
                        loginFail()
                        console.log('loginStorage fail , email or passwod is wrong')
                    }
                }
            })
            .catch(error => console.error(error))
    }

    handleSubmit = e => {
        e.preventDefault()
        this.fetchIsLogin()

        // POST请求
        // fetch(url, {
        //     method: 'POST', // or 'PUT'
        //     body: JSON.stringify(data), // data can be `string` or {object}!
        //     credentials: 'same-origin' ,
        //     headers: new Headers({
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json'
        //   })
        // }).then(res => res.json())
        // .then(response => console.log('Success:', response))

    }

    componentWillMount() {
        let isLogin=this.storageIsLogin()
        if (!isLogin) {
            this.fetchIsLogin()
        }
    }

    // componentDidMount() {
        
    // }

    render() {

        const { isLogin} = this.props
        if (isLogin) {
            return <Redirect to="/main" />
        }
        // console.log('this.state is ', this.state)

        return (
            <div className="loadContent">
                <h1>登录到Trello</h1>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <label>邮箱地址</label>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    <label>密码</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit" className="button" >登陆</button>
                </form>
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

function mapDispatchToProps(dispatch) {
    console.log(dispatch)
    return {
        loginClick: () => dispatch({
            type: 'changeLogin',
            value: true
        }),
        loginFail: () => dispatch({
            type: 'loginFail',
            value: false
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
