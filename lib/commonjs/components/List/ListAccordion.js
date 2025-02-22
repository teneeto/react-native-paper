"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
var _MaterialCommunityIcon = _interopRequireDefault(require("../MaterialCommunityIcon"));
var _TouchableRipple = _interopRequireDefault(require("../TouchableRipple/TouchableRipple"));
var _Text = _interopRequireDefault(require("../Typography/Text"));
var _ListAccordionGroup = require("./ListAccordionGroup");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * A component used to display an expandable list item.
 *
 * <div class="screenshots">
 *   <img class="medium" src="screenshots/list-accordion-1.png" />
 *   <img class="medium" src="screenshots/list-accordion-2.png" />
 *   <img class="medium" src="screenshots/list-accordion-3.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { List } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [expanded, setExpanded] = React.useState(true);
 *
 *   const handlePress = () => setExpanded(!expanded);
 *
 *   return (
 *     <List.Section title="Accordions">
 *       <List.Accordion
 *         title="Uncontrolled Accordion"
 *         left={props => <List.Icon {...props} icon="folder" />}>
 *         <List.Item title="First item" />
 *         <List.Item title="Second item" />
 *       </List.Accordion>
 *
 *       <List.Accordion
 *         title="Controlled Accordion"
 *         left={props => <List.Icon {...props} icon="folder" />}
 *         expanded={expanded}
 *         onPress={handlePress}>
 *         <List.Item title="First item" />
 *         <List.Item title="Second item" />
 *       </List.Accordion>
 *     </List.Section>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const ListAccordion = _ref => {
  var _theme$colors, _theme$colors2;
  let {
    left,
    right,
    title,
    description,
    children,
    theme: themeOverrides,
    titleStyle,
    descriptionStyle,
    titleNumberOfLines = 1,
    descriptionNumberOfLines = 2,
    style,
    id,
    testID,
    onPress,
    onLongPress,
    delayLongPress,
    expanded: expandedProp,
    accessibilityLabel,
    pointerEvents = 'none'
  } = _ref;
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const [expanded, setExpanded] = React.useState(expandedProp || false);
  const handlePressAction = e => {
    onPress === null || onPress === void 0 ? void 0 : onPress(e);
    if (expandedProp === undefined) {
      // Only update state of the `expanded` prop was not passed
      // If it was passed, the component will act as a controlled component
      setExpanded(expanded => !expanded);
    }
  };
  const expandedInternal = expandedProp !== undefined ? expandedProp : expanded;
  const groupContext = React.useContext(_ListAccordionGroup.ListAccordionGroupContext);
  if (groupContext !== null && !id) {
    throw new Error('List.Accordion is used inside a List.AccordionGroup without specifying an id prop.');
  }
  const isExpanded = groupContext ? groupContext.expandedId === id : expandedInternal;
  const {
    titleColor,
    descriptionColor,
    titleTextColor,
    rippleColor
  } = (0, _utils.getAccordionColors)({
    theme,
    isExpanded
  });
  const handlePress = groupContext && id !== undefined ? () => groupContext.onAccordionPress(id) : handlePressAction;
  return /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      backgroundColor: theme === null || theme === void 0 ? void 0 : (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.background
    }
  }, /*#__PURE__*/React.createElement(_TouchableRipple.default, {
    style: [styles.container, style],
    onPress: handlePress,
    onLongPress: onLongPress,
    delayLongPress: delayLongPress,
    rippleColor: rippleColor,
    accessibilityRole: "button",
    accessibilityState: {
      expanded: isExpanded
    },
    accessibilityLabel: accessibilityLabel,
    testID: testID,
    theme: theme,
    borderless: true
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.row,
    pointerEvents: pointerEvents
  }, left ? left({
    color: isExpanded ? (_theme$colors2 = theme.colors) === null || _theme$colors2 === void 0 ? void 0 : _theme$colors2.primary : descriptionColor
  }) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.item, styles.content]
  }, /*#__PURE__*/React.createElement(_Text.default, {
    selectable: false,
    numberOfLines: titleNumberOfLines,
    style: [styles.title, {
      color: titleTextColor
    }, titleStyle]
  }, title), description ? /*#__PURE__*/React.createElement(_Text.default, {
    selectable: false,
    numberOfLines: descriptionNumberOfLines,
    style: [styles.description, {
      color: descriptionColor
    }, descriptionStyle]
  }, description) : null), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.item, description ? styles.multiline : undefined]
  }, right ? right({
    isExpanded: isExpanded
  }) : /*#__PURE__*/React.createElement(_MaterialCommunityIcon.default, {
    name: isExpanded ? 'chevron-up' : 'chevron-down',
    color: theme.isV3 ? descriptionColor : titleColor,
    size: 24,
    direction: _reactNative.I18nManager.getConstants().isRTL ? 'rtl' : 'ltr'
  }))))), isExpanded ? React.Children.map(children, child => {
    if (left && /*#__PURE__*/React.isValidElement(child) && !child.props.left && !child.props.right) {
      return /*#__PURE__*/React.cloneElement(child, {
        style: [styles.child, child.props.style],
        theme
      });
    }
    return child;
  }) : null);
};
ListAccordion.displayName = 'List.Accordion';
const styles = _reactNative.StyleSheet.create({
  container: {
    padding: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  multiline: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16
  },
  description: {
    fontSize: 14
  },
  item: {
    margin: 8
  },
  child: {
    paddingLeft: 64
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  }
});
var _default = ListAccordion;
exports.default = _default;
//# sourceMappingURL=ListAccordion.js.map