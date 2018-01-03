import React from "react";
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';



const cardSource = {
  beginDrag(props) {
    console.log('STARTED');
    console.log(props);
    console.log(this.state);
    return {
      value: props.value
    };
  },
  endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
    console.log('ENDED DROP', item);
    console.log(this.props);
		if (dropResult) {
			alert(`You dropped ${item.name} into ${dropResult.name}!`) // eslint-disable-line no-alert
		}
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
  index: PropTypes.number,
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







class Element extends React.Component {

  static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		value: PropTypes.string.isRequired,
	}
  constructor(props) {
    super(props);
    this.state = {
      // options: ['single','complicated', 'relationship'],
      value: 'complicated',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    // const {options} = this.state;
    const { isDragging, connectDragSource, text, options } = this.props;
    return(
    connectDragSource(
    <span>
      <p>{this.props.value}</p>
     </span>
    )
    )
  }
}

Element.propTypes = propTypes;
export default DragSource('Element', cardSource, collect)(Element);
