import React, { Component } from 'react'

export default class Character extends Component {
    render() {
        const {open,value, index} = this.props;
        return (
            <div>
                
                <div className="letter shadow-sm bg-dark text-white mr-3" key={"key-" + index}>
                    {open && <span>{value}</span>}
                </div>
            </div>
        )
    }
}
