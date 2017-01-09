import React from 'react';
import Coverflow from 'react-coverflow';
import SlideArtist from './slideArtist.jsx';


class SliderArtists extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            artists: '',
            selected: [],
        }
       // this.populateSelectedArtists = this.populateSelectedArtists.bind(this);
    }
    populateSelectedArtists(value){
       this.props.populate(value);  
            
    }

    render() {
      let that = this;
      let content = this.props.artists.map(function(elem){
        console.log(elem.check,elem.selected);
            return <SlideArtist src={elem.images[0].url} name={elem.name} check={elem.check} key={elem.images[0].url} populate={(x)=>that.populateSelectedArtists(x)}/> //USE SlideArtist here
      })
      return (
        <Coverflow
          width={500}
          height={400}
          displayQuantityOfSide={1}
          navigation={false}
          enableHeading={true}
          >
          {content}
        </Coverflow>
      );
  }
}

export default SliderArtists;

