import * as React from 'react';
import { PressableAndroidRippleConfig, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import type { InternalTheme } from '../../types';
import type { PressableProps } from './Pressable';
declare type Props = PressableProps & {
    borderless?: boolean;
    background?: PressableAndroidRippleConfig;
    disabled?: boolean;
    onPress?: (e: GestureResponderEvent) => void | null;
    rippleColor?: string;
    underlayColor?: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    theme: InternalTheme;
};
declare const TouchableRipple: {
    ({ style, background, borderless, disabled: disabledProp, rippleColor, underlayColor, children, theme: themeOverrides, ...rest }: Props): JSX.Element;
    supported: boolean;
};
export default TouchableRipple;
//# sourceMappingURL=TouchableRipple.native.d.ts.map