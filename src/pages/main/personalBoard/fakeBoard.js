import React,{Component} from 'react'

class BoardCard extends Component{

    constructor(props){
        super(props)
        //console.log('this.props is ',props)
    }
    
    render(){
        const {title,detail}=this.props.content
        // console.log('title and detail is',title,detail)
        return (
            <li>
                <a>
                    <div className="board_title_detail">{title}</div>
                </a>
            </li>
        )
    }
}

export default BoardCard