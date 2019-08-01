import React, { Component } from 'react'
import './index.scss'
import trelloBlueUrl from './../../../icons/trelloBlue.png'

class Nav extends Component {

    render() {
        return (
            <div className="board">
                <nav>
                    <a>
                        <span className="trello_icon"><img src={trelloBlueUrl}></img></span>
                        <span className="title">看板</span>
                    </a>
                </nav>
            </div>

        )
    }
}

export default Nav