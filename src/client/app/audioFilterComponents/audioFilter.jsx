import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';
import {SortableContainer, SortableElement, arrayMove,SortableHandle } from 'react-sortable-hoc';
import SpotifyApi from '../spotifyApi.jsx';

const DragHandle = SortableHandle(() => <div className="handle"><i className="fa fa-circle-o" aria-hidden="true"></i></div>); 

class AudioFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        min: 0,
        max: 100,
      }
    };
  }

  handleValuesChange(component, values) {
    this.setState({
      values: values,
    });
    console.log(this.props.values)
    this.props.criteriaUpdate(this.state.values, this.props.value)
  }

  render() {
    return (
      <div className="container">
        <div className="row ">
          <div className="col-md-12">
            <form className="form">
              
              <div className="formField" >
              <div className="col-md-2 offset-md-2 handle">
              </div>
              <div className="col-md-8 input">
              <p className="titleFilter">{this.props.value}</p>
              <DragHandle/>
                <InputRange
                  maxValue={100}
                  minValue={0}
                  name={this.props.value}
                  value={this.state.values}
                  onChange={this.handleValuesChange.bind(this)}
                />
              </div>
                </div>
            </form>
            
          </div>
        </div>
      </div>
    );
  }
}

export default AudioFilter;

