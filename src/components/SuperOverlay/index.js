import { Component } from 'react';

import Portal from './components/Portal';

class SuperOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuWidth: 240,
    };
  }

  componentDidMount() {
    const UIC = (function (_window) {
      if (_window._CURRENT_ENV) {
        return _window;
      }
      while (_window && _window.parent) {
        if (_window === _window.parent || _window.parent._CURRENT_ENV) {
          break;
        }
        _window = _window.parent;
      }
      return _window.parent;
    })(window.parent);

    const target = UIC.document.querySelectorAll('.ant-layout-sider-collapsed.collapsed') || [];
    if (target.length > 0) {
      this.setState({ sideMenuWidth: 64 });
    }
  }

  render() {
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    const { isOpen, colorMode = 'dark' } = this.props;
    const { sideMenuWidth } = this.state;
    const overlaySideMenuStyles = {
      dark: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        color: '#fff',
        zIndex: 1499,
        width: sideMenuWidth,
        backgroundColor: 'rgba(0, 0, 0, .7)',
      },
      light: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        color: '#fff',
        zIndex: 1499,
        width: sideMenuWidth,
        backgroundColor: 'rgba(0, 0, 0, .7)',
      },
    }[colorMode];
    const overlayHeaderStyles = {
      dark: {
        position: 'fixed',
        top: 0,
        left: sideMenuWidth,
        right: 0,
        color: '#fff',
        zIndex: 1499,
        height: 48,
        backgroundColor: 'rgba(0, 0, 0, .7)',
      },
      light: {
        position: 'fixed',
        top: 0,
        left: sideMenuWidth,
        right: 0,
        color: '#fff',
        zIndex: 1499,
        height: 48,
        backgroundColor: 'rgba(0, 0, 0, .7)',
      },
    }[colorMode];
    return (
      <Portal node={window.parent.document && window.parent.document.body}>
        {isOpen && <div style={{ ...overlaySideMenuStyles }} />}
        {isOpen && <div style={{ ...overlayHeaderStyles }} />}
      </Portal>
    );
  }
}

export default SuperOverlay;
