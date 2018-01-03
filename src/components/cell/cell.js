import React from "react";
import PropTypes from 'prop-types';
import {DragSource, DropTarget} from 'react-dnd';


const cellSource = {
  beginDrag(props) {
    return {
      sourceIndex: props.index,
      selectedValue: props.selectedValue
    };
  },
  endDrag(props, monitor){
    const dropResult = monitor.getDropResult();
    props.copyValue(monitor.getItem().sourceIndex, dropResult.dropIndex, dropResult.dropEffect);
  }
};

const cellTarget = {

  drop(props, monitor) {
    return {dropIndex: props.index};
  }
};

/**
 * Specifies the props to inject into your component.
 */


class Cell extends React.Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    value: PropTypes.string,
    index: PropTypes.number,
    sourceIndex: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    props.selectValue(this.props.index, 'single');
  }

  handleChange(event) {
    this.props.selectValue(this.props.index, event.target.value)
  }


  render() {
    const { connectDragSource, connectDropTarget, options, index, selection} = this.props;
    return (
      connectDragSource(connectDropTarget(
        <div key={index}>
          <select value={selection[index]} onChange={this.handleChange}>
            {options.map(value => <option value={value}>{value}</option>)}
          </select>
        </div>
      ))
    )
  }
}


Cell = DragSource('Cell', cellSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Cell);
Cell = DropTarget('Cell', cellTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Cell);
export default Cell;
