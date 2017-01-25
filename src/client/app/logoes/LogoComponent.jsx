import React from 'react';
import Bubble from './bubble.jsx';

export class LogoComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startPosition : 10
        }
    }
    render(){
        return(
            <div className="logo-container">
            <div className="tube-container">
            <Bubble positionH={this.state.startPosition} size="small"></Bubble>
                <div className="liquid-container"></div>
            
            </div>
            <button onClick={() => {this.setState({ startPosition : Math.floor(Math.random()*100) + 5}); console.log(this.state.startPosition)}}>Click here!</button>
            </div>
        )
    }
}
//
export default LogoComponent