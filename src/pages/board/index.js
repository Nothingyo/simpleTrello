import React , {Component} from 'react'
import Header from '../header'
import BoardContent from './boardContent'

class Board extends Component {
    render(){
        return (
            <div className="main">
                <Header/>
                <div style={{display:'flex'}}>
                    <BoardContent/>
                </div>
            </div>
        )
    }
}

export default Board