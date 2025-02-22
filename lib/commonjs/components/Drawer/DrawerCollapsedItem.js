"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
var _Badge = _interopRequireDefault(require("../Badge"));
var _Icon = _interopRequireDefault(require("../Icon"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const badgeSize = 8;
const iconSize = 24;
const itemSize = 56;
const outlineHeight = 32;

/**
 * @supported Available in v5.x with theme version 3
 * Collapsed component used to show an action item with an icon and optionally label in a navigation drawer.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/drawer-collapsed.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Drawer } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *    <Drawer.CollapsedItem
 *      focusedIcon="inbox"
 *      unfocusedIcon="inbox-outline"
 *      label="Inbox"
 *    />
 * );
 *
 * export default MyComponent;
 * ```
 */
const DrawerCollapsedItem = _ref => {
  let {
    focusedIcon,
    unfocusedIcon,
    label,
    active,
    theme: themeOverrides,
    style,
    onPress,
    accessibilityLabel,
    badge = false,
    testID = 'drawer-collapsed-item',
    ...rest
  } = _ref;
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const {
    isV3
  } = theme;
  const {
    scale
  } = theme.animation;
  const [numOfLines, setNumOfLines] = React.useState(1);
  const {
    current: animScale
  } = React.useRef(new _reactNative.Animated.Value(active ? 1 : 0.5));
  React.useEffect(() => {
    if (!active) {
      animScale.setValue(0.5);
    }
  }, [animScale, active]);
  if (!isV3) {
    return null;
  }
  const handlePressOut = () => {
    _reactNative.Animated.timing(animScale, {
      toValue: 1,
      duration: 150 * scale,
      useNativeDriver: true
    }).start();
  };
  const iconPadding = ((!label ? itemSize : outlineHeight) - iconSize) / 2;
  const backgroundColor = active ? theme.colors.secondaryContainer : 'transparent';
  const labelColor = active ? theme.colors.onSurface : theme.colors.onSurfaceVariant;
  const iconColor = active ? theme.colors.onSecondaryContainer : theme.colors.onSurfaceVariant;
  const onTextLayout = _ref2 => {
    let {
      nativeEvent
    } = _ref2;
    setNumOfLines(nativeEvent.lines.length);
  };

  // Label is cut off on Android, when centered "labelMedium" text
  // has more than 4 lines, so there is a need to decrease the letter spacing.
  const androidLetterSpacingStyle = _reactNative.Platform.OS === 'android' && numOfLines > 4 && styles.letterSpacing;
  const labelTextStyle = {
    color: labelColor,
    ...(isV3 ? theme.fonts.labelMedium : {})
  };
  const icon = !active && unfocusedIcon !== undefined ? unfocusedIcon : focusedIcon;
  return /*#__PURE__*/React.createElement(_reactNative.View, rest, /*#__PURE__*/React.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: onPress,
    onPressOut: onPress ? handlePressOut : undefined
    // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
    ,
    accessibilityTraits: active ? ['button', 'selected'] : 'button',
    accessibilityComponentType: "button",
    accessibilityRole: "button",
    accessibilityState: {
      selected: active
    },
    accessibilityLabel: accessibilityLabel,
    testID: testID
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.wrapper
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.outline, !label && styles.roundedOutline, {
      transform: [label ? {
        scaleX: animScale
      } : {
        scale: animScale
      }],
      backgroundColor
    }, style],
    testID: `${testID}-outline`
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.icon, {
      top: iconPadding
    }],
    testID: `${testID}-container`
  }, badge && /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.badgeContainer
  }, typeof badge === 'boolean' ? /*#__PURE__*/React.createElement(_Badge.default, {
    visible: badge,
    size: badgeSize
  }) : /*#__PURE__*/React.createElement(_Badge.default, {
    visible: badge != null,
    size: 2 * badgeSize
  }, badge)), /*#__PURE__*/React.createElement(_Icon.default, {
    source: icon,
    size: iconSize,
    color: iconColor
  })), label ? /*#__PURE__*/React.createElement(_Text.default, {
    variant: "labelMedium",
    selectable: false,
    numberOfLines: 2,
    onTextLayout: onTextLayout,
    style: [styles.label, androidLetterSpacingStyle, labelTextStyle]
  }, label) : null)));
};
DrawerCollapsedItem.displayName = 'Drawer.CollapsedItem';
const styles = _reactNative.StyleSheet.create({
  wrapper: {
    width: 80,
    marginBottom: 12,
    minHeight: itemSize,
    alignItems: 'center'
  },
  outline: {
    width: itemSize,
    height: outlineHeight,
    borderRadius: itemSize / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  roundedOutline: {
    height: itemSize
  },
  icon: {
    position: 'absolute'
  },
  letterSpacing: {
    letterSpacing: 0.3,
    alignSelf: 'stretch'
  },
  label: {
    marginHorizontal: 12,
    marginTop: 4,
    textAlign: 'center'
  },
  badgeContainer: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    zIndex: 2
  }
});
var _default = DrawerCollapsedItem;
exports.default = _default;
//# sourceMappingURL=DrawerCollapsedItem.js.map