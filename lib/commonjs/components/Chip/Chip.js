"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
var _colors = require("../../styles/themes/v2/colors");
var _Icon = _interopRequireDefault(require("../Icon"));
var _MaterialCommunityIcon = _interopRequireDefault(require("../MaterialCommunityIcon"));
var _Surface = _interopRequireDefault(require("../Surface"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
var _helpers = require("./helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Chips can be used to display entities in small blocks.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/chip-1.png" />
 *     <figcaption>Flat chip</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="small" src="screenshots/chip-2.png" />
 *     <figcaption>Outlined chip</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Chip } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Chip = _ref => {
  let {
    mode = 'flat',
    children,
    icon,
    avatar,
    selected = false,
    disabled = false,
    accessibilityLabel,
    closeIconAccessibilityLabel = 'Close',
    onPress,
    onLongPress,
    delayLongPress,
    onClose,
    closeIcon,
    textStyle,
    style,
    theme: themeOverrides,
    testID = 'chip',
    selectedColor,
    showSelectedOverlay = false,
    ellipsizeMode,
    compact,
    elevated = false,
    ...rest
  } = _ref;
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    isV3
  } = theme;
  const {
    current: elevation
  } = React.useRef(new _reactNative.Animated.Value(isV3 && elevated ? 1 : 0));
  const isOutlined = mode === 'outlined';
  const handlePressIn = () => {
    const {
      scale
    } = theme.animation;
    _reactNative.Animated.timing(elevation, {
      toValue: isV3 ? elevated ? 2 : 0 : 4,
      duration: 200 * scale,
      useNativeDriver: true
    }).start();
  };
  const handlePressOut = () => {
    const {
      scale
    } = theme.animation;
    _reactNative.Animated.timing(elevation, {
      toValue: isV3 && elevated ? 1 : 0,
      duration: 150 * scale,
      useNativeDriver: true
    }).start();
  };
  const opacity = isV3 ? 0.38 : 0.26;
  const defaultBorderRadius = isV3 ? 8 : 16;
  const iconSize = isV3 ? 18 : 16;
  const {
    backgroundColor: customBackgroundColor,
    borderRadius = defaultBorderRadius
  } = _reactNative.StyleSheet.flatten(style) || {};
  const {
    borderColor,
    textColor,
    iconColor,
    underlayColor,
    selectedBackgroundColor,
    backgroundColor
  } = (0, _helpers.getChipColors)({
    isOutlined,
    theme,
    selectedColor,
    showSelectedOverlay,
    customBackgroundColor,
    disabled
  });
  const accessibilityState = {
    selected,
    disabled
  };
  const elevationStyle = isV3 || _reactNative.Platform.OS === 'android' ? elevation : 0;
  const multiplier = isV3 ? compact ? 1.5 : 2 : 1;
  const labelSpacings = {
    marginRight: onClose ? 0 : 8 * multiplier,
    marginLeft: avatar || icon || selected ? 4 * multiplier : 8 * multiplier
  };
  const contentSpacings = {
    paddingRight: isV3 ? onClose ? 34 : 0 : onClose ? 32 : 4
  };
  const labelTextStyle = {
    color: textColor,
    ...(isV3 ? theme.fonts.labelLarge : theme.fonts.regular)
  };
  return /*#__PURE__*/React.createElement(_Surface.default, _extends({
    style: [styles.container, isV3 && (isOutlined ? styles.md3OutlineContainer : styles.md3FlatContainer), !theme.isV3 && {
      elevation: elevationStyle
    }, {
      backgroundColor: selected ? selectedBackgroundColor : backgroundColor,
      borderColor,
      borderRadius
    }, style]
  }, theme.isV3 && {
    elevation: elevationStyle
  }, rest, {
    testID: `${testID}-container`,
    theme: theme
  }), /*#__PURE__*/React.createElement(_TouchableRipple.default, {
    borderless: true,
    style: [{
      borderRadius
    }, styles.touchable],
    onPress: onPress,
    onPressIn: handlePressIn,
    onPressOut: handlePressOut,
    onLongPress: onLongPress,
    delayLongPress: delayLongPress,
    underlayColor: underlayColor,
    disabled: disabled,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    accessibilityState: accessibilityState,
    testID: testID,
    theme: theme
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.content, isV3 && styles.md3Content, contentSpacings]
  }, avatar && !icon ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.avatarWrapper, isV3 && styles.md3AvatarWrapper, disabled && {
      opacity
    }]
  }, /*#__PURE__*/React.isValidElement(avatar) ? /*#__PURE__*/React.cloneElement(avatar, {
    style: [styles.avatar, avatar.props.style]
  }) : avatar) : null, icon || selected ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.icon, isV3 && styles.md3Icon, avatar ? [styles.avatar, styles.avatarSelected, isV3 && selected && styles.md3SelectedIcon] : null]
  }, icon ? /*#__PURE__*/React.createElement(_Icon.default, {
    source: icon,
    color: avatar ? _colors.white : !disabled && theme.isV3 ? theme.colors.primary : iconColor,
    size: 18,
    theme: theme
  }) : /*#__PURE__*/React.createElement(_MaterialCommunityIcon.default, {
    name: "check",
    color: avatar ? _colors.white : iconColor,
    size: 18,
    direction: "ltr"
  })) : null, /*#__PURE__*/React.createElement(_Text.default, {
    variant: "labelLarge",
    selectable: false,
    numberOfLines: 1,
    style: [isV3 ? styles.md3LabelText : styles.labelText, labelTextStyle, labelSpacings, textStyle],
    ellipsizeMode: ellipsizeMode
  }, children))), onClose ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.closeButtonStyle
  }, /*#__PURE__*/React.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: onClose,
    accessibilityRole: "button",
    accessibilityLabel: closeIconAccessibilityLabel
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.icon, styles.closeIcon, isV3 && styles.md3CloseIcon]
  }, closeIcon ? /*#__PURE__*/React.createElement(_Icon.default, {
    source: closeIcon,
    color: iconColor,
    size: iconSize
  }) : /*#__PURE__*/React.createElement(_MaterialCommunityIcon.default, {
    name: isV3 ? 'close' : 'close-circle',
    size: iconSize,
    color: iconColor,
    direction: "ltr"
  })))) : null);
};
const styles = _reactNative.StyleSheet.create({
  container: {
    borderWidth: _reactNative.StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    flexDirection: _reactNative.Platform.select({
      default: 'column',
      web: 'row'
    })
  },
  md3OutlineContainer: {
    borderWidth: 1
  },
  md3FlatContainer: {
    borderWidth: 0
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    position: 'relative',
    flexGrow: 1
  },
  md3Content: {
    paddingLeft: 0
  },
  icon: {
    padding: 4,
    alignSelf: 'center'
  },
  md3Icon: {
    paddingLeft: 8,
    paddingRight: 0
  },
  closeIcon: {
    marginRight: 4
  },
  md3CloseIcon: {
    marginRight: 8,
    padding: 0
  },
  labelText: {
    minHeight: 24,
    lineHeight: 24,
    textAlignVertical: 'center',
    marginVertical: 4
  },
  md3LabelText: {
    textAlignVertical: 'center',
    marginVertical: 6
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  avatarWrapper: {
    marginRight: 4
  },
  md3AvatarWrapper: {
    marginLeft: 4,
    marginRight: 0
  },
  md3SelectedIcon: {
    paddingLeft: 4
  },
  // eslint-disable-next-line react-native/no-color-literals
  avatarSelected: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(0, 0, 0, .29)'
  },
  closeButtonStyle: {
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchable: {
    flexGrow: 1
  }
});
var _default = Chip;
exports.default = _default;
//# sourceMappingURL=Chip.js.map