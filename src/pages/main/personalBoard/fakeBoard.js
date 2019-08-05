import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'

class BoardCard extends Component{

    constructor(props){
        super(props)
        this.state={
            isRedirect:false
        }
        console.log('this.props is ',props)
    }
    
    showBoard = () =>{
        this.setState={
            isRedirect:true
        }
    }

    render(){
        const {title}=this.props.content
        const {isRedirect} = this.state
        // console.log('title is',title)
        return (
            <li onClick={()=>this.showBoard()}>
                <a>
                    <div className="board_title_detail">{title}</div>
                    {
                        isRedirect && <Redirect to='/board'/>
                    }
                </a>
            </li>
        )
    }
}

export default BoardCard