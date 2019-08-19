import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class BoardCard extends Component {

    constructor(props) {
        super(props)
        // console.log('this.props is ',props)
    }
    

    showBoard = () => {
        const { gotoBoard, getBoardId } = this.props
        const { bid } = this.props.content
        getBoardId(bid)
        gotoBoard()
    }

    componentDidUpdate() {
        console.log('this.state is in fakeBoard', this.state)
    }

    render() {
        const { title } = this.props.content
        const { isShowBoard } = this.props
        // console.log('title is',title)
        if (isShowBoard) return <Redirect to='/board' />
        return (
            <li onClick={() => this.showBoard()}>
                <a>
                    <div className="board_title_detail">{title}</div>
                </a>
            </li>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isShowBoard: state.boardReducer.isShowBoard
    }
}

function mapDispatchToProps(dispatch) {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(BoardCard)