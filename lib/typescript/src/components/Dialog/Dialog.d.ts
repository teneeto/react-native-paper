import * as React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import type { ThemeProp } from '../../types';
export declare type Props = {
    /**
     * Determines whether clicking outside the dialog dismiss it.
     */
    dismissable?: boolean;
    /**
     * Callback that is called when the user dismisses the dialog.
     */
    onDismiss?: () => void;
    /**
     * Determines Whether the dialog is visible.
     */
    visible: boolean;
    /**
     * Content of the `Dialog`.
     */
    children: React.ReactNode;
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
    /**
     * @optional
     */
    theme?: ThemeProp;
};
/**
 * Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.
 * To render the `Dialog` above other components, you'll need to wrap it with the [`Portal`](portal.html) component.
 *
 *  <div class="screenshots">
 *   <img class="small" src="screenshots/dialog-1.png" />
 *   <img class="small" src="screenshots/dialog-2.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const showDialog = () => setVisible(true);
 *
 *   const hideDialog = () => setVisible(false);
 *
 *   return (
 *     <Provider>
 *       <View>
 *         <Button onPress={showDialog}>Show Dialog</Button>
 *         <Portal>
 *           <Dialog visible={visible} onDismiss={hideDialog}>
 *             <Dialog.Title>Alert</Dialog.Title>
 *             <Dialog.Content>
 *               <Text variant="bodyMedium">This is simple dialog</Text>
 *             </Dialog.Content>
 *             <Dialog.Actions>
 *               <Button onPress={hideDialog}>Done</Button>
 *             </Dialog.Actions>
 *           </Dialog>
 *         </Portal>
 *       </View>
 *     </Provider>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
declare const Dialog: {
    ({ children, dismissable, onDismiss, visible, style, theme: themeOverrides, }: Props): JSX.Element;
    Content: {
        (props: import("./DialogContent").Props): JSX.Element;
        displayName: string;
    };
    Actions: {
        (props: import("./DialogActions").Props): JSX.Element;
        displayName: string;
    };
    Title: {
        ({ children, theme: themeOverrides, style, ...rest }: import("./DialogTitle").Props): JSX.Element;
        displayName: string;
    };
    ScrollArea: {
        (props: import("./DialogScrollArea").Props): JSX.Element;
        displayName: string;
    };
    Icon: {
        ({ size, color, icon, theme: themeOverrides, }: import("./DialogIcon").Props): JSX.Element | null;
        displayName: string;
    };
};
export default Dialog;
//# sourceMappingURL=Dialog.d.ts.map