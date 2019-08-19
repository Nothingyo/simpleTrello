import React,{Component} from 'react'
import addIconUrl from '../../../icons/add.png'
import './index.scss'
import ENV_ADDRESS from '../../../address'

class List extends Component{
    constructor(props){
        super(props)
        this.state={
            lid:props.e.lid,
            ltitle:props.e.title,
        }
    }

    // async fetchListCards(){
    //     let url = `http://${ENV_ADDRESS}:2000//`
    // }

    render(){

        // let showListCards=
        return (
            <div className="list-wrapper">
                <div className="fake-list">
                    <div className="list-header">{this.state.ltitle}</div>
                    <div className="list-cards">
                        {
                            // showListCards
                        }
                    </div>
                    <a 
                        className="open-card-composer"
                        // onClick={}
                    >
                        <span><img className="add-icon" src={addIconUrl}></img></span>
                        <span className="add-another-card">添加另一张卡片</span>
                    </a>

                </div>
            </div>
        )
    }
}

export default List