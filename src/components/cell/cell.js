import React from "react";
import PropTypes from 'prop-types';
import {DragSource, DropTarget} from 'react-dnd';


const cardSource = {
  beginDrag(props) {
    console.log('STARTED');
    // console.log({
    //   sourceIndex: props.index,
    //   selectedValue: props.selectedValue
    // });
    return {
      sourceIndex: props.index,
      selectedValue: props.selectedValue
    };
  },
  // endDrag(props, monitor) {
  // 	const item = monitor.getItem();
  // 	const dropResult = monitor.getDropResult();
  //  // console.log('ENDED DROP', item, dropResult);
  //  // console.log(props);
  // 	if (dropResult) {
  // 		console.log(`You dropped ${item.index} into ${props.index}!`) // eslint-disable-line no-alert
  // 	}
  // }
};

const cardTarget = {
  // hover(props, monitor) {
  //   const draggedId = monitor.getItem().sourceIndex;
  //   // console.log(props, draggedId);
  //   if (draggedId !== props.index) {
  //     // props.moveCard(draggedId, props.id);
  //   }
  // },
  drop(props, monitor) {
    // console.log(monitor.getItem().sourceIndex, props, 'RECEIVED IN DROP');
    console.log(`You Dropped ${monitor.getItem().sourceIndex} into ${props.index}`, props);
    props.copyValue(monitor.getItem().sourceIndex, props.index)
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
  value: PropTypes.string,

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
    value: PropTypes.string,
    index: PropTypes.number,
    sourceIndex: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 'single'
    };
    this.handleChange = this.handleChange.bind(this);
    props.selectValue(this.props.index, 'single');
  }

  handleChange(event) {
    // this.props.selectedValue = event.target.value;
    localStorage.setItem(`dropdown_${this.props.index}`, event.target.value);
    // this.setState({value: event.target.value});
    this.props.selectValue(this.props.index, event.target.value)
  }

  // componentWillReceiveProps(newProps){
  //   // console.log(newProps);
  //   // const index = newProps.sourceIndex;
  //   // console.log(index, 'IN RECEIVE PROPS');
  //   // if(index){
  //   //   this.setState({value: localStorage.getItem(`dropdown_${index}`)});
  //   // }
  //   // else {
  //   //   localStorage.setItem(`dropdown_${this.props.index}`, this.state.value);
  //   // }
  // }
  render() {
    // const {options} = this.state;
    console.log('Rendering Component............', this.state.value, this.props.index, this.props.sourceIndex, 'IN RENDER');
    const {isDragging, connectDragSource, connectDropTarget, text, options, index, selectedValue, sourceIndex, selectValue, copyValue, selection} = this.props;
    // localStorage.setItem(`dropdown_${index}`, this.state.value);
    const colors = ['blue', 'green', 'pink', 'yellow', 'black', 'gray', 'purple'];
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    return (
      connectDropTarget(connectDragSource(
        <div style={{backgroundColor: colors[getRandomInt(1, 10)]}}>
          <select value={selection[index]} onChange={this.handleChange}>
            {options.map(value => <option value={value}>{value}</option>)}
          </select>
        </div>
      ))
    )
  }
}

Cell.propTypes = propTypes;

Cell = DragSource('Cell', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Cell);
Cell = DropTarget('Cell', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Cell);
export default Cell;
