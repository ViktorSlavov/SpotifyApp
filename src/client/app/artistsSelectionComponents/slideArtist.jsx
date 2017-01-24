import React from 'react';

class SlideArtist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            check: '',//this.props.checked,
            stroke: 'grey',
            strokeW: '2',

        }
    }

    mouseEnter(e){
        // this.setState({
        //     stroke: 'badge active'
        // })
    }

    mouseLeave(e){
        //  this.setState({
        //     class: 'badge'
        // })
    }

    handleClick(e){        
            let ph = this.props.check;
            if(ph == ''){
                this.props.populate(
                    {
                        name: this.props.name,
                        selected: true,
                    }
                )
            } else {
                this.props.populate(
                    {
                        name: this.props.name,
                        selected: false,
                    }
                )
            }
            
        
    }

    setBadge(index){
        index++;
        let badge =  {
                svgH: '30em',
                svgW: '30em',
                patternX: '0em',
                patternY: '0em',
                patternH: '20em',
                patternW: '20em',
                imageX: '-5em',
                imageY: '-5em',
                imageH: '30em',
                imageW: '30em',
                circleX: '10em',
                circleY: '10em',
                circleR: '9em',
            }
        if(index == 1){
            return badge;
        }
        else {
            for(var key in badge){
                badge[key] = (parseFloat(badge[key])/(1.5+index*0.1)).toString()+'em'; 
            }
            return badge;
        }
        
    }

    setStyle(index){
        index++;
        console.log(this.props.artists.length)
        let current = this.props.name;
        let artists = this.props.artists;
        let mapLefts = [];
        let mapRights = [];
        for(let i = 0; i < artists.length; i++){
            if(i%2 > 0){
                mapLefts.push(i+1)
            }else if(i%2 == 0){
                mapRights.push(i+1)
            }
        }
        let total = this.props.artists.length;
        let step = 2;
        let top =  0;
        let left = 30;
        let right = 50;
        let indexLeft;
        let indexRight;
        let coeficient = 1.4;
        if(index <= 10){
            step = 3;
        }else if (index > 10 && index <= 15){
            step = 2.8
        }else if (index > 15 && index<=20){
            step = 2.7;
        }

        let style = {
        };
        //check for center element
        if(index == 1){
            style.marginLeft ='35em';
            style.marginTop = '7.5em';
        } 
        //all left
        else if(index%2 == 0){
            indexLeft = mapLefts.indexOf(index);
            indexLeft++;
            if(indexLeft == 1){ //first
                style.marginLeft = parseInt(left-indexLeft*step*coeficient)+'em';
                style.marginTop = parseInt(top+step)+'em';
            }else if ((indexLeft %4 == 0 || indexLeft %7 == 0) && indexLeft != 8){
                style.marginLeft = parseInt(left-indexLeft*step*coeficient)+'em';
                style.marginTop = parseInt(top+step)+'em';
            }
            else if(indexLeft %2 == 0 && indexLeft%3 > 0){ //even but not 3d
               
                style.marginLeft = parseInt(left-indexLeft*step*coeficient)+'em';
                style.marginTop = parseInt(top+step+10)+'em';
            }
            else if(indexLeft %3 == 0 ) { // 3d
                style.marginLeft = parseInt(left-(indexLeft-2)*step*coeficient)+'em';
                style.marginTop = parseInt(top+step+20)+'em';
            }
            else { //uneven
                style.marginLeft = parseInt(left-indexLeft*step*coeficient)+'em';
                style.marginTop = parseInt(top+step+10)+'em';
            }
               
        }
        //all right 
        else {
            indexRight = mapRights.indexOf(index);
            if(indexRight == 1){ //first
                style.marginLeft = parseInt(right+indexRight*step*coeficient)+'em';
                style.marginTop = parseInt(top+step)+'em';
            }else if ((indexRight %4 == 0 || indexRight %7 == 0) && indexRight != 8){
                style.marginLeft = parseInt(right+indexRight*step*coeficient)+'em';
                style.marginTop = parseInt(top+step)+'em';
            }
            else if(indexRight %2 == 0 && indexRight%3 > 0){ //even but not 3d
               
                style.marginLeft = parseInt(right+indexRight*step*coeficient)+'em';
                style.marginTop = parseInt(top+step+10)+'em';
            }
            else if(indexRight %3 == 0 ) { // 3d
                style.marginLeft = parseInt(right+(indexRight-2)*step*coeficient)+'em';
                style.marginTop = parseInt(top+step+20)+'em';
            }
            else { //uneven
                style.marginLeft = parseInt(right+indexRight*step*coeficient)+'em';
                style.marginTop = parseInt(top+step+10)+'em';
            }
               

        }
        return style;
    }

    render() { 
        let badge = this.setBadge(this.props.index);
        let badgeStyle = this.setStyle(this.props.index);
        let patternURL = `url(#${this.props.src})`;
        return (
                <svg className="badge" height={badge.svgH} width={badge.svgH} 
                 onMouseEnter={(e)=>this.mouseEnter(e)} onMouseLeave={(e)=>this.mouseLeave(e)} style={badgeStyle}>
                    <defs>
                        <pattern id={this.props.src} x={badge.patternX} y={badge.patternY} patternUnits="userSpaceOnUse" height={badge.patternH} width={badge.patternW}>
                        <image x={badge.imageX} y={badge.imageY} height={badge.imageH} width={badge.imageW} xlinkHref={this.props.src}></image>
                        </pattern>
                    </defs>
                    <circle cx={badge.circleX} cy={badge.circleY} r={badge.circleR} stroke="grey" strokeWidth="2" fill={patternURL} onClick={(e)=>this.handleClick(e)}/>
                </svg>  
        )
    }
}


export default SlideArtist; 

//  <svg className="badge" height="200" width="200" className="badge" onClick={(e)=>this.handleClick(e)}>
//                     <defs>
//                         <pattern id="image" x="0" y="0" patternUnits="userSpaceOnUse" height="200" width="200">
//                         <image x="-50" y="-50" height="300" width="300" xlinkHref={this.props.src}></image>
//                         </pattern>
//                     </defs>
//                     <circle cx="100" cy="100" r="90" stroke="grey" strokeWidth="2" fill="url(#image)" onClick={(e)=>this.handleClick(e)}/>
//                     <text fill="green" fontSize="20" x="35%" y="44%" textAnchor="middle">{this.props.check}</text>
//                 </svg>  

// for(var i = 0; i < x.length; i++){
// if(i == 0){
// console.log('zero' , i)
// }else if( i%2 ==0 && i%3 >0){
// console.log('even but not 3rd' , i);
// }else if(i%3 == 0){
// console.log('3d ', i)
//     }
// else {
// console.log('uneven', i)
// }
// }