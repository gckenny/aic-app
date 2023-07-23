import { Component } from 'react';
import ReactDOM from 'react-dom';

class Portal extends Component {
  constructor(props) {
    super(props);

    this.node = document.createElement('div');
    this.node.setAttribute('data-reactportal', '');
  }

  componentDidMount() {
    if (this.props.node) {
      this.props.node.appendChild(this.node);
    } else {
      document.body.appendChild(this.node);
    }
  }

  componentWillUnmount() {
    if (this.node) {
      if (this.node.parentNode) {
        this.node.parentNode.removeChild(this.node);
      }
      this.node = null;
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.node);
  }
}

export default Portal;
