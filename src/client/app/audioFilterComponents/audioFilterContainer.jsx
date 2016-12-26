import React from 'react';
import {SortableContainer, SortableElement, arrayMove,SortableHandle } from 'react-sortable-hoc';
import {render} from 'react-dom';
import AudioFilter from './audioFilter.jsx';



const SortableItem = SortableElement(({value}) => 
    (
            <li className="filters">
                    <AudioFilter value={value} />
            </li>
    )
);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((value, index) =>
                <SortableItem key={`item-${index}`} index={index} value={value} />
            )}
        </ul>
    );
});

class AudioFilterContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: ['Dance', 'Instrumental', 'Vocals', 'Energy', 'Beats per minute', 'Audiance included']
        }
    }
    
    onSortEnd({oldIndex, newIndex},e) {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
        console.log(this.state.items)
    }
    render() {
        return (
            <div className="filterContainer">
                <SortableList className="filters" items={this.state.items} onSortEnd={(event)=>this.onSortEnd(event)} useDragHandle={true}/>
                <button>Create playlist</button>
            </div>
        )
    }
}

export default AudioFilterContainer;