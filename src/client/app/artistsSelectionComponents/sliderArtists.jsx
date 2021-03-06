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
       let flag = 0;
       let phSelected = this.state.selected;
       for(let i = 0; i < phSelected.length; i++){
          if(phSelected[i].artist == value.artist){
            phSelected[i].checked = value.checked;
            flag = 1;
            break;
          }
       }
       if(flag == 0){
         phSelected.push(value);
       }
       console.log(phSelected);
       this.props.populate(phSelected);
       this.setState({
         selected: phSelected,
       })
       
    }

    componentWillMount(){
      let that = this;
      let content = this.props.artists.map(function(elem){
            return <SlideArtist src={elem.images[0].url} name={elem.name} key={elem.images[0].url} populate={(x)=>that.populateSelectedArtists(x)}/> //USE SlideArtist here
      })
      this.setState({
        artists:content
      })
    }

    render() {
      return (
        <Coverflow
          width={500}
          height={400}
          displayQuantityOfSide={1}
          navigation={false}
          enableHeading={true}
          >
          {this.state.artists}
        </Coverflow>
      );
  }
}

export default SliderArtists;

