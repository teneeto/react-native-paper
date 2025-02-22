function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';
import { useInternalTheme } from '../core/theming';
import overlay, { isAnimatedValue } from '../styles/overlay';
import shadow from '../styles/shadow';
import { forwardRef } from '../utils/forwardRef';
const MD2Surface = forwardRef((_ref, ref) => {
  let {
    style,
    theme: overrideTheme,
    ...rest
  } = _ref;
  const {
    elevation = 4
  } = StyleSheet.flatten(style) || {};
  const {
    dark: isDarkTheme,
    mode,
    colors
  } = useInternalTheme(overrideTheme);
  return /*#__PURE__*/React.createElement(Animated.View, _extends({
    ref: ref
  }, rest, {
    style: [{
      backgroundColor: isDarkTheme && mode === 'adaptive' ? overlay(elevation, colors === null || colors === void 0 ? void 0 : colors.surface) : colors === null || colors === void 0 ? void 0 : colors.surface
    }, elevation ? shadow(elevation) : null, style]
  }));
});

/**
 * Surface is a basic container that can give depth to an element with elevation shadow.
 * On dark theme with `adaptive` mode, surface is constructed by also placing a semi-transparent white overlay over a component surface.
 * See [Dark InternalTheme](https://callstack.github.io/react-native-paper/theming.html#dark-theme) for more information.
 * Overlay and shadow can be applied by specifying the `elevation` property both on Android and iOS.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/surface-android.png" />
 *     <figcaption>Surface on Android</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="medium" src="screenshots/surface-ios.png" />
 *     <figcaption>Surface on iOS</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Surface, Text } from 'react-native-paper';
 * import { StyleSheet } from 'react-native';
 *
 * const MyComponent = () => (
 *   <Surface style={styles.surface} elevation={4}>
 *      <Text>Surface</Text>
 *   </Surface>
 * );
 *
 * export default MyComponent;
 *
 * const styles = StyleSheet.create({
 *   surface: {
 *     padding: 8,
 *     height: 80,
 *     width: 80,
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *   },
 * });
 * ```
 */
const Surface = forwardRef((_ref2, ref) => {
  let {
    elevation = 1,
    children,
    theme: overridenTheme,
    style,
    testID = 'surface',
    ...props
  } = _ref2;
  const theme = useInternalTheme(overridenTheme);
  if (!theme.isV3) return /*#__PURE__*/React.createElement(MD2Surface, _extends({}, props, {
    theme: theme,
    style: style,
    ref: ref
  }), children);
  const {
    colors
  } = theme;
  const inputRange = [0, 1, 2, 3, 4, 5];
  const backgroundColor = (() => {
    var _colors$elevation2;
    if (isAnimatedValue(elevation)) {
      return elevation.interpolate({
        inputRange,
        outputRange: inputRange.map(elevation => {
          var _colors$elevation;
          return (_colors$elevation = colors.elevation) === null || _colors$elevation === void 0 ? void 0 : _colors$elevation[`level${elevation}`];
        })
      });
    }
    return (_colors$elevation2 = colors.elevation) === null || _colors$elevation2 === void 0 ? void 0 : _colors$elevation2[`level${elevation}`];
  })();
  if (Platform.OS === 'web') {
    return /*#__PURE__*/React.createElement(Animated.View, _extends({}, props, {
      ref: ref,
      testID: testID,
      style: [{
        backgroundColor
      }, elevation ? shadow(elevation, theme.isV3) : null, style]
    }), children);
  }
  if (Platform.OS === 'android') {
    const elevationLevel = [0, 3, 6, 9, 12, 15];
    const getElevationAndroid = () => {
      if (isAnimatedValue(elevation)) {
        return elevation.interpolate({
          inputRange,
          outputRange: elevationLevel
        });
      }
      return elevationLevel[elevation];
    };
    const {
      margin,
      padding,
      transform,
      borderRadius
    } = StyleSheet.flatten(style) || {};
    const outerLayerStyles = {
      margin,
      padding,
      transform,
      borderRadius
    };
    const sharedStyle = [{
      backgroundColor
    }, style];
    return /*#__PURE__*/React.createElement(Animated.View, _extends({}, props, {
      testID: testID,
      ref: ref,
      style: [{
        backgroundColor,
        transform
      }, outerLayerStyles, sharedStyle, {
        elevation: getElevationAndroid()
      }]
    }), children);
  }
  const iOSShadowOutputRanges = [{
    shadowOpacity: 0.15,
    height: [0, 1, 2, 4, 6, 8],
    shadowRadius: [0, 3, 6, 8, 10, 12]
  }, {
    shadowOpacity: 0.3,
    height: [0, 1, 1, 1, 2, 4],
    shadowRadius: [0, 1, 2, 3, 3, 4]
  }];
  const shadowColor = '#000';
  const {
    position,
    alignSelf,
    top,
    left,
    right,
    bottom,
    start,
    end,
    flex,
    ...restStyle
  } = StyleSheet.flatten(style) || {};
  const absoluteStyles = {
    position,
    alignSelf,
    top,
    right,
    bottom,
    left,
    start,
    end
  };
  const sharedStyle = [{
    backgroundColor,
    flex
  }, restStyle];
  const innerLayerViewStyles = [{
    flex
  }];
  const outerLayerViewStyles = [absoluteStyles, innerLayerViewStyles];
  if (isAnimatedValue(elevation)) {
    const inputRange = [0, 1, 2, 3, 4, 5];
    const getStyleForAnimatedShadowLayer = layer => {
      return {
        shadowColor,
        shadowOpacity: elevation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, iOSShadowOutputRanges[layer].shadowOpacity],
          extrapolate: 'clamp'
        }),
        shadowOffset: {
          width: 0,
          height: elevation.interpolate({
            inputRange,
            outputRange: iOSShadowOutputRanges[layer].height
          })
        },
        shadowRadius: elevation.interpolate({
          inputRange,
          outputRange: iOSShadowOutputRanges[layer].shadowRadius
        })
      };
    };
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: [getStyleForAnimatedShadowLayer(0), outerLayerViewStyles],
      testID: `${testID}-outer-layer`
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: [getStyleForAnimatedShadowLayer(1), innerLayerViewStyles],
      testID: `${testID}-inner-layer`
    }, /*#__PURE__*/React.createElement(Animated.View, _extends({}, props, {
      testID: testID,
      style: sharedStyle
    }), children)));
  }
  const getStyleForShadowLayer = layer => {
    return {
      shadowColor,
      shadowOpacity: elevation ? iOSShadowOutputRanges[layer].shadowOpacity : 0,
      shadowOffset: {
        width: 0,
        height: iOSShadowOutputRanges[layer].height[elevation]
      },
      shadowRadius: iOSShadowOutputRanges[layer].shadowRadius[elevation]
    };
  };
  return /*#__PURE__*/React.createElement(Animated.View, {
    ref: ref,
    style: [getStyleForShadowLayer(0), outerLayerViewStyles],
    testID: `${testID}-outer-layer`
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [getStyleForShadowLayer(1), innerLayerViewStyles],
    testID: `${testID}-inner-layer`
  }, /*#__PURE__*/React.createElement(Animated.View, _extends({}, props, {
    testID: testID,
    style: sharedStyle
  }), children)));
});
export default Surface;
//# sourceMappingURL=Surface.js.map