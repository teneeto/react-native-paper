"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class PortalConsumer extends React.Component {
  componentDidMount() {
    this.checkManager();
    this.key = this.props.manager.mount(this.props.children);
  }
  componentDidUpdate() {
    this.checkManager();
    this.props.manager.update(this.key, this.props.children);
  }
  componentWillUnmount() {
    this.checkManager();
    this.props.manager.unmount(this.key);
  }
  checkManager() {
    if (!this.props.manager) {
      throw new Error('Looks like you forgot to wrap your root component with `Provider` component from `react-native-paper`.\n\n' + "Please read our getting-started guide and make sure you've followed all the required steps.\n\n" + 'https://callstack.github.io/react-native-paper/getting-started.html');
    }
  }
  render() {
    return null;
  }
}
exports.default = PortalConsumer;
//# sourceMappingURL=PortalConsumer.js.map