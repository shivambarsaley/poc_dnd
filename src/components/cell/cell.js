import React from "react";
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';


const cardSource = {
  beginDrag(props) {
    console.log('STARTED');
    console.log(props);
    console.log(this.state);
    return {
      index: props.index,
      selectedValue: props.selectedValue
    };
  },
  endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
    console.log('ENDED DROP', item, dropResult);
    console.log(props);
		if (dropResult) {
			console.log(`You dropped ${item.index} into ${props.index}!`) // eslint-disable-line no-alert
		}
	}
};

const cardTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().index;
    console.log(props, draggedId);
    if (draggedId !== props.index) {
      // props.moveCard(draggedId, props.id);
    }
  },
  drop(props,monitor){
    console.log(`You Dropped ${monitor.getItem().index} into ${props.index}`, props);
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  value: PropTypes.string.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

// class Card extends Component {
//   render() {
//     const { isDragging, connectDragSource, text } = this.props;
//     return connectDragSource(
//       <div style={{ opacity: isDragging ? 0.5 : 1 }}>
//         {text}
//       </div>
//     );
//   }
// }



// Export the wrapped component:



// @DropTarget('Cell', cardTarget, connect => ({
//   connectDropTarget: connect.dropTarget(),
// }))
// @DragSource('Cell', cardSource, (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging()
// }))
//
//

class Cell extends React.Component {

  static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		value: PropTypes.string.isRequired,
		index: PropTypes.number
	}
  constructor(props) {
    super(props);
    this.state = {
      value: 'complicated'
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    // this.props.selectedValue = event.target.value;
    localStorage.setItem(`dropdown_${this.props.index}`, event.target.value);
    this.setState({value: event.target.value});
  }
  componentWillReceiveProps(newProps){
    const index = newProps.index;
    console.log(index, 'IN RECEIVE PROPS');
    this.setState({value: localStorage.getItem(`dropdown_${index}`)});
  }
  render() {
    // const {options} = this.state;
    console.log('Called Again............', this.state.value, this.props.index);
    const { isDragging, connectDragSource, connectDropTarget, text, options, index, selectedValue } = this.props;
    localStorage.setItem(`dropdown_${index}`, this.state.value);
    return(
    connectDragSource(connectDropTarget(
    <div>
    <select value={this.state.value} onChange={this.handleChange}>
      {options.map(value => <option value={value}>{value}</option>)}
    </select>
     </div>
    ))
    )
  }
}

Cell.propTypes = propTypes;
Cell = DropTarget('Cell', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Cell);
Cell = DragSource('Cell', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Cell);
export default Cell;
