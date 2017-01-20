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
            topSliderArtists: [],
            selectedArtists: [], //need this one to maintain the correct order of choices;
            songs: [],
            numberOfItems: 2,
            createPlaylistButton: 'playlistButton hide'
        }
        
    }
   populateSelectedArtists(value,numberOfItems){
       let phSelected = this.state.topSliderArtists;
       let orderOfSelection = this.state.selectedArtists;
       phSelected.map(function(elem){
           if(elem.name == value.name){
               elem.selected = !elem.selected;
               elem.check = (elem.check == "\uf00c" ? '':'\uf00c');
               orderOfSelection.push(elem);
           }
           return elem;
       })
       orderOfSelection =  orderOfSelection.filter(elem => elem.selected == true);
       this.setState({
           topSliderArtists: phSelected,
           selectedArtists: orderOfSelection,
           createPlaylistButton: orderOfSelection.length > 0 ? 'playlistButton':'playlistButton hide',
           numberOfItems: numberOfItems > 2 ? numberOfItems: 2
       })
       
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
                        <SliderArtists artists={this.state.topSliderArtists} active={4}  
                        populate={(selected,numberOfItems)=>that.populateSelectedArtists(selected,numberOfItems)}/>
                        
                        <Link className={this.state.createPlaylistButton} to={{ pathname: 'filter', state: { artists: that.state.topSliderArtists } }} >Create playlist</Link>
                        <SelectedArtists populate={(elem)=>that.populateSelectedArtists(elem)} getNumberOfItems={(value)=>that.setItemsNumber(value)} 
                        numberOfItems={that.state.numberOfItems} selected={this.state.selectedArtists}/>
                        
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
