import React from 'react';

class SlideArtist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            check: '',//this.props.checked,
            class: 'artistContainer'
        }
    }

    handleClick(e){
        if(e.target.parentElement.parentElement.attributes.style.nodeValue.indexOf('opacity: 1') > -1){ //Only center element can be selected. Needs rework
            this.setClass(true);

            let that = this;
            setTimeout(function(){let active = that.findIndex(that.props.artists,that.props.name);
        
            let ph = that.props.check;
            if(ph == ''){
                that.props.populate(
                    {
                        name: that.props.name,
                        selected: true,
                        removed: true
                    }
                )
            } else {
                that.props.populate(
                    {
                        name: that.props.name,
                        selected: false,
                        removed:false,
                    }
                )
            }
            that.props.setActive(active);
            },300)
        }
    }

    setClass(){
       this.setState({
           class: 'artistContainer left'
       })
           
    }

    findIndex(selection,value){
       selection = selection.filter( elem => elem.removed == false);
        for(let i = 0; i < selection.length; i++){
            if(selection[i]['name'] == value){
                console.log('Selection length'+selection.length);
                if(i == 0 ){
                    i = 0;
                    return i;
                }
                else if(i == selection.length - 1){
                    i = selection.length-3;
                    return i;
                }else {
                    return i++;
                }
                
            }
        }
    }

    render() {

        return (
            <div className={this.state.class} onClick={(e)=>this.handleClick(e)}>
               
                <img src={this.props.src} className="coverflow__cover__25-7e"/>
                <div className="coverflow__text__39hqd">{this.props.name}</div>
            </div>
        )
    }
}


export default SlideArtist; 

//SVG Badge
// <svg height="80" width="80" className="badge">
//                     <circle cx="25" cy="25" r="20" stroke="grey" strokeWidth="2" fill="#fff" onClick={(e)=>this.handleClick(e)}/>
//                     <text fill="green" fontSize="20" x="35%" y="44%" textAnchor="middle">{this.props.check}</text>
//                 </svg>  