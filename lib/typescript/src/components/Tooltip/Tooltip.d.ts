import * as React from 'react';
import type { ThemeProp } from 'src/types';
export declare type Props = {
    /**
     * Tooltip reference element. Needs to be able to hold a ref.
     */
    children: React.ReactElement;
    /**
     * The number of milliseconds a user must touch the element before showing the tooltip.
     */
    enterTouchDelay?: number;
    /**
     * The number of milliseconds after the user stops touching an element before hiding the tooltip.
     */
    leaveTouchDelay?: number;
    /**
     * Tooltip title
     */
    title: string;
    /**
     * @optional
     */
    theme?: ThemeProp;
};
/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 *
 * Plain tooltips, when activated, display a text label identifying an element, such as a description of its function. Tooltips should include only short, descriptive text and avoid restating visible UI text.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/tooltip.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { IconButton, Tooltip } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Tooltip title="Selected Camera">
 *     <IconButton icon="camera" selected size={24} onPress={() => {}} />
 *   </Tooltip>
 * );
 *
 * export default MyComponent;
 * ```
 */
declare const Tooltip: ({ children, enterTouchDelay, leaveTouchDelay, title, theme: themeOverrides, ...rest }: Props) => JSX.Element;
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map