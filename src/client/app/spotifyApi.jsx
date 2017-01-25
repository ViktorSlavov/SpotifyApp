let SpotifyApi = {
     getTop : function(token){
         return new Promise(function(resolve,reject){
                let req = new XMLHttpRequest();
                let auth = `Bearer ${token}`;
                req.onreadystatechange = function(data) {
                    if (this.readyState == 4 && this.status == 200) {
                        // that.setState({
                        //     top:JSON.parse(data.currentTarget.response)
                        // })
                        resolve(JSON.parse(data.currentTarget.response).items);
                    }
                    else if(this.readyState == 4 && this.status != 200){
                         reject('Error');
                    }
                };
                req.open("GET", 'https://api.spotify.com/v1/me/top/artists',true);
                req.setRequestHeader('Authorization',auth,false)
                req.send();
         })
    },
    getRelatedArtists : function (token, artistId){
        return new Promise(function(resolve,reject){
            let req = new XMLHttpRequest();
            let auth = `Bearer ${token}`;
            let id = `https://api.spotify.com/v1/artists/${artistId}/related-artists`
            req.onreadystatechange = function(data) {
                if (this.readyState == 4 && this.status == 200) {
                    let results = JSON.parse(data.currentTarget.response);
                    resolve(results);
                    // resolve(JSON.parse(data.currentTarget.response).audio_features.map(function(elem, index){
                    //     elem.artist = artists.artist[index]
                    //     elem.name = artists.names[names]
                    //     return elem
                    // }));
                } else if (this.readyState == 4 && this.status != 200){
                    reject('Error');
                }
            };
            req.open("GET", id,true);
            req.setRequestHeader('Authorization',auth,true)
            req.send();
        })
    },
    createPlaylist : function(userId, token, playlistName, songs, name){
        let that = this;
            let params = JSON.stringify({
                
                    name : name
                
            })
            let req = new XMLHttpRequest();
            let auth = `Bearer ${token}`;
            req.onreadystatechange = function(data) {
                    if (this.readyState == 4 && this.status == 201) {
                        // that.setState({
                        //     top:JSON.parse(data.currentTarget.response)
                        // })
                        console.log("Playlist created!");
                        that.addSongs(userId, token, JSON.parse(data.currentTarget.response).id,songs)
                    }
                    else if(this.readyState == 4 && this.status != 201){
                         console.log('Error creating playlist');
                    }
            };
            req.open("POST", 'https://api.spotify.com/v1/users/' + userId + '/playlists',true);
            req.setRequestHeader('Authorization',auth,false)
            req.send(params);
    },
    addSongs : function(userId, token, playlistId, songs, name){
        let that = this;
        let songURIs = songs.map(function(elem){
            elem = elem.uri;
            return elem
        })
        console.log(songs,songURIs)
            let params = JSON.stringify({
                    uris : songURIs
            })
            let req = new XMLHttpRequest();
            let auth = `Bearer ${token}`;
            req.onreadystatechange = function(data) {
                    if (this.readyState == 4 && this.status == 200) {
                        // that.setState({
                        //     top:JSON.parse(data.currentTarget.response)
                        // })
                        JSON.parse(data.currentTarget.response).id;
                    }
                    else if(this.readyState == 4 && this.status != 200){
                         console.log(req.response);
                    }
            };
            req.open("POST", 'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + "/tracks",true);
            console.log(auth)
            req.setRequestHeader('Authorization',auth,false)
            req.send(params);
    }, 
    getCurrentUserId : function(token, playlistName, songs, name){
        let that = this;
            let req = new XMLHttpRequest();
            let auth = `Bearer ${token}`;
            req.onreadystatechange = function(data) {
                    if (this.readyState == 4 && this.status == 200) {
                        // that.setState({
                        //     top:JSON.parse(data.currentTarget.response)
                        // })
                        that.createPlaylist(JSON.parse(data.currentTarget.response).id, token, playlistName, songs, name);
                    }
                    else if(this.readyState == 4 && this.status != 200){
                         reject('Error');
                    }
            };
            req.open("GET", 'https://api.spotify.com/v1/me',true);
            req.setRequestHeader('Authorization',auth,false)
            req.send();
    },
    filterTracks : function(tracks){
        let count = 50;
        
    },
    getArtistAlbums : function(token, artist, artistName){
        console.log(artist);
        return new Promise(function(resolve,reject){
            let req = new XMLHttpRequest();
            let auth = `Bearer ${token}`;
            let id = 'https://api.spotify.com/v1/artists/'+artist+'/albums';
            req.onreadystatechange = function(data) {
                if (this.readyState == 4 && this.status == 200) {
                    let results = JSON.parse(data.currentTarget.response).items.map(function(elem){
                        elem.artistName = artistName;
                        return elem
                    })
                    resolve(results);
                } else if (this.readyState == 4 && this.status != 200){
                    reject('Error');
                }
            };
            req.open("GET", id,true);
            req.setRequestHeader('Authorization',auth,true)
            req.send();
        })
    },
    getAlbumTracks : function(token, album, artistName){
        return new Promise(function(resolve,reject){
            let req = new XMLHttpRequest();
            let auth = `Bearer ${token}`;
            let id = 'https://api.spotify.com/v1/albums/'+album;
            req.onreadystatechange = function(data) {
                if (this.readyState == 4 && this.status == 200) {
                    let results = JSON.parse(data.currentTarget.response).tracks.items.map(function(elem){
                        elem.artistName = artistName;
                        return elem
                    })
                    resolve(results);
                    console.log("tracks: ",results)
                } else if (this.readyState == 4 && this.status != 200){
                    reject('Error');
                }
            };
            req.open("GET", id,true);
            req.setRequestHeader('Authorization',auth,true)
            req.send();
        })
    },
    getTrackFeatures : function(token, tracks, artists, songNames){
        return new Promise(function(resolve,reject){
            let req = new XMLHttpRequest();
            let auth = `Bearer ${token}`;
            let id = 'https://api.spotify.com/v1/audio-features/?ids='+tracks;
            req.onreadystatechange = function(data) {
                if (this.readyState == 4 && this.status == 200) {
                    let results = JSON.parse(data.currentTarget.response).audio_features.map(function(elem, index){
                        elem.artistName = artists[index]
                        elem.songName = songNames[index]
                        return elem
                    })
                    resolve(results);
                    // resolve(JSON.parse(data.currentTarget.response).audio_features.map(function(elem, index){
                    //     elem.artist = artists.artist[index]
                    //     elem.name = artists.names[names]
                    //     return elem
                    // }));
                } else if (this.readyState == 4 && this.status != 200){
                    reject('Error');
                }
            };
            req.open("GET", id,true);
            req.setRequestHeader('Authorization',auth,true)
            req.send();
        })
    },
    sortSongs(allSongs, criteria, songCount, mod, feature, prevArray){
        let that=this;
        let sortedSongs = allSongs;
        prevArray = prevArray || [];
        mod = mod || 0;
        feature = feature || "";
        let topCriteria = 0;
        let minCriteria = 100;
        let topKey = "";
        let minKey = "";
        if(feature != ""){
            //console.log("Editing feature: ",feature, "; Min: ",criteria[feature].min,"; Max: ", criteria[feature].max)
            criteria[feature].min -= mod;
            criteria[feature].max += mod;
        }
        
        for(let key in criteria){
            // if(key == feature){
            //     sortedSongs = sortedSongs.filter(function(elem){
            //         return elem[key]*100 > (criteria[key].min - mod) && elem[key]*100 <= (criteria[key].max + mod)
            //     })
            // } else {
                sortedSongs = sortedSongs.filter(function(elem){
                    return elem[key]*100 > criteria[key].min && elem[key]*100 <= criteria[key].max
                })
            // }
            let modStr = criteria[key].max - criteria[key].min;
            
            // if(key == feature){
            //     criteria[key].max - criteria[key].min + mod;
            // } else {
            //     criteria[key].max - criteria[key].min
            // }
            if(modStr < minCriteria){
                minCriteria = modStr;
                minKey = key
            }
            if(modStr > topCriteria){
                topCriteria = modStr;
                topKey = key;
            }
        }
        // sortedSongs.sort(function(a,b){
        //     return a[topKey] - b[topKey]
        // })
        let usedSongs = [];
        console.log(sortedSongs);
        sortedSongs = sortedSongs.map(function(elem){
            if(usedSongs.indexOf(elem.songName.toLowerCase()) < 0){
                usedSongs.push(elem.songName.toLowerCase())
                return elem
            } else {
                return null
            }
        })
        sortedSongs = sortedSongs.filter(function(elem){
            return !!elem
        })
        sortedSongs.push.apply(sortedSongs,prevArray)
        console.log("Sorted Songs Length: ", sortedSongs.length, " Sorted Songs: ", sortedSongs, " allSongs length: ", allSongs.length);
        if(sortedSongs.length < songCount){
            allSongs = allSongs.map(function(elem){
                if(usedSongs.indexOf(elem.songName.toLowerCase()) > -1){
                    return null
                } else {
                    return elem;
                }
            })
            allSongs = allSongs.filter(function(elem){
                return !!elem
            })
            console.log("All songs length: ", allSongs.length)
            return SpotifyApi.sortSongs(allSongs, criteria, songCount,10, minKey, sortedSongs);
        } else {
             return sortedSongs = sortedSongs.slice(0,songCount);
        }  
    }  
}



export default SpotifyApi;

// let auth = 'Bearer '+localStorage.getItem('token'); 
// let artists = ['1Qp56T7n950O3EGMsSl81D','6mdiAmATAx73kdxrNrnlao','5LfGQac0EIXyAN8aUwmNAQ'];
// let promises = [];
// for(let i = 0; i < artists.length; i++){
//     let req = new Promise(function(resolve, reject){
//             let id = 'https://api.spotify.com/v1/artists/'+artists[i]+'/albums';
//             let req = new XMLHttpRequest();
//             req.onreadystatechange = function(data) {
//                 if (this.readyState == 4 && this.status == 200) {
//                     resolve(JSON.parse(data.currentTarget.response).items);
//                 }
//             };
//             req.open("GET", id,true);
//             req.setRequestHeader('Authorization',auth,true)
//             req.send();
//     })
//     promises.push(req);
// }

// Promise.all(promises).then(function(results){
//         let promises = [];
//         results = [].concat.apply([], results);//merge the arrays into one
//         for(let i = 0; i < results.length; i++){
//             let req = new Promise(function(resolve, reject){
//                 let id = 'https://api.spotify.com/v1/albums/'+results[i].id;
//                 let req = new XMLHttpRequest();
//                 req.onreadystatechange = function(data) {
//                     if (this.readyState == 4 && this.status == 200) {
//                         resolve(JSON.parse(data.currentTarget.response).tracks.items);
//                     };
//                 }
//                 req.open("GET", id,true);
//                 req.setRequestHeader('Authorization',auth,true)
//                 req.send();
//             })
//         promises.push(req);
//     }
//     Promise.all(promises).then(function(results){
//         let promises = []; 
//         let tracks = [];
//         results = [].concat.apply([], results);
//         for(let i = 0; i < results.length; i+=99){ 
//             let req = new Promise(function(resolve, reject){
//                 let stringOfIds  = results.slice(i,i+99).map(function(elem){ return elem.id}).join(',');
//                 let id = 'https://api.spotify.com/v1/audio-features/?ids='+stringOfIds;
//                 let req = new XMLHttpRequest();
//                 req.onreadystatechange = function(data) {
//                     if (this.readyState == 4 && this.status == 200) {
//                         resolve({
//                            audio: JSON.parse(data.currentTarget.response),
//                            names: results.slice(i,i+99)
//                         });
//                     };
//                 }
//                 req.open("GET", id,true);
//                 req.setRequestHeader('Authorization',auth,true)
//                 req.send();
//             })
//             promises.push(req);
//         }
//         Promise.all(promises).then(function(results){
//             results = [].concat.apply([], results);
//             console.log(results);
//         });
//     })
// })




