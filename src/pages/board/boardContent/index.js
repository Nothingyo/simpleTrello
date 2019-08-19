import React, { Component } from 'react'
import closeIconUrl from '../../../icons/close-black.png'
import FakeList from '../fakeList'
import './index.scss'
import AddIconUrl from '../../../icons/add.png'
import { connect } from 'react-redux'
import ENV_ADDRESS from '../../../address'

class AddList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            boardId: this.props.boardId
        }
    }


    handleInputChange = e => {
        e.preventDefault()
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    submitTitle = e => {
        e.preventDefault()
        this.props.getListTitle(this.state.title)
        this.props.onClick()
    }

    render() {
        const isAddList = this.props.isAddList
        return (
            <div
                className={isAddList ? "isAddList_on" : "isAddList_off"}
            >
                <div className="isAddList_div_off"
                    onClick={this.props.onClick}
                >
                    <span className="isAddList_span_off">
                        <img src={AddIconUrl}></img>
                    </span>
                    <p className="isAddList_title">
                        添加另一个列表
                </p>
                </div>
                <form
                    className="isAddList_form"
                >
                    <input
                        className="isAddList_input"
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                    ></input>
                    <button
                        className="isAddList_button"
                        onClick={this.submitTitle}
                    >
                        添加列表
                </button>
                    <span
                        className="isAddList_close"
                        onClick={this.props.onClick}
                    >
                        <img src={closeIconUrl}></img>
                    </span>
                </form>
            </div>
        )
    }
}

class BoardContent extends Component {

    state = {
        isAddList: false,
        lists: []
    }

    async fetchList() {
        let url = `http://${ENV_ADDRESS}:2000/fakeList`
        let token = localStorage.getItem('token')
        const { boardId, searchEnd } = this.props
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ bid: boardId }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        })
        let data = await response.json()
        let lists = data.lists
        this.setState({
            lists
        })
        searchEnd()
    }

    async addList(title) {
        let url = `http://${ENV_ADDRESS}:2000/fakeList/add`
        let token = localStorage.getItem('token')
        const { boardId } = this.props
        let addItem = {
            title,
            bid: boardId,
        }
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(addItem),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${token}`
            })
        })
        this.fetchList()
    }

    getListTitle = title => {
        this.addList(title)
    }


    changeIsAddList = e => {
        this.setState({
            isAddList: !this.state.isAddList,
        })
    }

    componentWillMount() {
        this.fetchList()
    }

    render() {
        const { isShowBoard, isSearch } = this.props
        const { lists } = this.state
        if(isSearch) this.fetchList()
        let boardLists = lists.map(e => <FakeList e={e} key={e.lid + e} />)
        return (
            <div className="board_canvas">
                {
                    isShowBoard && boardLists
                }
                <AddList
                    isAddList={this.state.isAddList}
                    onClick={this.changeIsAddList}
                    getListTitle={this.getListTitle}
                />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isShowBoard: state.boardReducer.isShowBoard,
        boardId: state.boardReducer.boardId,
        isSearch:state.searchReducer.isSearch
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showBoard: () => dispatch({
            type: 'isShowBoard',
            isShowBoard: true,
        }),
        searchEnd:()=>dispatch({
            type:'searchBoard',
            isSearch:false
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContent)