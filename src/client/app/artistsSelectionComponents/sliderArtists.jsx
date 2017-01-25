import React from 'react';
import Coverflow from 'react-coverflow';
import SlideArtist from './slideArtist.jsx';




class SliderArtists extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            artists: '',
            selected: [],
            active: 3,

        }
       // this.populateSelectedArtists = this.populateSelectedArtists.bind(this);
    }

     clickAdd(){
        this.populateSelectedArtists(this.props.artists[0],'Add')
    }

    clickRelated(){
        this.populateSelectedArtists(this.props.artists[0].id,'Related');
    }

    clickBack(){
        this.populateSelectedArtists(0,'Back');
    }

    populateSelectedArtists(value,action){
       this.props.populate(value,action); 
       
    }

    render() {
      let that = this;
      let count = 0;
      let content  = this.props.artists.map((elem,index)=> 
      <SlideArtist src={elem.images[0].url} artists={this.props.artists} name={elem.name} test={this.state.active} id={elem.id} savedStates={this.props.savedStates}
      setActive={(value)=>that.setActiveSlider(value)} index={index} check={elem.check} key={elem.images[0].url} populate={(value,action)=>that.populateSelectedArtists(value,action)}/>) //USE SlideArtist here
      return (
        <div>
          <div className="container artists">
            {content}
            
          </div>
          <div className="selectedArtist">
            <p>{this.props.artists[0].name}</p>
            <i className="fa fa-plus fa-2x" value="Add" aria-hidden="true" alt="Add artists" onClick={()=>this.clickAdd()}></i>  
            <i className="fa fa-random fa-2x" value="Related" aria-hidden="true" alt="Get related artists" onClick={(e)=>this.clickRelated()}></i> 
            <i className="fa fa-undo fa-2x" value="Back" aria-hidden="true" alt="Go back" onClick={()=>this.clickBack()}></i>  
          </div>
        </div>
      );
  }
}

export default SliderArtists;

// <Coverflow
         
//             height={500}
//             displayQuantityOfSide={2}
//             navigation={false}
//             enableHeading={false}
//             active={this.state.active}
            
//             >
//             {content}
//           </Coverflow>