import React from 'react';
import SpotifyApi from './spotifyApi.jsx';
import {Link} from 'react-router';
import SliderArtists from './artistsSelectionComponents/sliderArtists.jsx';
import SearchArtists from './artistsSelectionComponents/searchArtists.jsx';
import SelectedArtists from './artistsSelectionComponents/selectedArtists.jsx';
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            top: '',
            artists: '',
            authenticated: '',
            topSliderArtists: [],
            selectedArtists: [],
        }
    }
   populateSelectedArtists(value){
       this.setState({
           selectedArtists: value
       })
   }
   componentWillMount(){
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
                that.setState({
                    artists: topArtists,
                    topSliderArtists: results,
                })
            })   
   }     
    
    render(){
         let that = this;
         let content = null;
         if (this.state.authenticated == true) {
            
            content = (
                <div>
                    <SliderArtists artists={this.state.topSliderArtists} populate={(x)=>that.populateSelectedArtists(x)}/>
                    <SelectedArtists selected={this.state.selectedArtists}/>
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
