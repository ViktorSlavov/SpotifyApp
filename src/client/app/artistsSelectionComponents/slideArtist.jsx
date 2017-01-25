import React from 'react';

class SlideArtist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            check: '',//this.props.checked,
            stroke: 'grey',
            strokeW: '2',
            buttonsRight: 'buttons right',
            buttonsLeft: 'buttons left',
            buttonsCenter: 'buttons center',
            label: 'badge label '
        }
    }


    handleClick(e){
        if(this.props.index == 0){        // Show Add/Related/Back
          
        }else {  //swap places
            this.props.populate(this.props.index,'Reorder');
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
//   <svg  className={this.state.label} x={label.x} style={labelStyle}>
//                     <rect x={label.x} y={label.y} rx={label.rx} ry={label.ry} width={label.width} height={label.height} fill="#B90000"/>
//                     <text fill="white" fontSize={label.fontSize} x={label.textX} y={label.textY} textAnchor="middle">{this.props.name}</text>
//                 </svg>
    setLabel(name){
        let nameL = name.length;
        let label = {
            x: 20-nameL,
            y: 2,
            rx: 20,
            ry: 40,
            width: 50+nameL*5,
            height: 20,
            fontSize: 14,
            textX: (45+nameL*5)/2,
            textY: 15,
        }
        return label;
    }

    setStyle(index){
        index++;
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
        }else if (index > 15 && index<=22){
            step = 2.7;
        }

        let style = {
        };
        //check for center element
        if(index == 1){
            style.marginLeft ='35em';
            style.marginTop = '15em';
        } else if (index == 20){
            style.marginLeft = parseInt(left-5*step*coeficient)+'em';
             style.marginTop = parseInt(top+step+30)+'em';
        }
         else if (index == 21){
            style.marginLeft = parseInt(right+5*step*coeficient)+'em';
             style.marginTop = parseInt(top+step+30)+'em';
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
                style.marginTop = parseInt(top+step+12)+'em';
            }
            else if(indexLeft %3 == 0 ) { // 3d
                style.marginLeft = parseInt(left-(indexLeft-2)*step*coeficient)+'em';
                style.marginTop = parseInt(top+step+23)+'em';
            }
            else { //uneven
                style.marginLeft = parseInt(left-indexLeft*step*coeficient)+'em';
                style.marginTop = parseInt(top+step+12)+'em';
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
                style.marginTop = parseInt(top+step+12)+'em';
            }
            else if(indexRight %3 == 0 ) { // 3d
                style.marginLeft = parseInt(right+(indexRight-2)*step*coeficient)+'em';
                style.marginTop = parseInt(top+step+23)+'em';
            }
            else { //uneven
                style.marginLeft = parseInt(right+indexRight*step*coeficient)+'em';
                style.marginTop = parseInt(top+step+12)+'em';
            }
               

        }
        return style;
    }

    

    render() { 
        let centerButton = <div></div>;
        let badge = this.setBadge(this.props.index);
         let label = this.setLabel(this.props.name);
        let badgeStyle = this.setStyle(this.props.index);
        let labelStyle = badgeStyle;
        let patternURL = `url(#${this.props.src})`;
        if(this.props.savedStates > 0){
            centerButton = (
                <svg className={this.state.buttonsCenter} width="100" height="40" onClick={()=>this.clickBack()}>
                    <rect x="0" y="0" rx="20" ry="40" width="80" height="30" fill="white"/>
                    <text fill="green" fontSize="20" x="20%" y="50%" textAnchor="middle">Back</text>
                 </svg>
            )
        }
        return (
            <div>
                <svg className="badge" height={badge.svgH} width={badge.svgH} style={badgeStyle}>
                    <defs>
                        <pattern id={this.props.src} x={badge.patternX} y={badge.patternY} patternUnits="userSpaceOnUse" height={badge.patternH} width={badge.patternW}>
                        <image x={badge.imageX} y={badge.imageY} height={badge.imageH} width={badge.imageW} xlinkHref={this.props.src}></image>
                        </pattern>
                    </defs>
                    <circle cx={badge.circleX} cy={badge.circleY} r={badge.circleR} stroke="grey" strokeWidth="2" fill={patternURL} onClick={(e)=>this.handleClick(e)}/>
                </svg>  
            </div>
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


//                     <svg id={this.props.index} className={this.state.buttonsLeft} width="100" height="40" onClick={(e)=>this.clickAdd(e)}>
//                         <rect x="0" y="0" rx="20" ry="40" width="80" height="30" fill="white"/>
//                         <text fill="green" fontSize="20" x="20%" y="50%" textAnchor="middle">Add</text>
//                     </svg>
//                     {centerButton}
//                     <svg className={this.state.buttonsRight} width="100" height="40"  onClick={()=>this.clickRelated()}>
//                         <rect x="0" y="0" rx="20" ry="40" width="80" height="30" fill="white"/>
//                         <text fill="green" fontSize="20" x="20%" y="50%" textAnchor="middle">Related</text>
//                     </svg>