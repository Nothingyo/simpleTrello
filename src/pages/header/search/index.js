import React, { Component } from "react"
import './index.scss'
import { connect } from 'react-redux'
import searchIconUrl from './../../../icons/search.png'

class Search extends Component {

    state = {
        searchContent: '',
    }

    handleInputChange = e => {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSearch = () => {
        let searchContent = this.state.searchContent
        let url = './trello.json'
        const { searchClick } = this.props
        let jsonContent
        fetch(url)
        //can consume Response.json() only once, if you are consuming it more than once, the error will happen.
            .then(res => res.json())
            .then(
                json=>{
                    json.board.content.map(e=>{
                        if(e.title===this.state.searchContent){
                            searchClick(e.id)
                        }
                    })
                }
            )
            .catch(error => console.error(error))
    }

    render() {
        return (
            <div className="search">
                <input
                    type="text"
                    name="searchContent"
                    value={this.state.searchContent}
                    onChange={this.handleInputChange}
                />
                <span onClick={this.handleSearch}>
                    <img src={searchIconUrl}></img>
                </span>
            </div>
        )
    }
}


function mapStateToProps(state, ownProps) {
    console.log(64, { state, ownProps })
    return {
        isLogin: state.loginReducer.isLogin,
        isSearch:state.searchReducer.isSearch,
    }
}

function mapDispatchToProps(dispatch) {
    // console.log(dispatch)
    return {
        searchClick: value => dispatch({
            type: 'searchBoard',
            value
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)