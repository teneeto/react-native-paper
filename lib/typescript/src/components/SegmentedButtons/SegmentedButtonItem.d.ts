import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import type { ThemeProp } from 'src/types';
import type { IconSource } from '../Icon';
export declare type Props = {
    /**
     * Whether the segmented button is checked
     */
    checked: boolean;
    /**
     * Icon to display for the `SegmentedButtonItem`.
     */
    icon?: IconSource;
    /**
     * @supported Available in v5.x with theme version 3
     * Custom color for unchecked Text and Icon.
     */
    uncheckedColor?: string;
    /**
     * @supported Available in v5.x with theme version 3
     * Custom color for checked Text and Icon.
     */
    checkedColor?: string;
    /**
     * Whether the button is disabled.
     */
    disabled?: boolean;
    /**
     * Accessibility label for the `SegmentedButtonItem`. This is read by the screen reader when the user taps the button.
     */
    accessibilityLabel?: string;
    /**
     * Function to execute on press.
     */
    onPress?: (event: GestureResponderEvent) => void;
    /**
     * Value of button.
     */
    value: string;
    /**
     * Label text of the button.
     */
    label?: string;
    /**
     * Button segment.
     */
    segment?: 'first' | 'last';
    /**
     * Show optional check icon to indicate selected state
     */
    showSelectedCheck?: boolean;
    /**
     * Density is applied to the height, to allow usage in denser UIs.
     */
    density?: 'regular' | 'small' | 'medium' | 'high';
    style?: StyleProp<ViewStyle>;
    /**
     * testID to be used on tests.
     */
    testID?: string;
    /**
     * @optional
     */
    theme?: ThemeProp;
};
declare const SegmentedButtonItem: ({ checked, accessibilityLabel, disabled, style, showSelectedCheck, checkedColor, uncheckedColor, icon, testID, label, onPress, segment, density, theme: themeOverrides, }: Props) => JSX.Element;
export default SegmentedButtonItem;
export { SegmentedButtonItem as SegmentedButton };
//# sourceMappingURL=SegmentedButtonItem.d.ts.map