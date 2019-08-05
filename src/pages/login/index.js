import React, { Component } from 'react';
// import Main from './../main'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: this.props.email,
            password: '',
            isLogin: this.props.isLogin,
        }
        console.log(this.state)
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

    async loginVerify(){
        let url = 'http://localhost:2000/login'
        let data={
            "email":`${this.state.email}`,
            "password":`${this.state.password}`
            //传普通对象，数据库update会自动转换true/false为1/0
            // isLogin:args,
            // email:this.state.email
        }
        // console.log('data is ',data)
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          })

        let resJson = await response.json()
        // console.log('resJson is ',resJson)
        if(resJson.isLogin){
            const {loginClick}=this.props
            localStorage.setItem('isLogin','true')
            localStorage.setItem('token',resJson.token)
            loginClick()
        }else{
            console.log('email or password is wrong')
        }

    }

    handleSubmit = e => {
        e.preventDefault()
        this.loginVerify()

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
        //本地是否记录上次登陆状态
        let isLogin = this.storageIsLogin()
        if(isLogin){
            const {loginClick} = this.props
            loginClick()
        }
        
    }

    // componentDidMount() {

    // }

    render() {

        const { isLogin } = this.props
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
                        required
                    />
                    <label>密码</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required
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
        isLogin: state.loginReducer.isLogin,
        email: state.loginReducer.email,
        password: state.loginReducer.password
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
