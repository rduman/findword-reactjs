import React, { Component } from 'react'
import Character from './Character';
export default class Questions extends Component {
    render() {
        const {question,characters}= this.props;
        return (
            <div>
                <div className="card-header"><h4 className="mb-0">{question}</h4></div>
                <div className="card-body">
                    <div className="characters d-flex">
                        {characters.map((chr, index) => (
                            <Character open={chr.open} value={chr.value} index={index} key={index}></Character>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
