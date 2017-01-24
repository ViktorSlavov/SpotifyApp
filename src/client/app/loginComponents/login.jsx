import React from 'react';

const url = 'https://accounts.spotify.com/authorize?';
const redirect = window.location.href.split(':3000')[0]+':3000'+'/callback';
const requestOptions = {
    'response_type': 'token',
    'client_id': 'f17e400b61954282b60c821e78394fc4',
    'client_secret': '27255743bc7d43b8923bfba33e6dd39f',
    'scope': 'user-top-read playlist-modify-public',
    'redirect_uri': redirect,
    'state': (function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
    })(16)
}

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            spotifyAuthUrl: '',
            token: ''
        }
    }

    componentDidMount(){
        var spotifyAuthUrl = url;
        for(let key in requestOptions){
            spotifyAuthUrl += `&${key}=${requestOptions[key]}`;
        }
        //this.setState({spotifyAuthUrl});
        window.open(spotifyAuthUrl,"_self");
    }
    

    render(){
        return (
            <div className="login">Loading...</div>
        )
    }
}

export default Login;