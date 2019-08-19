import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import closeIconUrl from '../../../../icons/close.png'
import ENV_ADDRESS from '../../../../address'

class AddBoard extends Component {

    state = {
        boardtitle:''
    }
    handleInputChange = e => {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
        console.log('this.state.boardtitle is ',this.state.boardtitle)
    }
    async addBoard() {
        let url = `http://${ENV_ADDRESS}:2000/fakeBoard/add`
        let token = localStorage.getItem('token')
        let boards= []
        let title={
            title:`${this.state.boardtitle}`
        }
        let response = await fetch(url,
            {
                method: 'POST',
                body: JSON.stringify(title), // data can be `string` or {object}!
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                })
            }
        )
        let data = await response.json()
        boards = data.boards
    }

    handleClick = e => {
        e.preventDefault()
        this.addBoard()
    }

    render() {
        const {isAddBoard,closeAddBoardClick} = this.props
        // console.log('isAddBoard is ',isAddBoard,this.props)
        return (
            <div className={isAddBoard?"add_board_show":"add_board_hide"}>
            {
                isAddBoard &&
                <div className="add_board">
                    <form
                        
                    >
                        <div>
                            <input 
                                className="add_board_input"
                                name="boardtitle"
                                value={this.state.boardtitle} 
                                onChange={this.handleInputChange}
                                placeholder={'enter board title'}
                            >
                            </input>
                            <button className="close_add_board" onClick={closeAddBoardClick}><img src={closeIconUrl}></img></button>
                        </div>
                        <button 
                            className={
                                (this.state.boardtitle=='enter board title' || !this.state.boardtitle)?
                                "create_new_board_forbid"
                                :"create_new_board"
                            }
                            onClick={()=>this.addBoard()}
                        >
                            创建看板
                        </button>
                    </form>
                </div>
            }
            </div>
        )
    }
}
function mapStateToProps(state, ownProps) {
    // console.log('state is in 33',state)
    return {
        isAddBoard:state.boardAddReducer.isAddBoard
    }
}
function mapDispatchToProps(dispatch) {
    return {
        // addBoardClick: value=>dispatch({
        //     type:'addBoard',
        //     isAddBoard:false,
        //     value
        // }),
        closeAddBoardClick:()=>dispatch({
            type:'closeAddBoard',
            isAddBoard:false
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBoard)