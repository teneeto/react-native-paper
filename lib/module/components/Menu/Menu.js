function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Animated, BackHandler, Dimensions, Easing, findNodeHandle, I18nManager, Keyboard, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { APPROX_STATUSBAR_HEIGHT } from '../../constants';
import { withInternalTheme } from '../../core/theming';
import { addEventListener } from '../../utils/addEventListener';
import Portal from '../Portal/Portal';
import Surface from '../Surface';
import MenuItem from './MenuItem';
// Minimum padding between the edge of the screen and the menu
const SCREEN_INDENT = 8;
// From https://material.io/design/motion/speed.html#duration
const ANIMATION_DURATION = 250;
// From the 'Standard easing' section of https://material.io/design/motion/speed.html#easing
const EASING = Easing.bezier(0.4, 0, 0.2, 1);
const WINDOW_LAYOUT = Dimensions.get('window');

/**
 * Menus display a list of choices on temporary elevated surfaces. Their placement varies based on the element that opens them.
 *
 *  <div class="screenshots">
 *   <img class="small" src="screenshots/menu-1.png" />
 *   <img class="small" src="screenshots/menu-2.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Button, Menu, Divider, Provider } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const openMenu = () => setVisible(true);
 *
 *   const closeMenu = () => setVisible(false);
 *
 *   return (
 *     <Provider>
 *       <View
 *         style={{
 *           paddingTop: 50,
 *           flexDirection: 'row',
 *           justifyContent: 'center',
 *         }}>
 *         <Menu
 *           visible={visible}
 *           onDismiss={closeMenu}
 *           anchor={<Button onPress={openMenu}>Show menu</Button>}>
 *           <Menu.Item onPress={() => {}} title="Item 1" />
 *           <Menu.Item onPress={() => {}} title="Item 2" />
 *           <Divider />
 *           <Menu.Item onPress={() => {}} title="Item 3" />
 *         </Menu>
 *       </View>
 *     </Provider>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 *
 * ### Note
 * When using `Menu` within a React Native's `Modal` component, you need to wrap all
 * `Modal` contents within a `Provider` in order for the menu to show. This
 * wrapping is not necessary if you use Paper's `Modal` instead.
 */
class Menu extends React.Component {
  // @component ./MenuItem.tsx
  static Item = MenuItem;
  static defaultProps = {
    statusBarHeight: APPROX_STATUSBAR_HEIGHT,
    overlayAccessibilityLabel: 'Close menu',
    testID: 'menu'
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.visible && !prevState.rendered) {
      return {
        rendered: true
      };
    }
    return null;
  }
  state = {
    rendered: this.props.visible,
    top: 0,
    left: 0,
    menuLayout: {
      width: 0,
      height: 0
    },
    anchorLayout: {
      width: 0,
      height: 0
    },
    opacityAnimation: new Animated.Value(0),
    scaleAnimation: new Animated.ValueXY({
      x: 0,
      y: 0
    }),
    windowLayout: {
      width: WINDOW_LAYOUT.width,
      height: WINDOW_LAYOUT.height
    }
  };
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.updateVisibility();
    }
  }
  componentWillUnmount() {
    var _this$keyboardDidShow, _this$keyboardDidHide;
    this.removeListeners();
    (_this$keyboardDidShow = this.keyboardDidShowListener) === null || _this$keyboardDidShow === void 0 ? void 0 : _this$keyboardDidShow.remove();
    (_this$keyboardDidHide = this.keyboardDidHideListener) === null || _this$keyboardDidHide === void 0 ? void 0 : _this$keyboardDidHide.remove();
  }
  anchor = null;
  menu = null;
  keyboardHeight = 0;
  isCoordinate = anchor => ! /*#__PURE__*/React.isValidElement(anchor) && typeof (anchor === null || anchor === void 0 ? void 0 : anchor.x) === 'number' && typeof (anchor === null || anchor === void 0 ? void 0 : anchor.y) === 'number';
  measureMenuLayout = () => new Promise(resolve => {
    if (this.menu) {
      this.menu.measureInWindow((x, y, width, height) => {
        resolve({
          x,
          y,
          width,
          height
        });
      });
    }
  });
  measureAnchorLayout = () => new Promise(resolve => {
    const {
      anchor
    } = this.props;
    if (this.isCoordinate(anchor)) {
      resolve({
        x: anchor.x,
        y: anchor.y,
        width: 0,
        height: 0
      });
      return;
    }
    if (this.anchor) {
      this.anchor.measureInWindow((x, y, width, height) => {
        resolve({
          x,
          y,
          width,
          height
        });
      });
    }
  });
  updateVisibility = async () => {
    // Menu is rendered in Portal, which updates items asynchronously
    // We need to do the same here so that the ref is up-to-date
    await Promise.resolve();
    if (this.props.visible) {
      this.show();
    } else {
      this.hide();
    }
  };
  isBrowser = () => Platform.OS === 'web' && 'document' in global;
  focusFirstDOMNode = el => {
    if (el && this.isBrowser()) {
      // When in the browser, we want to focus the first focusable item on toggle
      // For example, when menu is shown, focus the first item in the menu
      // And when menu is dismissed, send focus back to the button to resume tabbing
      const node = findNodeHandle(el);
      const focusableNode = node.querySelector(
      // This is a rough list of selectors that can be focused
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      focusableNode === null || focusableNode === void 0 ? void 0 : focusableNode.focus();
    }
  };
  handleDismiss = () => {
    if (this.props.visible) {
      var _this$props$onDismiss, _this$props;
      (_this$props$onDismiss = (_this$props = this.props).onDismiss) === null || _this$props$onDismiss === void 0 ? void 0 : _this$props$onDismiss.call(_this$props);
    }
    return true;
  };
  handleKeypress = e => {
    if (e.key === 'Escape') {
      var _this$props$onDismiss2, _this$props2;
      (_this$props$onDismiss2 = (_this$props2 = this.props).onDismiss) === null || _this$props$onDismiss2 === void 0 ? void 0 : _this$props$onDismiss2.call(_this$props2);
    }
  };
  attachListeners = () => {
    this.backHandlerSubscription = addEventListener(BackHandler, 'hardwareBackPress', this.handleDismiss);
    this.dimensionsSubscription = addEventListener(Dimensions, 'change', this.handleDismiss);
    this.isBrowser() && document.addEventListener('keyup', this.handleKeypress);
  };
  removeListeners = () => {
    var _this$backHandlerSubs, _this$dimensionsSubsc;
    (_this$backHandlerSubs = this.backHandlerSubscription) === null || _this$backHandlerSubs === void 0 ? void 0 : _this$backHandlerSubs.remove();
    (_this$dimensionsSubsc = this.dimensionsSubscription) === null || _this$dimensionsSubsc === void 0 ? void 0 : _this$dimensionsSubsc.remove();
    this.isBrowser() && document.removeEventListener('keyup', this.handleKeypress);
  };
  show = async () => {
    const windowLayout = Dimensions.get('window');
    const [menuLayout, anchorLayout] = await Promise.all([this.measureMenuLayout(), this.measureAnchorLayout()]);

    // When visible is true for first render
    // native views can be still not rendered and
    // measureMenuLayout/measureAnchorLayout functions
    // return wrong values e.g { x:0, y: 0, width: 0, height: 0 }
    // so we have to wait until views are ready
    // and rerun this function to show menu
    if (!windowLayout.width || !windowLayout.height || !menuLayout.width || !menuLayout.height || !anchorLayout.width && !this.isCoordinate(this.props.anchor) || !anchorLayout.height && !this.isCoordinate(this.props.anchor)) {
      requestAnimationFrame(this.show);
      return;
    }
    this.setState(() => ({
      left: anchorLayout.x,
      top: anchorLayout.y,
      anchorLayout: {
        height: anchorLayout.height,
        width: anchorLayout.width
      },
      menuLayout: {
        width: menuLayout.width,
        height: menuLayout.height
      },
      windowLayout: {
        height: windowLayout.height - this.keyboardHeight,
        width: windowLayout.width
      }
    }), () => {
      this.attachListeners();
      const {
        animation
      } = this.props.theme;
      Animated.parallel([Animated.timing(this.state.scaleAnimation, {
        toValue: {
          x: menuLayout.width,
          y: menuLayout.height
        },
        duration: ANIMATION_DURATION * animation.scale,
        easing: EASING,
        useNativeDriver: true
      }), Animated.timing(this.state.opacityAnimation, {
        toValue: 1,
        duration: ANIMATION_DURATION * animation.scale,
        easing: EASING,
        useNativeDriver: true
      })]).start(_ref => {
        let {
          finished
        } = _ref;
        if (finished) {
          this.focusFirstDOMNode(this.menu);
        }
      });
    });
  };
  hide = () => {
    this.removeListeners();
    const {
      animation
    } = this.props.theme;
    Animated.timing(this.state.opacityAnimation, {
      toValue: 0,
      duration: ANIMATION_DURATION * animation.scale,
      easing: EASING,
      useNativeDriver: true
    }).start(_ref2 => {
      let {
        finished
      } = _ref2;
      if (finished) {
        this.setState({
          menuLayout: {
            width: 0,
            height: 0
          },
          rendered: false
        });
        this.state.scaleAnimation.setValue({
          x: 0,
          y: 0
        });
        this.focusFirstDOMNode(this.anchor);
      }
    });
  };
  keyboardDidShow = e => {
    const keyboardHeight = e.endCoordinates.height;
    this.keyboardHeight = keyboardHeight;
  };
  keyboardDidHide = () => {
    this.keyboardHeight = 0;
  };
  render() {
    const {
      visible,
      anchor,
      anchorPosition,
      contentStyle,
      style,
      children,
      theme,
      statusBarHeight,
      onDismiss,
      overlayAccessibilityLabel,
      keyboardShouldPersistTaps,
      testID
    } = this.props;
    const {
      rendered,
      menuLayout,
      anchorLayout,
      opacityAnimation,
      scaleAnimation,
      windowLayout
    } = this.state;
    let {
      left,
      top
    } = this.state;
    if (!this.isCoordinate(this.anchor) && anchorPosition === 'bottom') {
      top += anchorLayout.height;
    }

    // I don't know why but on Android measure function is wrong by 24
    const additionalVerticalValue = Platform.select({
      android: statusBarHeight,
      default: 0
    });
    const scaleTransforms = [{
      scaleX: scaleAnimation.x.interpolate({
        inputRange: [0, menuLayout.width],
        outputRange: [0, 1]
      })
    }, {
      scaleY: scaleAnimation.y.interpolate({
        inputRange: [0, menuLayout.height],
        outputRange: [0, 1]
      })
    }];

    // We need to translate menu while animating scale to imitate transform origin for scale animation
    const positionTransforms = [];

    // Check if menu fits horizontally and if not align it to right.
    if (left <= windowLayout.width - menuLayout.width - SCREEN_INDENT) {
      positionTransforms.push({
        translateX: scaleAnimation.x.interpolate({
          inputRange: [0, menuLayout.width],
          outputRange: [-(menuLayout.width / 2), 0]
        })
      });

      // Check if menu position has enough space from left side
      if (left < SCREEN_INDENT) {
        left = SCREEN_INDENT;
      }
    } else {
      positionTransforms.push({
        translateX: scaleAnimation.x.interpolate({
          inputRange: [0, menuLayout.width],
          outputRange: [menuLayout.width / 2, 0]
        })
      });
      left += anchorLayout.width - menuLayout.width;
      const right = left + menuLayout.width;
      // Check if menu position has enough space from right side
      if (right > windowLayout.width - SCREEN_INDENT) {
        left = windowLayout.width - SCREEN_INDENT - menuLayout.width;
      }
    }

    // If the menu is larger than available vertical space,
    // calculate the height of scrollable view
    let scrollableMenuHeight = 0;

    // Check if the menu should be scrollable
    if (
    // Check if the menu overflows from bottom side
    top >= windowLayout.height - menuLayout.height - SCREEN_INDENT - additionalVerticalValue &&
    // And bottom side of the screen has more space than top side
    top <= windowLayout.height - top) {
      // Scrollable menu should be below the anchor (expands downwards)
      scrollableMenuHeight = windowLayout.height - top - SCREEN_INDENT - additionalVerticalValue;
    } else if (
    // Check if the menu overflows from bottom side
    top >= windowLayout.height - menuLayout.height - SCREEN_INDENT - additionalVerticalValue &&
    // And top side of the screen has more space than bottom side
    top >= windowLayout.height - top &&
    // And menu overflows from top side
    top <= menuLayout.height - anchorLayout.height + SCREEN_INDENT - additionalVerticalValue) {
      // Scrollable menu should be above the anchor (expands upwards)
      scrollableMenuHeight = top + anchorLayout.height - SCREEN_INDENT + additionalVerticalValue;
    }

    // Scrollable menu max height
    scrollableMenuHeight = scrollableMenuHeight > windowLayout.height - 2 * SCREEN_INDENT ? windowLayout.height - 2 * SCREEN_INDENT : scrollableMenuHeight;

    // Menu is typically positioned below the element that generates it
    // So first check if it fits below the anchor (expands downwards)
    if (
    // Check if menu fits vertically
    top <= windowLayout.height - menuLayout.height - SCREEN_INDENT - additionalVerticalValue ||
    // Or if the menu overflows from bottom side
    top >= windowLayout.height - menuLayout.height - SCREEN_INDENT - additionalVerticalValue &&
    // And bottom side of the screen has more space than top side
    top <= windowLayout.height - top) {
      positionTransforms.push({
        translateY: scaleAnimation.y.interpolate({
          inputRange: [0, menuLayout.height],
          outputRange: [-((scrollableMenuHeight || menuLayout.height) / 2), 0]
        })
      });

      // Check if menu position has enough space from top side
      if (top < SCREEN_INDENT) {
        top = SCREEN_INDENT;
      }
    } else {
      positionTransforms.push({
        translateY: scaleAnimation.y.interpolate({
          inputRange: [0, menuLayout.height],
          outputRange: [(scrollableMenuHeight || menuLayout.height) / 2, 0]
        })
      });
      top += anchorLayout.height - (scrollableMenuHeight || menuLayout.height);
      const bottom = top + (scrollableMenuHeight || menuLayout.height) + additionalVerticalValue;

      // Check if menu position has enough space from bottom side
      if (bottom > windowLayout.height - SCREEN_INDENT) {
        top = scrollableMenuHeight === windowLayout.height - 2 * SCREEN_INDENT ? -SCREEN_INDENT * 2 : windowLayout.height - menuLayout.height - SCREEN_INDENT - additionalVerticalValue;
      }
    }
    const shadowMenuContainerStyle = {
      opacity: opacityAnimation,
      transform: scaleTransforms,
      borderRadius: theme.roundness,
      ...(!theme.isV3 && {
        elevation: 8
      }),
      ...(scrollableMenuHeight ? {
        height: scrollableMenuHeight
      } : {})
    };
    const positionStyle = {
      top: this.isCoordinate(anchor) ? top : top + additionalVerticalValue,
      ...(I18nManager.getConstants().isRTL ? {
        right: left
      } : {
        left
      })
    };
    return /*#__PURE__*/React.createElement(View, {
      ref: ref => {
        this.anchor = ref;
      },
      collapsable: false
    }, this.isCoordinate(anchor) ? null : anchor, rendered ? /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
      accessibilityLabel: overlayAccessibilityLabel,
      accessibilityRole: "button",
      onPress: onDismiss
    }, /*#__PURE__*/React.createElement(View, {
      style: StyleSheet.absoluteFill
    })), /*#__PURE__*/React.createElement(View, {
      ref: ref => {
        this.menu = ref;
      },
      collapsable: false,
      accessibilityViewIsModal: visible,
      style: [styles.wrapper, positionStyle, style],
      pointerEvents: visible ? 'box-none' : 'none',
      onAccessibilityEscape: onDismiss
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: {
        transform: positionTransforms
      }
    }, /*#__PURE__*/React.createElement(Surface, _extends({
      style: [styles.shadowMenuContainer, shadowMenuContainerStyle, theme.isV3 && {
        backgroundColor: theme.colors.elevation.level2
      }, contentStyle]
    }, theme.isV3 && {
      elevation: 2
    }, {
      testID: `${testID}-surface`,
      theme: theme
    }), scrollableMenuHeight && /*#__PURE__*/React.createElement(ScrollView, {
      keyboardShouldPersistTaps: keyboardShouldPersistTaps
    }, children) || /*#__PURE__*/React.createElement(React.Fragment, null, children))))) : null);
  }
}
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute'
  },
  shadowMenuContainer: {
    opacity: 0,
    paddingVertical: 8
  }
});
export default withInternalTheme(Menu);
//# sourceMappingURL=Menu.js.map