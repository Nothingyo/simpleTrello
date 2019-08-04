import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    }
    async addBoard(){
        let url = 'http://localhost:2000/fakeBoard/add'
        let token = localStorage.getItem('token')
        let response = await fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({  }), // data can be `string` or {object}!
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                })
            }
        )
        let data = await response.json()
        console.log(data)
        // if(data.addBoard){
        //     let state=this.state.boards
        //     state.push({
        //         bid:data.bid,
        //         title:data.title
        //     })
        // }
        this.fetchBoard()
    }

    render() {
        const {isAddBoard,closeAddBoardClick} = this.props
        // console.log('isAddBoard is ',isAddBoard,this.props)
        return (
            <div className={isAddBoard?"add_board_show":"add_board_hide"}>
            {
                isAddBoard &&
                <div>
                    <form>
                        <div>
                            <input 
                                name="boardtitle"
                                value={this.state.boardtitle} 
                                onChange={this.handleInputChange}
                            >
                            </input>
                            <button onClick={closeAddBoardClick}></button>
                        </div>
                        <button></button>
                    </form>
                </div>
            }
            </div>
        )
    }
}
function mapStateToProps(state, ownProps) {
    console.log('state is in 33',state)
    return {
        isAddBoard:state.boardReducer.isAddBoard
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addBoardClick: value=>dispatch({
            type:'addBoard',
            isAddBoard:false,
            value
        }),
        closeAddBoardClick:()=>dispatch({
            type:'closeAddBoard',
            isAddBoard:false
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBoard)