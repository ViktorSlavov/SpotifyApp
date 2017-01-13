import React from 'react';

class SlideArtist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            check: '',//this.props.checked,
            class: 'artistContainer'
        }
    }

    handleClick(){
        
        let active = this.findIndex(this.props.artists,this.props.name)+1;
       
        let ph = this.props.check;
        if(ph == ''){
            this.props.populate(
                {
                    name: this.props.name,
                    selected: true,
                   // removed: true
                }
            )
        } else {
            this.props.populate(
                {
                    name: this.props.name,
                    selected: false,
                   // removed:false,
                }
            )
        }
        this.props.setActive(active);
        
    }

    findIndex(selection,value){
        selection = selection.filter( elem => elem.removed == false);
        for(let i = 0; i < selection.length; i++){
            if(selection[i]['name'] == value){
                return i;
            }
        }
    }

    render() {

        return (
            <div className={this.state.class}>
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
