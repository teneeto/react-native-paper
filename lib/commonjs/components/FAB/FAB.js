"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FAB = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
var _forwardRef = require("../../utils/forwardRef");
var _ActivityIndicator = _interopRequireDefault(require("../ActivityIndicator"));
var _CrossFadeIcon = _interopRequireDefault(require("../CrossFadeIcon"));
var _Icon = _interopRequireDefault(require("../Icon"));
var _Surface = _interopRequireDefault(require("../Surface"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * A floating action button represents the primary action in an application.
 * <div class="screenshots">
 *   <img class="small" src="screenshots/fab-1.png" />
 *   <img class="small" src="screenshots/fab-2.png" />
 *   <img class="small" src="screenshots/fab-3.png" />
 *   <img class="small" src="screenshots/fab-4.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { StyleSheet } from 'react-native';
 * import { FAB } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <FAB
 *     icon="plus"
 *     style={styles.fab}
 *     onPress={() => console.log('Pressed')}
 *   />
 * );
 *
 * const styles = StyleSheet.create({
 *   fab: {
 *     position: 'absolute',
 *     margin: 16,
 *     right: 0,
 *     bottom: 0,
 *   },
 * })
 *
 * export default MyComponent;
 * ```
 */
const FAB = (0, _forwardRef.forwardRef)((_ref, ref) => {
  let {
    icon,
    label,
    accessibilityLabel = label,
    accessibilityState,
    animated = true,
    color: customColor,
    disabled,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    onHoverOut,
    onHoverIn,
    delayLongPress,
    theme: themeOverrides,
    style,
    visible = true,
    uppercase: uppercaseProp,
    loading,
    testID = 'fab',
    size = 'medium',
    customSize,
    mode = 'elevated',
    variant = 'primary',
    ...rest
  } = _ref;
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const uppercase = uppercaseProp ?? !theme.isV3;
  const {
    current: visibility
  } = React.useRef(new _reactNative.Animated.Value(visible ? 1 : 0));
  const {
    isV3,
    animation
  } = theme;
  const {
    scale
  } = animation;
  React.useEffect(() => {
    if (visible) {
      _reactNative.Animated.timing(visibility, {
        toValue: 1,
        duration: 200 * scale,
        useNativeDriver: true
      }).start();
    } else {
      _reactNative.Animated.timing(visibility, {
        toValue: 0,
        duration: 150 * scale,
        useNativeDriver: true
      }).start();
    }
  }, [visible, scale, visibility]);
  const IconComponent = animated ? _CrossFadeIcon.default : _Icon.default;
  const fabStyle = (0, _utils.getFabStyle)({
    customSize,
    size,
    theme
  });
  const {
    borderRadius = fabStyle.borderRadius,
    backgroundColor: customBackgroundColor
  } = _reactNative.StyleSheet.flatten(style) || {};
  const {
    backgroundColor,
    foregroundColor,
    rippleColor
  } = (0, _utils.getFABColors)({
    theme,
    variant,
    disabled,
    customColor,
    customBackgroundColor
  });
  const isLargeSize = size === 'large';
  const isFlatMode = mode === 'flat';
  const iconSize = isLargeSize ? 36 : 24;
  const loadingIndicatorSize = isLargeSize ? 24 : 18;
  const font = isV3 ? theme.fonts.labelLarge : theme.fonts.medium;
  const extendedStyle = (0, _utils.getExtendedFabStyle)({
    customSize,
    theme
  });
  const textStyle = {
    color: foregroundColor,
    ...font
  };
  const md3Elevation = isFlatMode || disabled ? 0 : 3;
  const newAccessibilityState = {
    ...accessibilityState,
    disabled
  };
  return /*#__PURE__*/React.createElement(_Surface.default, _extends({
    ref: ref
  }, rest, {
    style: [{
      borderRadius,
      backgroundColor,
      opacity: visibility,
      transform: [{
        scale: visibility
      }]
    }, styles.container, !isV3 && styles.elevated, !isV3 && disabled && styles.disabled, style],
    pointerEvents: visible ? 'auto' : 'none',
    testID: `${testID}-container`
  }, isV3 && {
    elevation: md3Elevation
  }), /*#__PURE__*/React.createElement(_TouchableRipple.default, {
    borderless: true,
    onPress: onPress,
    onLongPress: onLongPress,
    onPressIn: onPressIn,
    onPressOut: onPressOut,
    onHoverOut: onHoverOut,
    onHoverIn: onHoverIn,
    delayLongPress: delayLongPress,
    rippleColor: rippleColor,
    disabled: disabled,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    accessibilityState: newAccessibilityState,
    testID: testID
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.content, label ? extendedStyle : fabStyle],
    testID: `${testID}-content`,
    pointerEvents: "none"
  }, icon && loading !== true ? /*#__PURE__*/React.createElement(IconComponent, {
    source: icon,
    size: customSize ? customSize / 2 : iconSize,
    color: foregroundColor
  }) : null, loading ? /*#__PURE__*/React.createElement(_ActivityIndicator.default, {
    size: customSize ? customSize / 2 : loadingIndicatorSize,
    color: foregroundColor
  }) : null, label ? /*#__PURE__*/React.createElement(_Text.default, {
    variant: "labelLarge",
    selectable: false,
    testID: `${testID}-text`,
    style: [styles.label, uppercase && styles.uppercaseLabel, textStyle]
  }, label) : null)));
});
exports.FAB = FAB;
const styles = _reactNative.StyleSheet.create({
  elevated: {
    elevation: 6
  },
  container: {
    overflow: 'hidden'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginHorizontal: 8
  },
  uppercaseLabel: {
    textTransform: 'uppercase'
  },
  disabled: {
    elevation: 0
  }
});
var _default = FAB; // @component-docs ignore-next-line
exports.default = _default;
//# sourceMappingURL=FAB.js.map