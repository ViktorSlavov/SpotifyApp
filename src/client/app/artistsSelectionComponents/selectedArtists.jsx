import React from 'react';

class SelectedArtists extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            artists: ''
        }
    }

    render(){
        let content = this.props.selected.map(function(elem){
            console.log(elem);
            return <p>{elem}</p>
        })
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default SelectedArtists;