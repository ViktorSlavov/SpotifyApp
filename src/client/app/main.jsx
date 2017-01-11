import React from 'react'

class Main extends React.Component {
    render(){
        return (
            <div>
            <div className="bannerContainer">
                <div className="skewedBanner">Artists</div>
                <div className="skewedBanner">Filter</div>
                <div className="skewedBanner">Create your playlist</div>
            </div>
            {this.props.children}
            </div>
        )
    }
}

export default Main;