import * as React from 'react';
import { GestureResponderEvent, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import type { $RemoveChildren, ThemeProp } from '../../types';
import { TextRef } from '../Typography/Text';
declare type TitleString = {
    title: string;
    titleStyle?: StyleProp<TextStyle>;
};
declare type TitleElement = {
    title: React.ReactNode;
    titleStyle?: never;
};
export declare type Props = $RemoveChildren<typeof View> & {
    /**
     * Text or component for the title.
     */
    title: React.ReactNode;
    /**
     * Style for the title, if `title` is a string.
     */
    titleStyle?: StyleProp<TextStyle>;
    /**
     * Reference for the title.
     */
    titleRef?: React.RefObject<TextRef>;
    /**
     * @deprecated Deprecated in v5.x
     * Text for the subtitle.
     */
    subtitle?: React.ReactNode;
    /**
     * @deprecated Deprecated in v5.x
     * Style for the subtitle.
     */
    subtitleStyle?: StyleProp<TextStyle>;
    /**
     * Function to execute on press.
     */
    onPress?: (e: GestureResponderEvent) => void;
    /**
     * Custom color for the text.
     */
    color?: string;
    /**
     * @internal
     */
    mode?: 'small' | 'medium' | 'large' | 'center-aligned';
    style?: StyleProp<ViewStyle>;
    /**
     * @optional
     */
    theme?: ThemeProp;
    /**
     * testID to be used on tests.
     */
    testID?: string;
} & (TitleString | TitleElement);
/**
 * A component used to display a title and optional subtitle in an appbar.
 *
 * <div class="screenshots">
 *   <img class="small" src="screenshots/appbar-content.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Appbar } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *     <Appbar.Header>
 *        <Appbar.Content title="Title" />
 *     </Appbar.Header>
 * );
 *
 * export default MyComponent;
 * ```
 */
declare const AppbarContent: {
    ({ color: titleColor, subtitle, subtitleStyle, onPress, style, titleRef, titleStyle, title, mode, theme: themeOverrides, testID, ...rest }: Props): JSX.Element;
    displayName: string;
};
export default AppbarContent;
export { AppbarContent };
//# sourceMappingURL=AppbarContent.d.ts.map