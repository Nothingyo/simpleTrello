import React, { Component } from 'react'
import Login from './pages/login'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from './pages/main'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AddBoard from './pages/main/personalBoard/addBoard'


class App extends Component {

    fetchIsLogin = () => {
        let url = './trello.json'
        const { loginClick } = this.props
        // GET请求
        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json.isLogin === "true") {
                    loginClick()
                }
            })
            .catch(error => console.error(error))
    }

    componentWillMount() {
        this.fetchIsLogin()
    }

    render() {
        const { isLogin } = this.props

        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' exact component={Login} />
                        <Route path='/login' exact component={Login} />
                        {
                            isLogin &&
                            <Route path='/main' exact component={Main} />
                        }
                        {
                            !isLogin &&
                            <Redirect to='/' />
                        }

                    </Switch>
                </BrowserRouter>
                <AddBoard></AddBoard>
            </div>
        )

    }
}

function mapStateToProps(state, ownProps) {
    console.log('App', { state, ownProps })
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
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)