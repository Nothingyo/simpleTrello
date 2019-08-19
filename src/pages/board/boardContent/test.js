import React, { Component } from 'react'
import closeIconUrl from '../../../icons/close-black.png'
import FakeList from '../fakeList'
import './index.scss'
import AddIconUrl from '../../../icons/add.png'
import { connect } from 'react-redux'
import ENV_ADDRESS from '../../../address'
import {Redirect} from 'react-router'

class AddList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ltitle: ''
        }
    }

    handleInputChange = e => {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState = ({
            [name]: value
        })
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
                        name="ltitle"
                        value={this.state.ltitle}
                        onChange={this.handleInputChange}
                    ></input>
                    <button
                        className="isAddList_button"
                        onClick={this.props.addList}
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
        isFetchFakeList: false,
        isAddList: false,
        lists: [],

    }

    async fetchList() {
        let url = `http://${ENV_ADDRESS}:2000/fakeList`
        let token = localStorage.getItem('token')
        const { boardId } = this.props
        console.log('token is ', token)
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ bid: boardId }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                // 'Authorization':'Bearer '+`${token}`,
                // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwicGVybWlzc2lvbnMiOlsidXNlcjp3cml0ZSJdLCJpYXQiOjE1NjU3NzQxNTUsImV4cCI6MTU2NjM3ODk1NX0.jyaTXUlTx2ESK884Eah3nTqsIQFg41IzhyS7dgPw6Ro',
            })
        })
        console.log('response is ', response)
        let data = await response.json()
        let lists = data.lists
        console.log('data.lists is', lists)
        this.setState({
            isFetchFakeList: true,
            lists
        })
    }

    async addList(title) {
        let url = `http://${ENV_ADDRESS}:2000/fakeList/add`
        let token = localStorage.getItem('token')
        const { boardId } = this.props
        let addItem = {
            title: title,
            bid: boardId
        }
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(addItem),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + `${token}`,
                // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwicGVybWlzc2lvbnMiOlsidXNlcjp3cml0ZSJdLCJpYXQiOjE1NjU3NzQxNTUsImV4cCI6MTU2NjM3ODk1NX0.jyaTXUlTx2ESK884Eah3nTqsIQFg41IzhyS7dgPw6Ro',
            })
        })
        // console.log('response is ', response)
        let data = await response.json()
        let lists = data.lists
        this.setState({
            isFetchFakeList: true,
            lists
        })
        return <Redirect  to='board'/>
    }

    changeIsAddList = e => {
        e.preventDefault()
        this.setState({
            isAddList: !this.state.isAddList,
        })
        // console.log('666', this.state.isAddList)
    }

    componentWillMount() {
        this.fetchList()
    }

    render() {
        const { isShowBoard } = this.props
        console.log('isShowBoard is ', isShowBoard)
        const { lists } = this.state
        // console.log('state.lists is ',lists)
        let boardLists = lists.map(e => <FakeList e={e} key={e.lid + e} />)
        console.log(this.state.isAddList)
        return (
            <div className="board_canvas">
                {
                    isShowBoard && boardLists
                }
                <AddList
                    isAddList={this.state.isAddList}
                    onClick={this.changeIsAddList}
                    onSubmit={this.AddList}
                />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isShowBoard: state.boardReducer.isShowBoard,
        boardId: state.boardReducer.boardId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isShowBoard: () => dispatch({
            type: 'isShowBoard',
            isShowBoard: true,
        })
    }
}
// export default connect(mapStateToProps, null)(BoardContent)

export default connect(mapStateToProps, mapDispatchToProps)(BoardContent)