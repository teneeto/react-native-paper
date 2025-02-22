import * as React from 'react';
import {
  PressableAndroidRippleConfig,
  StyleProp,
  Platform,
  ViewStyle,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

import { useInternalTheme } from '../../core/theming';
import type { ThemeProp } from '../../types';
import type { PressableProps } from './Pressable';
import { Pressable, PressableStateCallbackType } from './Pressable';
import { getTouchableRippleColors } from './utils';

const ANDROID_VERSION_LOLLIPOP = 21;
const ANDROID_VERSION_PIE = 28;

export type Props = PressableProps & {
  borderless?: boolean;
  background?: PressableAndroidRippleConfig;
  centered?: boolean;
  disabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void | null;
  onLongPress?: (e: GestureResponderEvent) => void;
  rippleColor?: string;
  underlayColor?: string;
  children:
    | ((state: PressableStateCallbackType) => React.ReactNode)
    | React.ReactNode;
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
    | undefined;
  theme?: ThemeProp;
};

const TouchableRipple = ({
  style,
  background,
  borderless = false,
  disabled: disabledProp,
  rippleColor,
  underlayColor,
  children,
  theme: themeOverrides,
  ...rest
}: Props) => {
  const theme = useInternalTheme(themeOverrides);
  const [showUnderlay, setShowUnderlay] = React.useState<boolean>(false);

  const disabled = disabledProp || !rest.onPress;
  const { calculatedRippleColor, calculatedUnderlayColor } =
    getTouchableRippleColors({
      theme,
      rippleColor,
      underlayColor,
    });

  // A workaround for ripple on Android P is to use useForeground + overflow: 'hidden'
  // https://github.com/facebook/react-native/issues/6480
  const useForeground =
    Platform.OS === 'android' &&
    Platform.Version >= ANDROID_VERSION_PIE &&
    borderless;

  const handlePressIn = (e: GestureResponderEvent) => {
    setShowUnderlay(true);
    rest.onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    setShowUnderlay(false);
    rest.onPressOut?.(e);
  };

  if (TouchableRipple.supported) {
    return (
      <Pressable
        {...rest}
        disabled={disabled}
        style={(state) => [
          borderless && styles.overflowHidden,
          typeof style === 'function' ? style(state) : style,
        ]}
        android_ripple={
          background != null
            ? background
            : {
                color: calculatedRippleColor,
                borderless,
                foreground: useForeground,
              }
        }
      >
        {(state) =>
          React.Children.only(
            typeof children === 'function' ? children(state) : children
          )
        }
      </Pressable>
    );
  }

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      style={(state) => [
        borderless && styles.overflowHidden,
        showUnderlay && { backgroundColor: calculatedUnderlayColor },
        typeof style === 'function' ? style(state) : style,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {(state) =>
        React.Children.only(
          typeof children === 'function' ? children(state) : children
        )
      }
    </Pressable>
  );
};

TouchableRipple.supported =
  Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP;

const styles = StyleSheet.create({
  overflowHidden: {
    overflow: 'hidden',
  },
});

export default TouchableRipple;
