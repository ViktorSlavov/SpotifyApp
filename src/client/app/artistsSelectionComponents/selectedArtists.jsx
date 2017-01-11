import React from 'react';

class SelectedArtists extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            artists: ''
        }
    }

    updateSelected(e){
        e.stopPropagation();
        let targetName = e.target.parentElement.value;
        let phSelected = this.props.selected.map(function(elem){
            if(elem.name == targetName){
                elem.selected = !elem.selected;
                elem.check = (elem.check == "\uf00c" ? '':'\uf00c');
            }
        })
        this.props.populate(phSelected);
    }

    render(){
        let that = this;
        let content = this.props.selected.map(function(elem){
             if(elem.selected == true){                
                return (
                    <div>
                        <span class="left">{elem.name}</span>
                        <button value={elem.name} class="buttonRemove left"><i class="fa fa-times fa-1x"></i></button>
                    </div>
                )
            }
        })
        return (
            <div className="container">
                
                    {content}
               
            </div>
        )
    }
}

export default SelectedArtists;