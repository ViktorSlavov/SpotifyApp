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
            criteria: {},
            songs: []
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
    getAllSongs(){
        let that = this;
        const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
        let missingArtists = this.state.artists;
        console.log(missingArtists);
        missingArtists.map(function(elem){
            if(elem.songCheck == true){
                elem.skipCheck == true;
            }
            return elem
        })
        console.log(this.state.artists)
        let allSongs = [];
        let albums = [];
        for (let i=0; i<missingArtists.length; i++){
            if(missingArtists[i].skipCheck != true && missingArtists[i].selected == true){
                let req = SpotifyApi.getArtistAlbums(this.state.token, missingArtists[i].id, missingArtists[i].name);
                albums.push(req);
                missingArtists[i].songCheck = true;
            }
        }
        Promise.all(albums).then(function(results){
            let tracks = [];
            results = flatten(results)
            for(let i=0; i<results.length; i++){
                let req = SpotifyApi.getAlbumTracks(that.state.token, results[i].id,results[i].artistName);
                tracks.push(req);
            }
            Promise.all(tracks).then(function(results){
                results = flatten(results);
                console.log("Tracks results : ", results)
                let trackFeatures = [];
                let stringOfIds = "";
                let names, artists = [];
                for(let i=0; i<results.length; i+=99){
                    stringOfIds = results.slice(i,i+99).map(function(elem){ return elem.id}).join(',');
                    names = results.slice(i,i+99).map(function(elem){ return elem.name});
                    artists = results.slice(i,i+99).map(function(elem){ return elem.artistName});
                    //console.log("String of IDs : ", stringOfIds);
                    let req = SpotifyApi.getTrackFeatures(that.state.token, stringOfIds, artists, names);
                    trackFeatures.push(req)
                }
                Promise.all(trackFeatures).then(function(results){
                    console.log(results)
                    results = flatten(results);
                    allSongs = results
                    that.setState({
                        songs : allSongs
                    })
                })
            })
            console.log(that.state.songs)
        })
        // for(let i=0; i<missingArtists.length; i++){
        //     SpotifyApi.getArtistAlbums(that.state.token, missingArtists[i].id).then(function(results){
        //         for(let j=0; j<results.length;j++){
        //             SpotifyApi.getAlbumTracks(that.state.token, results[i].id).then(function(results){
        //                 allSongs.push(results);
        //             })
        //         }
        //     })
        // }
    }
    componentWillMount(){
        let that = this;
        let artistsArray = this.props.location.state.artists;
        console.log(" In Filter : ", artistsArray);
        this.setState({
            artists: artistsArray
        })
        
        
    }
    componentDidMount(){
        this.getAllSongs();
        console.log(this.state.songs);
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
        <button onClick={() => console.log(this.state.songs)}>Console log</button>
        <button><Link to={{ pathname: 'home', state: { artists: that.state.artists} }}>Back to selection</Link></button>
        <button onClick={() => console.log(this.state.criteria)/*SpotifyApi.getCurrentUserId(this.state.token, "Awesome spotify api playlist")*/}>Create playlist</button>
            </div>
        )
    }
}

export default AudioFilterContainer;