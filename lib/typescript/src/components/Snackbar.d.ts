import * as React from 'react';
import { Animated, StyleProp, View, ViewStyle } from 'react-native';
import type { $RemoveChildren, ThemeProp } from '../types';
import Button from './Button/Button';
import type { IconSource } from './Icon';
import Surface from './Surface';
export declare type Props = React.ComponentProps<typeof Surface> & {
    /**
     * Whether the Snackbar is currently visible.
     */
    visible: boolean;
    /**
     * Label and press callback for the action button. It should contain the following properties:
     * - `label` - Label of the action button
     * - `onPress` - Callback that is called when action button is pressed.
     */
    action?: $RemoveChildren<typeof Button> & {
        label: string;
    };
    /**
     * @supported Available in v5.x with theme version 3
     * Icon to display when `onIconPress` is defined. Default will be `close` icon.
     */
    icon?: IconSource;
    /**
     * @supported Available in v5.x with theme version 3
     * Function to execute on icon button press. The icon button appears only when this prop is specified.
     */
    onIconPress?: () => void;
    /**
     * @supported Available in v5.x with theme version 3
     * Accessibility label for the icon button. This is read by the screen reader when the user taps the button.
     */
    iconAccessibilityLabel?: string;
    /**
     * The duration for which the Snackbar is shown.
     */
    duration?: number;
    /**
     * Callback called when Snackbar is dismissed. The `visible` prop needs to be updated when this is called.
     */
    onDismiss: () => void;
    /**
     * Text content of the Snackbar.
     */
    children: React.ReactNode;
    /**
     * Style for the wrapper of the snackbar
     */
    /**
     * @supported Available in v5.x with theme version 3
     * Changes Snackbar shadow and background on iOS and Android.
     */
    elevation?: 0 | 1 | 2 | 3 | 4 | 5 | Animated.Value;
    wrapperStyle?: StyleProp<ViewStyle>;
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
    ref?: React.RefObject<View>;
    /**
     * @optional
     */
    theme?: ThemeProp;
};
/**
 * Snackbars provide brief feedback about an operation through a message at the bottom of the screen.
 * Snackbar by default uses `onSurface` color from theme.
 * <div class="screenshots">
 *   <img class="small" src="screenshots/snackbar.gif" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View, StyleSheet } from 'react-native';
 * import { Button, Snackbar } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const onToggleSnackBar = () => setVisible(!visible);
 *
 *   const onDismissSnackBar = () => setVisible(false);
 *
 *   return (
 *     <View style={styles.container}>
 *       <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
 *       <Snackbar
 *         visible={visible}
 *         onDismiss={onDismissSnackBar}
 *         action={{
 *           label: 'Undo',
 *           onPress: () => {
 *             // Do something
 *           },
 *         }}>
 *         Hey there! I'm a Snackbar.
 *       </Snackbar>
 *     </View>
 *   );
 * };
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     justifyContent: 'space-between',
 *   },
 * });
 *
 * export default MyComponent;
 * ```
 */
declare const Snackbar: {
    ({ visible, action, icon, onIconPress, iconAccessibilityLabel, duration, onDismiss, children, elevation, wrapperStyle, style, theme: themeOverrides, ...rest }: Props): JSX.Element | null;
    /**
     * Show the Snackbar for a short duration.
     */
    DURATION_SHORT: number;
    /**
     * Show the Snackbar for a medium duration.
     */
    DURATION_MEDIUM: number;
    /**
     * Show the Snackbar for a long duration.
     */
    DURATION_LONG: number;
};
export default Snackbar;
//# sourceMappingURL=Snackbar.d.ts.map