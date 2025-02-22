import type { AccessibilityState } from 'react-native';
import { Animated, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import type { $RemoveChildren, ThemeProp } from '../../types';
import type { IconSource } from '../Icon';
import Surface from '../Surface';
export declare type AnimatedFABIconMode = 'static' | 'dynamic';
export declare type AnimatedFABAnimateFrom = 'left' | 'right';
export declare type Props = $RemoveChildren<typeof Surface> & {
    /**
     * Icon to display for the `FAB`.
     */
    icon: IconSource;
    /**
     * Label for extended `FAB`.
     */
    label: string;
    /**
     * Make the label text uppercased.
     */
    uppercase?: boolean;
    /**
     * Accessibility label for the FAB. This is read by the screen reader when the user taps the FAB.
     * Uses `label` by default if specified.
     */
    accessibilityLabel?: string;
    /**
     * Accessibility state for the FAB. This is read by the screen reader when the user taps the FAB.
     */
    accessibilityState?: AccessibilityState;
    /**
     * Custom color for the icon and label of the `FAB`.
     */
    color?: string;
    /**
     * Whether `FAB` is disabled. A disabled button is greyed out and `onPress` is not called on touch.
     */
    disabled?: boolean;
    /**
     * Whether `FAB` is currently visible.
     */
    visible?: boolean;
    /**
     * Function to execute on press.
     */
    onPress?: (e: GestureResponderEvent) => void;
    /**
     * Function to execute on long press.
     */
    onLongPress?: () => void;
    /**
     * The number of milliseconds a user must touch the element before executing `onLongPress`.
     */
    delayLongPress?: number;
    /**
     * Whether icon should be translated to the end of extended `FAB` or be static and stay in the same place. The default value is `dynamic`.
     */
    iconMode?: AnimatedFABIconMode;
    /**
     * Indicates from which direction animation should be performed. The default value is `right`.
     */
    animateFrom?: AnimatedFABAnimateFrom;
    /**
     * Whether `FAB` should start animation to extend.
     */
    extended: boolean;
    /**
     * @supported Available in v5.x with theme version 3
     *
     * Color mappings variant for combinations of container and icon colors.
     */
    variant?: 'primary' | 'secondary' | 'tertiary' | 'surface';
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
    /**
     * @optional
     */
    theme?: ThemeProp;
    testID?: string;
};
/**
 * An animated, extending horizontally floating action button represents the primary action in an application.
 *
 * <div class="screenshots">
 *   <img class="small" src="screenshots/animated-fab.gif" />
 * </div>
 *
 * ## Usage
 * ```js
 * import React from 'react';
 * import {
 *   StyleProp,
 *   ViewStyle,
 *   Animated,
 *   StyleSheet,
 *   Platform,
 *   ScrollView,
 *   Text,
 *   SafeAreaView,
 *   I18nManager,
 * } from 'react-native';
 * import { AnimatedFAB } from 'react-native-paper';
 *
 * const MyComponent = ({
 *   animatedValue,
 *   visible,
 *   extended,
 *   label,
 *   animateFrom,
 *   style,
 *   iconMode,
 * }) => {
 *   const [isExtended, setIsExtended] = React.useState(true);
 *
 *   const isIOS = Platform.OS === 'ios';
 *
 *   const onScroll = ({ nativeEvent }) => {
 *     const currentScrollPosition =
 *       Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
 *
 *     setIsExtended(currentScrollPosition <= 0);
 *   };
 *
 *   const fabStyle = { [animateFrom]: 16 };
 *
 *   return (
 *     <SafeAreaView style={styles.container}>
 *       <ScrollView onScroll={onScroll}>
 *         {[...new Array(100).keys()].map((_, i) => (
 *           <Text>{i}</Text>
 *         ))}
 *       </ScrollView>
 *       <AnimatedFAB
 *         icon={'plus'}
 *         label={'Label'}
 *         extended={isExtended}
 *         onPress={() => console.log('Pressed')}
 *         visible={visible}
 *         animateFrom={'right'}
 *         iconMode={'static'}
 *         style={[styles.fabStyle, style, fabStyle]}
 *       />
 *     </SafeAreaView>
 *   );
 * };
 *
 * export default MyComponent;
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flexGrow: 1,
 *   },
 *   fabStyle: {
 *     bottom: 16,
 *     right: 16,
 *     position: 'absolute',
 *   },
 * });
 * ```
 */
declare const AnimatedFAB: ({ icon, label, accessibilityLabel, accessibilityState, color: customColor, disabled, onPress, onLongPress, delayLongPress, theme: themeOverrides, style, visible, uppercase: uppercaseProp, testID, animateFrom, extended, iconMode, variant, ...rest }: Props) => JSX.Element;
export default AnimatedFAB;
//# sourceMappingURL=AnimatedFAB.d.ts.map