"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
var _addEventListener = require("../../utils/addEventListener");
var _Portal = _interopRequireDefault(require("../Portal/Portal"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 *
 * Plain tooltips, when activated, display a text label identifying an element, such as a description of its function. Tooltips should include only short, descriptive text and avoid restating visible UI text.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/tooltip.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { IconButton, Tooltip } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Tooltip title="Selected Camera">
 *     <IconButton icon="camera" selected size={24} onPress={() => {}} />
 *   </Tooltip>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Tooltip = _ref => {
  let {
    children,
    enterTouchDelay = 500,
    leaveTouchDelay = 1500,
    title,
    theme: themeOverrides,
    ...rest
  } = _ref;
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const [visible, setVisible] = React.useState(false);
  const [measurement, setMeasurement] = React.useState({
    children: {},
    tooltip: {},
    measured: false
  });
  const showTooltipTimer = React.useRef();
  const hideTooltipTimer = React.useRef();
  const childrenWrapperRef = React.useRef();
  const touched = React.useRef(false);
  const isWeb = _reactNative.Platform.OS === 'web';
  React.useEffect(() => {
    return () => {
      if (showTooltipTimer.current) {
        clearTimeout(showTooltipTimer.current);
      }
      if (hideTooltipTimer.current) {
        clearTimeout(hideTooltipTimer.current);
      }
    };
  }, []);
  React.useEffect(() => {
    const subscription = (0, _addEventListener.addEventListener)(_reactNative.Dimensions, 'change', () => setVisible(false));
    return () => subscription.remove();
  }, []);
  const handleOnLayout = _ref2 => {
    let {
      nativeEvent: {
        layout
      }
    } = _ref2;
    childrenWrapperRef.current.measure((_x, _y, width, height, pageX, pageY) => {
      setMeasurement({
        children: {
          pageX,
          pageY,
          height,
          width
        },
        tooltip: {
          ...layout
        },
        measured: true
      });
    });
  };
  const handleTouchStart = () => {
    if (hideTooltipTimer.current) {
      clearTimeout(hideTooltipTimer.current);
    }
    showTooltipTimer.current = setTimeout(() => {
      touched.current = true;
      setVisible(true);
    }, enterTouchDelay);
  };
  const handleTouchEnd = () => {
    touched.current = false;
    if (showTooltipTimer.current) {
      clearTimeout(showTooltipTimer.current);
    }
    hideTooltipTimer.current = setTimeout(() => {
      setVisible(false);
      setMeasurement({
        children: {},
        tooltip: {},
        measured: false
      });
    }, leaveTouchDelay);
  };
  const mobilePressProps = {
    onPress: React.useCallback(() => {
      if (touched.current) {
        return null;
      } else {
        var _children$props$onPre, _children$props;
        return (_children$props$onPre = (_children$props = children.props).onPress) === null || _children$props$onPre === void 0 ? void 0 : _children$props$onPre.call(_children$props);
      }
    }, [children.props])
  };
  const webPressProps = {
    onHoverIn: () => {
      var _children$props$onHov, _children$props2;
      handleTouchStart();
      (_children$props$onHov = (_children$props2 = children.props).onHoverIn) === null || _children$props$onHov === void 0 ? void 0 : _children$props$onHov.call(_children$props2);
    },
    onHoverOut: () => {
      var _children$props$onHov2, _children$props3;
      handleTouchEnd();
      (_children$props$onHov2 = (_children$props3 = children.props).onHoverOut) === null || _children$props$onHov2 === void 0 ? void 0 : _children$props$onHov2.call(_children$props3);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, visible && /*#__PURE__*/React.createElement(_Portal.default, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    onLayout: handleOnLayout,
    style: [styles.tooltip, {
      backgroundColor: theme.isV3 ? theme.colors.onSurface : theme.colors.tooltip,
      ...(0, _utils.getTooltipPosition)(measurement),
      borderRadius: theme.roundness,
      ...(measurement.measured ? styles.visible : styles.hidden)
    }],
    testID: "tooltip-container"
  }, /*#__PURE__*/React.createElement(_Text.default, {
    accessibilityLiveRegion: "polite",
    numberOfLines: 1,
    selectable: false,
    variant: "labelLarge",
    style: {
      color: theme.colors.surface
    }
  }, title))), /*#__PURE__*/React.createElement(_reactNative.View, {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd
  }, /*#__PURE__*/React.cloneElement(children, {
    ...rest,
    ref: childrenWrapperRef,
    ...(isWeb ? webPressProps : mobilePressProps)
  })));
};
const styles = _reactNative.StyleSheet.create({
  tooltip: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 32,
    maxHeight: 32
  },
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
});
var _default = Tooltip;
exports.default = _default;
//# sourceMappingURL=Tooltip.js.map