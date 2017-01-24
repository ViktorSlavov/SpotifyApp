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
        let arrowMore;
        let arrowLess;
        let filtered = this.props.selected.reverse().filter(elem=> elem.selected == true);
        let content = this.props.selected.map(function(elem,index){
            
             if(elem.selected == true && index < that.state.numberOfShownItems){                
                return (
                 
                    <div className="selectedContainer">
                        <p className="left">{elem.name}</p>
                        <button value={elem.name} className="buttonRemove"><i onClick={(e)=>that.updateSelected(e)} className="fa fa-times fa-2x"></i></button>
                    </div>
                )
            }
            else if(elem.selected == true && index == that.state.numberOfShownItems){
                if(that.state.showingAll == false){
                    arrowMore = (
                        <div>
                            <button className="showHideItems">
                            <i onClick={()=>that.showMore()} className="fa fa-sort-desc fa-2x"></i></button>
                        </div>)
                }
                return (
                    <div>
                       
                        <div className={that.state.classContainers}>
                            <p className="left">{elem.name}</p>
                            <button value={elem.name} className="buttonRemove"><i onClick={(e)=>that.updateSelected(e)} className="fa fa-times fa-2x"></i></button>
                        </div>
                        {arrowMore}
                    </div>
                )
            }else {
                 <div className={that.state.classContainers}>
                    <p className="left">{elem.name}</p>
                    <button value={elem.name} className="buttonRemove"><i onClick={(e)=>that.updateSelected(e)} className="fa fa-times fa-2x"></i></button>
                </div>
            }
            
        })
        if(that.state.showingAll == true){
                    arrowLess = (
                        <div>
                            <button className="showHideItems">
                            <i onClick={()=>that.showLess()} className="fa fa-sort-asc fa-2x"></i></button>
                        </div>
                    )
                }
        return (
            
            <div className="container selected">
               
                        {content}
                        {arrowLess}
            </div>
        )
    }
}

export default SelectedArtists;