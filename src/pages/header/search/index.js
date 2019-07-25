import React, { Component } from "react"
import './index.scss'
import { connect } from 'react-redux'
import searchIconUrl from './../../../icons/search.png'

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchContext: this.props.searchContext
        }
    }

    handleInputChange = e => {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="search">
                <input
                    type="text"
                    name="text"
                    value={this.state.text}
                    onChange={this.handleInputChange}
                />
                <span>
                    <img src={searchIconUrl}></img>
                </span>
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
        loginOut: () => dispatch({
            type: 'changeLogin',
            value: false
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)