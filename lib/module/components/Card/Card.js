function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useInternalTheme } from '../../core/theming';
import Surface from '../Surface';
import CardActions from './CardActions';
import CardContent from './CardContent';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CardCover from './CardCover';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CardTitle from './CardTitle';
import { getCardColors } from './utils';
/**
 * A card is a sheet of material that serves as an entry point to more detailed information.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/card-1.png" />
 *     <figcaption>Elevated card</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/card-2.png" />
 *     <figcaption>Outlined card</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/card-3.png" />
 *     <figcaption>Contained card</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Avatar, Button, Card, Text } from 'react-native-paper';
 *
 * const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
 *
 * const MyComponent = () => (
 *   <Card>
 *     <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
 *     <Card.Content>
 *       <Text variant="titleLarge">Card title</Text>
 *       <Text variant="bodyMedium">Card content</Text>
 *     </Card.Content>
 *     <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
 *     <Card.Actions>
 *       <Button>Cancel</Button>
 *       <Button>Ok</Button>
 *     </Card.Actions>
 *   </Card>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Card = _ref => {
  let {
    elevation: cardElevation = 1,
    onLongPress,
    delayLongPress,
    onPress,
    mode: cardMode = 'elevated',
    children,
    style,
    contentStyle,
    theme: themeOverrides,
    testID = 'card',
    accessible,
    ...rest
  } = _ref;
  const theme = useInternalTheme(themeOverrides);
  const isMode = React.useCallback(modeToCompare => {
    return cardMode === modeToCompare;
  }, [cardMode]);

  // Default animated value
  const {
    current: elevation
  } = React.useRef(new Animated.Value(cardElevation));
  // Dark adaptive animated value, used in case of toggling the theme,
  // it prevents animating the background with native drivers inside Surface
  const {
    current: elevationDarkAdaptive
  } = React.useRef(new Animated.Value(cardElevation));
  const {
    animation,
    dark,
    mode,
    roundness,
    isV3
  } = theme;
  const prevDarkRef = React.useRef(dark);
  React.useEffect(() => {
    prevDarkRef.current = dark;
  });
  const prevDark = prevDarkRef.current;
  const isAdaptiveMode = mode === 'adaptive';
  const animationDuration = 150 * animation.scale;
  React.useEffect(() => {
    /**
     * Resets animations values if updating to dark adaptive mode,
     * otherwise, any card that is in the middle of animation while
     * toggling the theme will stay at that animated value until
     * the next press-in
     */
    if (dark && isAdaptiveMode && !prevDark) {
      elevation.setValue(cardElevation);
      elevationDarkAdaptive.setValue(cardElevation);
    }
  }, [prevDark, dark, isAdaptiveMode, cardElevation, elevation, elevationDarkAdaptive]);
  const runElevationAnimation = pressType => {
    const isPressTypeIn = pressType === 'in';
    if (dark && isAdaptiveMode) {
      Animated.timing(elevationDarkAdaptive, {
        toValue: isPressTypeIn ? isV3 ? 2 : 8 : cardElevation,
        duration: animationDuration,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(elevation, {
        toValue: isPressTypeIn ? isV3 ? 2 : 8 : cardElevation,
        duration: animationDuration,
        useNativeDriver: false
      }).start();
    }
  };
  const handlePressIn = () => {
    runElevationAnimation('in');
  };
  const handlePressOut = () => {
    runElevationAnimation('out');
  };
  const total = React.Children.count(children);
  const siblings = React.Children.map(children, child => /*#__PURE__*/React.isValidElement(child) && child.type ? child.type.displayName : null);
  const computedElevation = dark && isAdaptiveMode ? elevationDarkAdaptive : elevation;
  const {
    backgroundColor,
    borderColor: themedBorderColor
  } = getCardColors({
    theme,
    mode: cardMode
  });
  const {
    borderRadius = (isV3 ? 3 : 1) * roundness,
    borderColor = themedBorderColor
  } = StyleSheet.flatten(style) || {};
  return /*#__PURE__*/React.createElement(Surface, _extends({
    style: [{
      borderRadius
    }, isV3 && !isMode('elevated') && {
      backgroundColor
    }, !isV3 && isMode('outlined') ? styles.resetElevation : {
      elevation: computedElevation
    }, style],
    theme: theme
  }, isV3 && {
    elevation: isMode('elevated') ? computedElevation : 0
  }, {
    testID: `${testID}-container`
  }, rest), isMode('outlined') && /*#__PURE__*/React.createElement(View, {
    pointerEvents: "none",
    testID: `${testID}-outline`,
    style: [{
      borderRadius,
      borderColor
    }, styles.outline]
  }), /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    delayPressIn: 0,
    disabled: !(onPress || onLongPress),
    delayLongPress: delayLongPress,
    onLongPress: onLongPress,
    onPress: onPress,
    onPressIn: onPress || onLongPress ? handlePressIn : undefined,
    onPressOut: onPress || onLongPress ? handlePressOut : undefined,
    testID: testID,
    accessible: accessible
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.innerContainer, contentStyle]
  }, React.Children.map(children, (child, index) => /*#__PURE__*/React.isValidElement(child) ? /*#__PURE__*/React.cloneElement(child, {
    index,
    total,
    siblings
  }) : child))));
};

// @component ./CardContent.tsx
Card.Content = CardContent;
// @component ./CardActions.tsx
Card.Actions = CardActions;
// @component ./CardCover.tsx
Card.Cover = CardCover;
// @component ./CardTitle.tsx
Card.Title = CardTitle;
const styles = StyleSheet.create({
  innerContainer: {
    flexShrink: 1
  },
  outline: {
    borderWidth: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2
  },
  resetElevation: {
    elevation: 0
  }
});
export default Card;
//# sourceMappingURL=Card.js.map