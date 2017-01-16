import React from 'react';

class SelectedArtists extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            artists: '',
        }
    }

    updateSelected(e){
        e.stopPropagation();
        let targetName = e.target.parentElement.value;
        let phSelected = this.props.selected.map(function(elem){
            if(elem.name == targetName){
                elem.selected = !elem.selected;
                elem.check = (elem.check == "\uf00c" ? '':'\uf00c');
                elem.removed = false;
            }
        })
        this.props.populate(phSelected);
    }

    render(){
        let that = this;
        let content = this.props.selected.reverse().map(function(elem){
             if(elem.selected == true){                
                return (
                    <li className="selectedContainer fadeInAnimation">
                        <img className="selectedArtistsImage"src={elem.images[0].url}/>
                        <span className="left">{elem.name}</span>
                        <button value={elem.name} className="buttonRemove left"><i onClick={(e)=>that.updateSelected(e)} className="fa fa-times fa-1x"></i></button>
                    </li>
                )
            }
        })
        return (
            <div className="container">
                <ul >
                        {content}
                </ul>
            </div>
        )
    }
}

export default SelectedArtists;