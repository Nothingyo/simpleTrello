import React, { Component } from 'react'
import Login from './pages/login'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from './pages/main'


class App extends Component {

    render() {
        const { isLogin } = this.props

        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' exact component={Login} />
                        <Route path='/login' exact component={Login} />
                        {
                            // isLogin &&
                            <Route path='/main' exact component={Main} />
                        }
                    </Switch>
                </BrowserRouter>
            </div>
        )

    }
}

export default App