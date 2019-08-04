import React, { Component } from 'react'
import { connect } from 'react-redux'
import personUrl from './../../../icons/person.png'
import './index.scss'
import BoardCard from './fakeBoard'

const  NewBoard= () => {

    return (
        <li>
            <a>
                <div className="board_title_detail">
                    <p>创建新看板</p>
                </div>
            </a>
        </li>
    )
}

class PersonalBoard extends Component {

    state = {
        isFetchBoard: false,
        fetchBoardAgain:this.props.fetchBoardAgain,
        boards: []
    }

    async fetchBoard() {
        let url = 'http://localhost:2000/fakeBoard'
        let boards = []
        let token = localStorage.getItem('token')
        const {fetchBoardAgainEnd} = this.props

        let response = await fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({}), // data can be `string` or {object}!
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                })
            }
        )
        let data = await response.json()
        boards = data.boards
        this.setState({
            isFetchBoard: true,
            boards
        })
    }

    componentWillMount() {
        this.fetchBoard()
    }

    // componentWillUpdate(){
    //     const {fetchBoardAgain,fetchBoardAgainEnd}=this.props
    //     if(fetchBoardAgain) fetchBoardAgainEnd()
    //     this.fetchBoard()
    // }

    render() {

        const { isFetchBoard, boards } = this.state
        const {openAddBoard} = this.props
        let boardCards = boards.map(e => <BoardCard key={e.bid + e.title} content={e} />)

        return (
            <div className="all_boards">
                <div className="personal_board">
                    <div className="title">
                        <span className="person_icon"><img src={personUrl}></img></span>
                        <h3>个人看板</h3>
                    </div>
                    <ul className="board_card">
                        {
                            isFetchBoard && boardCards
                        }
                        <NewBoard onClick={openAddBoard} />
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log('personalBoard', { state, ownProps })
    return {
        fetchBoardAgain:state.boardReducer.fetchBoardAgain,
        isAddBoard:state.boardReducer.isAddBoard
    }
}

function mapDispatchToProps(dispatch) {
    // console.log('dispatch is openAddBoard',dispatch)
    return {
        openAddBoard: () => dispatch({
            type: 'openAddBoard',
            isAddBoard: true
        })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PersonalBoard)