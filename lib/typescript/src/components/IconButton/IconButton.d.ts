import * as React from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle, View, Animated } from 'react-native';
import type { $RemoveChildren, ThemeProp } from '../../types';
import { IconSource } from '../Icon';
import TouchableRipple from '../TouchableRipple/TouchableRipple';
declare type IconButtonMode = 'outlined' | 'contained' | 'contained-tonal';
export declare type Props = $RemoveChildren<typeof TouchableRipple> & {
    /**
     * Icon to display.
     */
    icon: IconSource;
    /**
     * @supported Available in v5.x with theme version 3
     * Mode of the icon button. By default there is no specified mode - only pressable icon will be rendered.
     */
    mode?: IconButtonMode;
    /**
     * @renamed Renamed from 'color' to 'iconColor' in v5.x
     * Color of the icon.
     */
    iconColor?: string;
    /**
     * Background color of the icon container.
     */
    containerColor?: string;
    /**
     * @supported Available in v5.x with theme version 3
     * Whether icon button is selected. A selected button receives alternative combination of icon and container colors.
     */
    selected?: boolean;
    /**
     * Size of the icon.
     */
    size?: number;
    /**
     * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
     */
    disabled?: boolean;
    /**
     * Whether an icon change is animated.
     */
    animated?: boolean;
    /**
     * Accessibility label for the button. This is read by the screen reader when the user taps the button.
     */
    accessibilityLabel?: string;
    /**
     * Function to execute on press.
     */
    onPress?: (e: GestureResponderEvent) => void;
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
    ref?: React.RefObject<View>;
    /**
     * @optional
     */
    theme?: ThemeProp;
};
/**
 * An icon button is a button which displays only an icon without a label.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/icon-button-1.png" />
 *     <figcaption>Default icon button</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="small" src="screenshots/icon-button-2.png" />
 *     <figcaption>Contained icon button</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="small" src="screenshots/icon-button-3.png" />
 *     <figcaption>Contained-tonal icon button</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="small" src="screenshots/icon-button-4.png" />
 *     <figcaption>Outlined icon button</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { IconButton, MD3Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <IconButton
 *     icon="camera"
 *     iconColor={MD3Colors.error50}
 *     size={20}
 *     onPress={() => console.log('Pressed')}
 *   />
 * );
 *
 * export default MyComponent;
 * ```
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/touchable-ripple.html
 */
declare const IconButton: import("../../utils/forwardRef").ForwarRefComponent<View, Props>;
export default IconButton;
//# sourceMappingURL=IconButton.d.ts.map