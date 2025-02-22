function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useInternalTheme } from '../../core/theming';
import shadow from '../../styles/shadow';
import { Appbar } from './Appbar';
import { DEFAULT_APPBAR_HEIGHT, getAppbarColor, modeAppbarHeight } from './utils';
/**
 * A component to use as a header at the top of the screen.
 * It can contain the screen title, controls such as navigation buttons, menu button etc.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/appbar-small.png" />
 *     <figcaption>small</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="small" src="screenshots/appbar-medium.png" />
 *     <figcaption>medium</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="small" src="screenshots/appbar-large.png" />
 *     <figcaption>large</figcaption>
 *   </figure>
 *  <figure>
 *     <img class="small" src="screenshots/appbar-center-aligned.png" />
 *     <figcaption>center-aligned</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Appbar } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const _goBack = () => console.log('Went back');
 *
 *   const _handleSearch = () => console.log('Searching');
 *
 *   const _handleMore = () => console.log('Shown more');
 *
 *   return (
 *     <Appbar.Header>
 *       <Appbar.BackAction onPress={_goBack} />
 *       <Appbar.Content title="Title" />
 *       <Appbar.Action icon="magnify" onPress={_handleSearch} />
 *       <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
 *     </Appbar.Header>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const AppbarHeader = _ref => {
  let {
    // Don't use default props since we check it to know whether we should use SafeAreaView
    statusBarHeight,
    style,
    dark,
    mode = Platform.OS === 'ios' ? 'center-aligned' : 'small',
    elevated = false,
    theme: themeOverrides,
    ...rest
  } = _ref;
  const theme = useInternalTheme(themeOverrides);
  const {
    isV3
  } = theme;
  const flattenedStyle = StyleSheet.flatten(style);
  const {
    height = isV3 ? modeAppbarHeight[mode] : DEFAULT_APPBAR_HEIGHT,
    elevation = isV3 ? elevated ? 2 : 0 : 4,
    backgroundColor: customBackground,
    zIndex = isV3 && elevated ? 1 : 0,
    ...restStyle
  } = flattenedStyle || {};
  const backgroundColor = getAppbarColor(theme, elevation, customBackground, elevated);
  const {
    top,
    left,
    right
  } = useSafeAreaInsets();
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      backgroundColor,
      zIndex,
      elevation,
      paddingTop: statusBarHeight ?? top,
      paddingHorizontal: Math.max(left, right)
    }, shadow(elevation)]
  }, /*#__PURE__*/React.createElement(Appbar, _extends({
    style: [{
      height,
      backgroundColor
    }, styles.appbar, restStyle],
    dark: dark
  }, isV3 && {
    mode
  }, rest, {
    theme: theme
  })));
};
AppbarHeader.displayName = 'Appbar.Header';
const styles = StyleSheet.create({
  appbar: {
    elevation: 0
  }
});
export default AppbarHeader;

// @component-docs ignore-next-line
export { AppbarHeader };
//# sourceMappingURL=AppbarHeader.js.map