"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CardTitle = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
var _Text = _interopRequireDefault(require("../Typography/Text"));
var _Caption = _interopRequireDefault(require("../Typography/v2/Caption"));
var _Title = _interopRequireDefault(require("../Typography/v2/Title"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const LEFT_SIZE = 40;

/**
 * A component to show a title, subtitle and an avatar inside a Card.
 *
 * <div class="screenshots">
 *   <img class="small" src="screenshots/card-title-1.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Avatar, Card, IconButton } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Card.Title
 *     title="Card Title"
 *     subtitle="Card Subtitle"
 *     left={(props) => <Avatar.Icon {...props} icon="folder" />}
 *     right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
 *   />
 * );
 *
 * export default MyComponent;
 * ```
 */
const CardTitle = _ref => {
  let {
    title,
    titleStyle,
    titleNumberOfLines = 1,
    titleVariant = 'bodyLarge',
    subtitle,
    subtitleStyle,
    subtitleNumberOfLines = 1,
    subtitleVariant = 'bodyMedium',
    left,
    leftStyle,
    right,
    rightStyle,
    style,
    theme: themeOverrides
  } = _ref;
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const titleComponent = props => theme.isV3 ? /*#__PURE__*/React.createElement(_Text.default, props) : /*#__PURE__*/React.createElement(_Title.default, props);
  const subtitleComponent = props => theme.isV3 ? /*#__PURE__*/React.createElement(_Text.default, props) : /*#__PURE__*/React.createElement(_Caption.default, props);
  const TextComponent = /*#__PURE__*/React.memo(_ref2 => {
    let {
      component,
      ...rest
    } = _ref2;
    return /*#__PURE__*/React.createElement(component, rest);
  });
  const minHeight = subtitle || left || right ? 72 : 50;
  const marginBottom = subtitle ? 0 : 2;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, {
      minHeight
    }, style]
  }, left ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.left, leftStyle]
  }, left({
    size: LEFT_SIZE
  })) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.titles]
  }, title && /*#__PURE__*/React.createElement(TextComponent, {
    component: titleComponent,
    style: [styles.title, {
      marginBottom
    }, titleStyle],
    numberOfLines: titleNumberOfLines,
    variant: titleVariant
  }, title), subtitle && /*#__PURE__*/React.createElement(TextComponent, {
    component: subtitleComponent,
    style: [styles.subtitle, subtitleStyle],
    numberOfLines: subtitleNumberOfLines,
    variant: subtitleVariant
  }, subtitle)), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: rightStyle
  }, right ? right({
    size: 24
  }) : null));
};
exports.CardTitle = CardTitle;
CardTitle.displayName = 'Card.Title';
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16
  },
  left: {
    justifyContent: 'center',
    marginRight: 16,
    height: LEFT_SIZE,
    width: LEFT_SIZE
  },
  titles: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    minHeight: 30,
    paddingRight: 16
  },
  subtitle: {
    minHeight: 20,
    marginVertical: 0,
    paddingRight: 16
  }
});
var _default = CardTitle; // @component-docs ignore-next-line
exports.default = _default;
//# sourceMappingURL=CardTitle.js.map