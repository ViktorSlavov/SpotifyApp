import React from 'react';
import {Link} from 'react-router';
import {SortableContainer, SortableElement, arrayMove,SortableHandle } from 'react-sortable-hoc';
import {render} from 'react-dom';
import AudioFilter from './audioFilter.jsx';
import SpotifyApi from '../spotifyApi.jsx';

// const SortableItem = SortableElement(({value}) => 
//     (
            
//     )
// );

// const SortableList = SortableContainer(({items}) => {
//     return (
//         <ul>
            
//         </ul>
//     );
// });

class AudioFilterContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            artists: [],
            token: localStorage.getItem('token'),
            items: ['Dance', 'Instrumental', 'Vocals', 'Energy', 'Beats per minute', 'Audiance included'],
            criteria: {}
        }
    }
    
    onSortEnd({oldIndex, newIndex},e) {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    }
    updateCriteria(values, name){
        let newCrit = this.state.criteria
        newCrit[name] = values;
        this.setState({
            criteria : newCrit
        })
    }
    componentWillMount(){
        let that = this;
        let artistsArray = this.props.location.state.artists;
        console.log(" In Filter : ", artistsArray);
        this.setState({
            artists: artistsArray
        })
    }
    render() {
        let that = this;
        return (
            <div className="filterContainer">
                <ul onChange={(event) => this.onSortEnd(event)} className="filters">
                    {this.state.items.map((value, index) =>
                        <li className="filters" key={value}>
                            <AudioFilter value={value} criteriaUpdate={(values,name) => this.updateCriteria(values,name)}/>
                        </li>
                    )}
                </ul>
        <button><Link to={{ pathname: 'home', state: { artists: that.state.artists} }}>Back to selection</Link></button>
        <button onClick={() => console.log(this.state.criteria)/*SpotifyApi.getCurrentUserId(this.state.token, "Awesome spotify api playlist")*/}>Create playlist</button>
            </div>
        )
    }
}

export default AudioFilterContainer;