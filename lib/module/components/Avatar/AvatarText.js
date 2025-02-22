function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useInternalTheme } from '../../core/theming';
import { white } from '../../styles/themes/v2/colors';
import getContrastingColor from '../../utils/getContrastingColor';
import Text from '../Typography/Text';
const defaultSize = 64;
/**
 * Avatars can be used to represent people in a graphical way.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/avatar-text.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Avatar } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Avatar.Text size={24} label="XD" />
 * );
 * ```
 */
const AvatarText = _ref => {
  var _theme$colors;
  let {
    label,
    size = defaultSize,
    style,
    labelStyle,
    color: customColor,
    theme: themeOverrides,
    ...rest
  } = _ref;
  const theme = useInternalTheme(themeOverrides);
  const {
    backgroundColor = (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.primary,
    ...restStyle
  } = StyleSheet.flatten(style) || {};
  const textColor = customColor ?? getContrastingColor(backgroundColor, white, 'rgba(0, 0, 0, .54)');
  const {
    fontScale
  } = useWindowDimensions();
  return /*#__PURE__*/React.createElement(View, _extends({
    style: [{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor
    }, styles.container, restStyle]
  }, rest), /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, {
      color: textColor,
      fontSize: size / 2,
      lineHeight: size / fontScale
    }, labelStyle],
    numberOfLines: 1
  }, label));
};
AvatarText.displayName = 'Avatar.Text';
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
export default AvatarText;
//# sourceMappingURL=AvatarText.js.map