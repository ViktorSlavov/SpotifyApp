import React from 'react';
import SpotifyApi from './spotifyApi.jsx';
import {Link} from 'react-router';
import SliderArtists from './artistsSelectionComponents/sliderArtists.jsx';
import SearchArtists from './artistsSelectionComponents/searchArtists.jsx';
import SelectedArtists from './artistsSelectionComponents/selectedArtists.jsx';
import Banner from './mainDesign/banner.jsx';
class Home extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            artists: '',
            authenticated: '',
            savedStates : [],
            topSliderArtists: [],
            selectedArtists: [], //need this one to maintain the correct order of choices;
            songs: [],
            relatedArtists: [],
            numberOfItems: 2,
            createPlaylistButton: 'playlistButton'
        }
        
    }
   populateSelectedArtists(value,action){
       let that = this;
       let phSelected;
       if(action == 'Reorder'){
           phSelected = this.state.topSliderArtists;
           let first = phSelected[0];
           phSelected[0] = phSelected[value];
           phSelected[value] = first;
                      console.log(phSelected);

           this.setState({
               topSliderArtists: phSelected
           })
       }
       else if(action == 'Add'){
           let phSelected = this.state.selectedArtists;
           phSelected.push(value);
           this.setState({
               selectedArtists: phSelected,
           })
       }
       else if (action == "Related"){

           SpotifyApi.getRelatedArtists(that.state.token,value).then(function(results){
                    let ph = that.state.savedStates;
                    let newArtists = [that.state.topSliderArtists[0]].concat(results.artists);
                    ph.push(that.state.topSliderArtists);
                    that.setState({
                        relatedArtists: [that.state.topSliderArtists[0]].concat(results.artists),    //set the clicked to be the first and then add related artists around it
                        savedStates: ph, // push the previous artist into saved states so we can get to them with back button
                        topSliderArtists: [that.state.topSliderArtists[0]].concat(results.artists),  // set the rendered artists to related   
                    })
            })
           
       }
       else if(action == 'Back'){
           this.setState({
               topSliderArtists: this.state.savedStates.pop(),
           })
       }
       
   }

   componentWillMount(){
       let selected;
        try {
            console.log("Try state", this.props.location.state.artists)
            selected = this.props.location.state.artists;
        }
        catch(e){
            console.log(e)
        }
        if (selected != undefined){
            this.setState({
                topSliderArtists: selected
            })
        } else {
            let topArtists;
            let that = this;
            SpotifyApi.getTop(this.state.token).then(function(results){
                topArtists = results.map(function(elem){
                    return (
                            <li key={elem.id} id={elem.id}>
                                <p>{elem.name}</p>
                                <img src={elem.images[0].url} width="100" height="100"/>
                            </li>
                    )
                })
                results = results.map(function(elem){
                    elem.selected = false;
                    elem.check = '';
                    elem.songsCheck = false;
                    return elem;
                })
                that.setState({
                    artists: topArtists,
                    topSliderArtists: results,
                    savedStates: [results],
                })
                
            })
            
        }
    
       
   }     
    
    render(){
         let that = this;
         let content = null;
         if (this.state.authenticated == true) {
            
            content = (
                <div>
                    <Banner/>
                    <div>
                        <SliderArtists artists={this.state.topSliderArtists} active={4} savedStates={this.state.savedStates.length}
                        populate={(selected,action)=>that.populateSelectedArtists(selected,action)}/>
                        
                        <Link className={this.state.createPlaylistButton} to={{ pathname: 'filter', state: { artists: that.state.topSliderArtists } }} >Create playlist</Link>
                        <SelectedArtists populate={(elem)=>that.populateSelectedArtists(elem)}  
                         selected={this.state.selectedArtists}/>
                        
                    </div>
                    
                </div>
            )
        } else {
             var x = SpotifyApi.getTop(this.state.token).then(function(results){
                 that.setState({
                     authenticated: true
                 })
                },function(error){
                    let redirect = window.location.href.split(':3000')[0]+':3000'+'/login';
                    window.open(redirect,"_self");
            });
            content = <div></div>
        }
        
           
       
            return(
                 <div>
                        {content}
                </div>
            )

    } 
    
}

export default Home;
