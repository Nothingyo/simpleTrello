import React, { Component } from 'react'
import { connect } from 'react-redux'
import personUrl from './../../../icons/person.png'
import './index.scss'
import BoardCard from './fakeBoard'

const NewBoard = ()=>{
    return(
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
        boards: []
    }

    async fetchBoard () {
        let url = './trello.json'
        let boards = []

        let response = await fetch(url)
        let data = await response.json()
        boards = data.board
        this.setState({
            isFetchBoard: true,
            boards
        })
        // fetch(url)
        //     .then(res => res.json())
        //     .then(json => {
        //         //boardNumber = eval(json.board.length)
        //         boards = json.board
        //         //console.log('boards and boardNumber is ',boards,boardNumber)
        //         // json.board.content.map(e=>{
        //         //     boards.push(e)
        //         // })
        //         this.setState({
        //             isFetchBoard: true,
        //             boards
        //         })
        //     })
        //     .catch(error => console.log(error))
    }

    componentWillMount() {
        this.fetchBoard()
    }

    render() {

        const { isFetchBoard, boards } = this.state
        let boardCards = boards.map(e => <BoardCard key={e.bid} content={e} />)

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
                        <NewBoard/>
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect()(PersonalBoard)