"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.accessibilityProps = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _colors = require("../styles/themes/v2/colors");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
let MaterialCommunityIcons;
try {
  // Optionally require vector-icons
  MaterialCommunityIcons = require('react-native-vector-icons/MaterialCommunityIcons').default;
} catch (e) {
  let isErrorLogged = false;

  // Fallback component for icons
  MaterialCommunityIcons = _ref => {
    let {
      name,
      color,
      size,
      ...rest
    } = _ref;
    /* eslint-disable no-console */
    if (!isErrorLogged) {
      if (!/(Cannot find module|Module not found|Cannot resolve module)/.test(e.message)) {
        console.error(e);
      }
      console.warn(`Tried to use the icon '${name}' in a component from 'react-native-paper', but 'react-native-vector-icons/MaterialCommunityIcons' could not be loaded.`, `To remove this warning, try installing 'react-native-vector-icons' or use another method to specify icon: https://callstack.github.io/react-native-paper/icons.html.`);
      isErrorLogged = true;
    }
    return /*#__PURE__*/React.createElement(_reactNative.Text, _extends({}, rest, {
      style: [styles.icon, {
        color,
        fontSize: size
      }]
      // @ts-expect-error: Text doesn't support this, but it seems to affect TouchableNativeFeedback
      ,
      pointerEvents: "none",
      selectable: false
    }), "\u25A1");
  };
}
const accessibilityProps = _reactNative.Platform.OS === 'web' ? {
  role: 'img',
  focusable: false
} : {
  accessibilityElementsHidden: true,
  importantForAccessibility: 'no-hide-descendants'
};
exports.accessibilityProps = accessibilityProps;
const defaultIcon = _ref2 => {
  let {
    name,
    color = _colors.black,
    size,
    direction,
    allowFontScaling
  } = _ref2;
  return /*#__PURE__*/React.createElement(MaterialCommunityIcons, _extends({
    allowFontScaling: allowFontScaling,
    name: name,
    color: color,
    size: size,
    style: [{
      transform: [{
        scaleX: direction === 'rtl' ? -1 : 1
      }],
      lineHeight: size
    }, styles.icon],
    pointerEvents: "none",
    selectable: false
  }, accessibilityProps));
};
const styles = _reactNative.StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  icon: {
    backgroundColor: 'transparent'
  }
});
var _default = defaultIcon;
exports.default = _default;
//# sourceMappingURL=MaterialCommunityIcon.js.map