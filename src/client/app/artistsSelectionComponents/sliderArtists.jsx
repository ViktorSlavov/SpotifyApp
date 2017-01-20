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
    populateSelectedArtists(value){
       this.props.populate(value); 
       
    }

    
    setActiveSlider(value){
      console.log(value);
      this.setState({
        active:value
      })
     
    }
    render() {
      let that = this;
      let count = 0;
      let content  = this.props.artists.filter( elem => 
      elem.selected == false).map((elem,index)=> 
      <SlideArtist src={elem.images[0].url} artists={this.props.artists} name={elem.name} test={this.state.active}
      setActive={(value)=>that.setActiveSlider(value)} index={index} check={elem.check} key={elem.images[0].url} populate={(x)=>that.populateSelectedArtists(x)}/>) //USE SlideArtist here
      return (
        <div className="container artists">
          {content}
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