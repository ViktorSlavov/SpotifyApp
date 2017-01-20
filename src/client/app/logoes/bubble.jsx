import React from 'react';


export class Bubble extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            position : this.props.positionH,
            size: this.props.size
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            position: this.props.positionH
        })
    }
    render(){
        let that = this;
        let offSet = { marginLeft : `${that.state.position}%` };
        return(
            <div className={`bubble-${this.state.size}`} style={offSet}>
            </div>
        )
    }
}

export default Bubble