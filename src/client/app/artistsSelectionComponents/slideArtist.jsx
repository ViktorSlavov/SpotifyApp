import React from 'react';


class SlideArtist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            check: '',//this.props.checked,
        }
    }

    handleClick(){
        let ph = this.props.check;
        if(ph == ''){
            this.props.populate(
                {
                    name: this.props.name,
                    selected: true
                }
            )
        } else {
            this.props.populate(
                {
                    name: this.props.name,
                    selected: false
                }
            )
        }
    }

    render() {
        return (
            <div className="artistContainer">
                <svg height="80" width="80" className="badge"> 
                    <circle cx="25" cy="25" r="20" stroke="grey" strokeWidth="2" fill="#fff" onClick={()=>this.handleClick()}/>
                    <text fill="green" fontSize="20" x="35%" y="44%" textAnchor="middle">{this.props.check}</text>
                </svg> 
                <img src={this.props.src} className="coverflow__cover__25-7e"/>
                <div className="coverflow__text__39hqd">{this.props.name}</div>
            </div>
        )
    }
}


export default SlideArtist; 
