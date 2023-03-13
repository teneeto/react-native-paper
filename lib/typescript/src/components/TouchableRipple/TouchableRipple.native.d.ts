import * as React from 'react';
import { PressableAndroidRippleConfig, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import type { ThemeProp } from '../../types';
import type { PressableProps } from './Pressable';
export declare type Props = PressableProps & {
    borderless?: boolean;
    background?: PressableAndroidRippleConfig;
    centered?: boolean;
    disabled?: boolean;
    onPress?: (e: GestureResponderEvent) => void | null;
    onLongPress?: (e: GestureResponderEvent) => void;
    rippleColor?: string;
    underlayColor?: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    theme?: ThemeProp;
};
declare const TouchableRipple: {
    ({ style, background, borderless, disabled: disabledProp, rippleColor, underlayColor, children, theme: themeOverrides, ...rest }: Props): JSX.Element;
    supported: boolean;
};
export default TouchableRipple;
//# sourceMappingURL=TouchableRipple.native.d.ts.map