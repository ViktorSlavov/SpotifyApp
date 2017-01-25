import React from 'react';

class SelectedArtists extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            classContainers: 'selectedContainer hidden',
            showingAll: false,
            numberOfShownItems: 2
        }
    }

    componentWillReceiveProps(nextProps){
        let that = this;
        this.setState({
            classContainers: 'selectedContainer hidden',
            showingAll: false,
            numberOfShownItems: nextProps.numberOfItems > 2 ? nextProps.numberOfItems : 2
        })
    }

    updateSelected(e){
        e.stopPropagation();
        let targetName = e.target.parentElement.value;
        let phSelected = this.props.selected.map(function(elem){
            if(elem.name == targetName){
                elem.selected = !elem.selected;
                elem.check = (elem.check == "\uf00c" ? '':'\uf00c');
                elem.removed = false;
            }
        })
        this.props.populate(phSelected,this.state.numberOfShownItems);
    }

    showMore(){
        let that = this;
        this.setState({
            classContainers: 'selectedContainer',
            showingAll: true,
            numberOfShownItems: that.props.selected.length
        })
    }

    showLess(){
        this.setState({
            classContainers: 'selectedContainer hidden',
            showingAll: false,
            numberOfShownItems:2
        })
    }

    render(){
        let that = this;
        
        let content = this.props.selected.map(function(elem,index){
            let patternURL = `url(#${elem.images[0].url})`;
            return (
                <svg className="selectedImage" height="5em" width="5em">
                    <defs>
                        <pattern id={elem.images[0].url} x="" y="" patternUnits="userSpaceOnUse" height="5em" width="5em">
                        <image x="" y="" height="5em" width="5em" xlinkHref={elem.images[0].url}></image>
                        </pattern>
                    </defs>
                    <circle cx="2.5em" cy="2.5em" r="2.5em" stroke="grey" strokeWidth="2" fill={patternURL} />
                </svg>  
            )
        })
        return (
            
            <div className="container selected">
               
                        {content}
            </div>
        )
    }
}

export default SelectedArtists;