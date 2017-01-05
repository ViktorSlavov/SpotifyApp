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
    createPlaylist : function(userId, token, playlistName, songs){
        return new Promise(function(resolve,reject){
            let params = JSON.stringify({
                
                    name : "Spotify Api Playlist Test"
                
            })
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
            req.open("POST", 'https://api.spotify.com/v1/users/' + userId + '/playlists',true);
            console.log(auth)
            req.setRequestHeader('Authorization',auth,false)
            req.send(params);
        })
    },
    getCurrentUserId : function(token, playlistName, songs){
        let that = this;
        return new Promise(function(resolve,reject){
            let req = new XMLHttpRequest();
            let auth = `Bearer ${token}`;
            req.onreadystatechange = function(data) {
                    if (this.readyState == 4 && this.status == 200) {
                        // that.setState({
                        //     top:JSON.parse(data.currentTarget.response)
                        // })
                        that.createPlaylist(JSON.parse(data.currentTarget.response).id, token, playlistName, songs);
                    }
                    else if(this.readyState == 4 && this.status != 200){
                         reject('Error');
                    }
            };
            req.open("GET", 'https://api.spotify.com/v1/me',true);
            console.log(auth)
            req.setRequestHeader('Authorization',auth,false)
            req.send();
        })
    },
    filterTracks : function(tracks){
        let count = 50;
        
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




