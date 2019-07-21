import React, { Component } from 'react';
import Main from './../main'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import { Redirect } from 'react-router-dom'

class Login extends Component {

    state = {}

    isStorage = () => {
        if (localStorage.getItem('trelloEmail')) {
            this.setState({
                email: localStorage.getItem('trelloEmail'),
                password: localStorage.getItem('trelloPassword'),
                isLogin:true
            })
            console.log(this.state)
        }
    }

    componentWillMount() {
        this.isStorage()
    }

    componentDidMount() {
        this.isStorage()
    }

    handle = e => {
        e.preventDefault()
        let url = './trello.json'
        let email = document.querySelector('#email')
        let pwd = document.querySelector('#password')
        
        // let data = this.state
        // console.log(this.state)
        // GET请求
        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json.email === email.value && json.password === pwd.value) {
                    localStorage.setItem('trelloEmail', json.email)
                    localStorage.setItem('trelloPassword', json.password)
                    this.setState({
                        email: email.value,
                        password: pwd.value,
                        isLogin:true
                    })
                    // loginClick
                    console.log('localStorage success')
                }else{

                }
            })
            .catch(error => console.error(error))


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
    render() {

        const { isLogin, loginClick } = this.props
        if (isLogin) {
            return <Redirect to="/main" />
        }

        return (
            <div className="loadContent">
                <h1>登录到Trello</h1>
                <form
                    onSubmit={this.handle}
                >
                    <label>邮箱地址</label>
                    <input type="email" name="email" id="email" />
                    <label>密码</label>
                    <input type="password" name="password" id="password" />
                    <button type="submit" className="button" >登陆</button>
                </form>
            </div>
        )

    }
}

function mapStateToProps(state , ownProps) {
    return {
        isLogin:state.isLogin||ownProps.isLogin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginClick: () => dispatch(actionCreators.changeLogin)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
