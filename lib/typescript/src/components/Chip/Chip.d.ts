import * as React from 'react';
import { Animated, GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { EllipsizeProp, ThemeProp } from '../../types';
import type { IconSource } from '../Icon';
import Surface from '../Surface';
export declare type Props = React.ComponentProps<typeof Surface> & {
    /**
     * Mode of the chip.
     * - `flat` - flat chip without outline.
     * - `outlined` - chip with an outline.
     */
    mode?: 'flat' | 'outlined';
    /**
     * Text content of the `Chip`.
     */
    children: React.ReactNode;
    /**
     * Icon to display for the `Chip`. Both icon and avatar cannot be specified.
     */
    icon?: IconSource;
    /**
     * Avatar to display for the `Chip`. Both icon and avatar cannot be specified.
     */
    avatar?: React.ReactNode;
    /**
     * Icon to display as the close button for the `Chip`. The icon appears only when the onClose prop is specified.
     */
    closeIcon?: IconSource;
    /**
     * Whether chip is selected.
     */
    selected?: boolean;
    /**
     * Whether to style the chip color as selected.
     * Note: With theme version 3 `selectedColor` doesn't apply to the `icon`.
     *       If you want specify custom color for the `icon`, render your own `Icon` component.
     */
    selectedColor?: string;
    /**
     * @supported Available in v5.x with theme version 3
     * Whether to display overlay on selected chip
     */
    showSelectedOverlay?: boolean;
    /**
     * Whether the chip is disabled. A disabled chip is greyed out and `onPress` is not called on touch.
     */
    disabled?: boolean;
    /**
     * Accessibility label for the chip. This is read by the screen reader when the user taps the chip.
     */
    accessibilityLabel?: string;
    /**
     * Accessibility label for the close icon. This is read by the screen reader when the user taps the close icon.
     */
    closeIconAccessibilityLabel?: string;
    /**
     * Function to execute on press.
     */
    onPress?: (e: GestureResponderEvent) => void;
    /**
     * @supported Available in v5.x with theme version 3
     * Sets smaller horizontal paddings `12dp` around label, when there is only label.
     */
    compact?: boolean;
    /**
     * @supported Available in v5.x with theme version 3
     * Whether chip should have the elevation.
     */
    elevated?: boolean;
    /**
     * Function to execute on long press.
     */
    onLongPress?: () => void;
    /**
     * The number of milliseconds a user must touch the element before executing `onLongPress`.
     */
    delayLongPress?: number;
    /**
     * Function to execute on close button press. The close button appears only when this prop is specified.
     */
    onClose?: () => void;
    /**
     * Style of chip's text
     */
    textStyle?: StyleProp<TextStyle>;
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
    /**
     * @optional
     */
    theme?: ThemeProp;
    /**
     * Pass down testID from chip props to touchable for Detox tests.
     */
    testID?: string;
    /**
     * Ellipsize Mode for the children text
     */
    ellipsizeMode?: EllipsizeProp;
};
/**
 * Chips can be used to display entities in small blocks.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/chip-1.png" />
 *     <figcaption>Flat chip</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="small" src="screenshots/chip-2.png" />
 *     <figcaption>Outlined chip</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Chip } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
 * );
 *
 * export default MyComponent;
 * ```
 */
declare const Chip: ({ mode, children, icon, avatar, selected, disabled, accessibilityLabel, closeIconAccessibilityLabel, onPress, onLongPress, delayLongPress, onClose, closeIcon, textStyle, style, theme: themeOverrides, testID, selectedColor, showSelectedOverlay, ellipsizeMode, compact, elevated, ...rest }: Props) => JSX.Element;
export default Chip;
//# sourceMappingURL=Chip.d.ts.map