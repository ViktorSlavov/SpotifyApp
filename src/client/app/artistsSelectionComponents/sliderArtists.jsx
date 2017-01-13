import React from 'react';
import Coverflow from 'react-coverflow';
import SlideArtist from './slideArtist.jsx';




class SliderArtists extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            artists: '',
            selected: [],
            active: 2,

        }
       // this.populateSelectedArtists = this.populateSelectedArtists.bind(this);
    }
    populateSelectedArtists(value){
       this.props.populate(value); 
       
    }

    
    setActiveSlider(value){
      this.setState({
        active:3
      })
     // console.log(this.state.active)
    }
    render() {
            console.log(`active is : ${this.props.artists[this.state.active].name}`);

      let that = this;
      let count = 0;
      let content  = this.props.artists.filter( elem => 
      elem.removed == false).map(elem=> 
      <SlideArtist src={elem.images[0].url} artists={this.props.artists} name={elem.name} test={this.state.active}
      setActive={(value)=>that.setActiveSlider(value)} check={elem.check} key={elem.images[0].url} populate={(x)=>that.populateSelectedArtists(x)}/>) //USE SlideArtist here
      return (
        <Coverflow
          width={1000}
          height={500}
          displayQuantityOfSide={2}
          navigation={true}
          enableHeading={false}
          active={this.state.active}
          >
          {content}
        </Coverflow>
      );
  }
}

export default SliderArtists;

