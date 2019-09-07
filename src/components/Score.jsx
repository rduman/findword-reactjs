import React, { Component } from 'react'

export default class Score extends Component {
    render() {
        const { totalScore, charactersScore, timer } = this.props;
        return (
            <div>
                <div className="d-flex">
                    <div className="mr-4">Total Score : {totalScore}</div>
                    <div className="mr-4">Word Score : {charactersScore}</div>
                    <div className="mr-4">Remaining Time: {timer} </div>
                </div>
            </div>
        )
    }
}
