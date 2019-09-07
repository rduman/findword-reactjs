import React, { Component } from 'react'

export default class Finish extends Component {
    render() {
        const { finish, totalScore } = this.props;
        return (
            <div>
                {finish &&
                    <div className="card">
                        <div className="card-body">
                            Congratulate!!! Your score is: {totalScore}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
