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
        const {getBoardId,gotoBoard,searchClick}=this.props
        getBoardId(this.state.searchContent)
        gotoBoard()
        searchClick()
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
        searchClick: () => dispatch({
            type: 'searchBoard',
            isSearch:true
        }),
        getBoardId: boardId => dispatch({
            type: 'getBoardId',
            boardId
        }),
        gotoBoard: () => dispatch({
            type: 'isShowBoard',
            isShowBoard: true
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)