import React from 'react';

class Callback extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: ''
        }
    } 
    componentDidMount(){
        window.localStorage.setItem('token',window.location.href.split('token=')[1].split('&token_type')[0]);
        let redirect = window.location.href.split(':3000')[0]+':3000'+'/home';
        window.open(redirect,'_self');
        
    }
    render(){
        return (
            <p> {this.state.token}</p>
        )
    }
}

export default Callback;
