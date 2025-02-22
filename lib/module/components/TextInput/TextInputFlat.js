function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Animated, I18nManager, Platform, StyleSheet, TextInput as NativeTextInput, View } from 'react-native';
import { useInternalTheme } from '../../core/theming';
import { AdornmentSide, AdornmentType, InputMode } from './Adornment/enums';
import TextInputAdornment from './Adornment/TextInputAdornment';
import { getAdornmentConfig, getAdornmentStyleAdjustmentForNativeInput } from './Adornment/TextInputAdornment';
import { ADORNMENT_SIZE, LABEL_PADDING_TOP_DENSE, LABEL_WIGGLE_X_OFFSET, MAXIMIZED_LABEL_FONT_SIZE, MINIMIZED_LABEL_FONT_SIZE, MINIMIZED_LABEL_Y_OFFSET, MIN_DENSE_HEIGHT, MIN_DENSE_HEIGHT_WL } from './constants';
import { adjustPaddingFlat, calculateFlatAffixTopPosition, calculateFlatInputHorizontalPadding, calculateInputHeight, calculateLabelTopPosition, calculatePadding, getConstants, getFlatInputColors } from './helpers';
import InputLabel from './Label/InputLabel';
const TextInputFlat = _ref => {
  let {
    disabled = false,
    editable = true,
    label,
    error = false,
    selectionColor,
    underlineColor,
    underlineStyle,
    activeUnderlineColor,
    textColor,
    dense,
    style,
    theme,
    render = props => /*#__PURE__*/React.createElement(NativeTextInput, props),
    multiline = false,
    parentState,
    innerRef,
    onFocus,
    forceFocus,
    onBlur,
    onChangeText,
    onLayoutAnimatedText,
    onLeftAffixLayoutChange,
    onRightAffixLayoutChange,
    left,
    right,
    placeholderTextColor,
    testID = 'text-input-flat',
    contentStyle,
    ...rest
  } = _ref;
  const isAndroid = Platform.OS === 'android';
  const {
    colors,
    isV3,
    roundness
  } = theme;
  const font = isV3 ? theme.fonts.bodyLarge : theme.fonts.regular;
  const hasActiveOutline = parentState.focused || error;
  const {
    LABEL_PADDING_TOP,
    FLAT_INPUT_OFFSET,
    MIN_HEIGHT
  } = getConstants(isV3);
  const {
    fontSize: fontSizeStyle,
    lineHeight,
    fontWeight,
    height,
    paddingHorizontal,
    textAlign,
    ...viewStyle
  } = StyleSheet.flatten(style) || {};
  const fontSize = fontSizeStyle || MAXIMIZED_LABEL_FONT_SIZE;
  const isPaddingHorizontalPassed = paddingHorizontal !== undefined && typeof paddingHorizontal === 'number';
  const adornmentConfig = getAdornmentConfig({
    left,
    right
  });
  let {
    paddingLeft,
    paddingRight
  } = calculateFlatInputHorizontalPadding({
    adornmentConfig,
    isV3
  });
  if (isPaddingHorizontalPassed) {
    paddingLeft = paddingHorizontal;
    paddingRight = paddingHorizontal;
  }
  const {
    leftLayout,
    rightLayout
  } = parentState;
  const rightAffixWidth = right ? rightLayout.width || ADORNMENT_SIZE : ADORNMENT_SIZE;
  const leftAffixWidth = left ? leftLayout.width || ADORNMENT_SIZE : ADORNMENT_SIZE;
  const adornmentStyleAdjustmentForNativeInput = getAdornmentStyleAdjustmentForNativeInput({
    adornmentConfig,
    rightAffixWidth,
    leftAffixWidth,
    paddingHorizontal,
    inputOffset: FLAT_INPUT_OFFSET,
    mode: InputMode.Flat,
    isV3
  });
  const {
    inputTextColor,
    activeColor,
    underlineColorCustom,
    placeholderColor,
    errorColor,
    backgroundColor
  } = getFlatInputColors({
    underlineColor,
    activeUnderlineColor,
    textColor,
    disabled,
    error,
    theme
  });
  const containerStyle = {
    backgroundColor,
    borderTopLeftRadius: theme.roundness,
    borderTopRightRadius: theme.roundness
  };
  const labelScale = MINIMIZED_LABEL_FONT_SIZE / fontSize;
  const fontScale = MAXIMIZED_LABEL_FONT_SIZE / fontSize;
  const labelWidth = parentState.labelLayout.width;
  const labelHeight = parentState.labelLayout.height;
  const labelHalfWidth = labelWidth / 2;
  const labelHalfHeight = labelHeight / 2;
  const baseLabelTranslateX = (I18nManager.getConstants().isRTL ? 1 : -1) * (labelHalfWidth - labelScale * labelWidth / 2) + (1 - labelScale) * (I18nManager.getConstants().isRTL ? -1 : 1) * paddingLeft;
  const minInputHeight = dense ? (label ? MIN_DENSE_HEIGHT_WL : MIN_DENSE_HEIGHT) - LABEL_PADDING_TOP_DENSE : MIN_HEIGHT - LABEL_PADDING_TOP;
  const inputHeight = calculateInputHeight(labelHeight, height, minInputHeight);
  const topPosition = calculateLabelTopPosition(labelHeight, inputHeight, multiline && height ? 0 : !height ? minInputHeight / 2 : 0);
  if (height && typeof height !== 'number') {
    // eslint-disable-next-line
    console.warn('Currently we support only numbers in height prop');
  }
  const paddingSettings = {
    height: height ? +height : null,
    labelHalfHeight,
    offset: FLAT_INPUT_OFFSET,
    multiline: multiline ? multiline : null,
    dense: dense ? dense : null,
    topPosition,
    fontSize,
    lineHeight,
    label,
    scale: fontScale,
    isAndroid,
    styles: StyleSheet.flatten(dense ? styles.inputFlatDense : styles.inputFlat)
  };
  const pad = calculatePadding(paddingSettings);
  const paddingFlat = adjustPaddingFlat({
    ...paddingSettings,
    pad
  });
  const baseLabelTranslateY = -labelHalfHeight - (topPosition + MINIMIZED_LABEL_Y_OFFSET);
  const placeholderOpacity = hasActiveOutline ? parentState.labeled : parentState.labelLayout.measured ? 1 : 0;
  const minHeight = height || (dense ? label ? MIN_DENSE_HEIGHT_WL : MIN_DENSE_HEIGHT : MIN_HEIGHT);
  const flatHeight = inputHeight + (!height ? dense ? LABEL_PADDING_TOP_DENSE : LABEL_PADDING_TOP : 0);
  const iconTopPosition = (flatHeight - ADORNMENT_SIZE) / 2;
  const leftAffixTopPosition = leftLayout.height ? calculateFlatAffixTopPosition({
    height: flatHeight,
    ...paddingFlat,
    affixHeight: leftLayout.height
  }) : null;
  const rightAffixTopPosition = rightLayout.height ? calculateFlatAffixTopPosition({
    height: flatHeight,
    ...paddingFlat,
    affixHeight: rightLayout.height
  }) : null;
  const labelProps = {
    label,
    onLayoutAnimatedText,
    placeholderOpacity,
    labelError: error,
    placeholderStyle: styles.placeholder,
    baseLabelTranslateY,
    baseLabelTranslateX,
    font,
    fontSize,
    lineHeight,
    fontWeight,
    labelScale,
    wiggleOffsetX: LABEL_WIGGLE_X_OFFSET,
    topPosition,
    paddingLeft: isAndroid ? I18nManager.isRTL ? paddingRight : paddingLeft : paddingLeft,
    paddingRight: isAndroid ? I18nManager.isRTL ? paddingLeft : paddingRight : paddingRight,
    hasActiveOutline,
    activeColor,
    placeholderColor,
    errorColor,
    roundness,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier,
    testID,
    contentStyle,
    opacity: parentState.value || parentState.focused ? parentState.labelLayout.measured ? 1 : 0 : 1
  };
  const affixTopPosition = {
    [AdornmentSide.Left]: leftAffixTopPosition,
    [AdornmentSide.Right]: rightAffixTopPosition
  };
  const onAffixChange = {
    [AdornmentSide.Left]: onLeftAffixLayoutChange,
    [AdornmentSide.Right]: onRightAffixLayoutChange
  };
  let adornmentProps = {
    paddingHorizontal,
    adornmentConfig,
    forceFocus,
    topPosition: {
      [AdornmentType.Affix]: affixTopPosition,
      [AdornmentType.Icon]: iconTopPosition
    },
    onAffixChange,
    isTextInputFocused: parentState.focused,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier,
    disabled
  };
  if (adornmentConfig.length) {
    adornmentProps = {
      ...adornmentProps,
      left,
      right,
      textStyle: {
        ...font,
        fontSize,
        lineHeight,
        fontWeight
      },
      visible: parentState.labeled
    };
  }
  return /*#__PURE__*/React.createElement(View, {
    style: [containerStyle, viewStyle]
  }, /*#__PURE__*/React.createElement(Underline, {
    style: underlineStyle,
    hasActiveOutline: hasActiveOutline,
    parentState: parentState,
    underlineColorCustom: underlineColorCustom,
    error: error,
    colors: colors,
    activeColor: activeColor,
    theme: theme
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.labelContainer, {
      minHeight
    }]
  }, !isAndroid && multiline && !!label && !disabled &&
  /*#__PURE__*/
  // Workaround for: https://github.com/callstack/react-native-paper/issues/2799
  // Patch for a multiline TextInput with fixed height, which allow to avoid covering input label with its value.
  React.createElement(View, {
    testID: "patch-container",
    pointerEvents: "none",
    style: [StyleSheet.absoluteFill, dense ? styles.densePatchContainer : styles.patchContainer, {
      backgroundColor: viewStyle.backgroundColor || containerStyle.backgroundColor,
      left: paddingLeft,
      right: paddingRight
    }]
  }), label ? /*#__PURE__*/React.createElement(InputLabel, _extends({
    labeled: parentState.labeled,
    error: parentState.error,
    focused: parentState.focused,
    wiggle: Boolean(parentState.value && labelProps.labelError),
    labelLayoutMeasured: parentState.labelLayout.measured,
    labelLayoutWidth: parentState.labelLayout.width
  }, labelProps)) : null, render === null || render === void 0 ? void 0 : render({
    testID,
    ...rest,
    ref: innerRef,
    onChangeText,
    placeholder: label ? parentState.placeholder : rest.placeholder,
    placeholderTextColor: placeholderTextColor ?? placeholderColor,
    editable: !disabled && editable,
    selectionColor: typeof selectionColor === 'undefined' ? activeColor : selectionColor,
    onFocus,
    onBlur,
    underlineColorAndroid: 'transparent',
    multiline,
    style: [styles.input, {
      paddingLeft,
      paddingRight
    }, !multiline || multiline && height ? {
      height: flatHeight
    } : {}, paddingFlat, {
      ...font,
      fontSize,
      lineHeight,
      fontWeight,
      color: inputTextColor,
      textAlignVertical: multiline ? 'top' : 'center',
      textAlign: textAlign ? textAlign : I18nManager.getConstants().isRTL ? 'right' : 'left'
    }, Platform.OS === 'web' && {
      outline: 'none'
    }, adornmentStyleAdjustmentForNativeInput, contentStyle]
  })), /*#__PURE__*/React.createElement(TextInputAdornment, adornmentProps));
};
export default TextInputFlat;
const Underline = _ref2 => {
  let {
    parentState,
    error,
    colors,
    activeColor,
    underlineColorCustom,
    hasActiveOutline,
    style,
    theme: themeOverrides
  } = _ref2;
  const {
    isV3
  } = useInternalTheme(themeOverrides);
  let backgroundColor = parentState.focused ? activeColor : underlineColorCustom;
  if (error) backgroundColor = colors === null || colors === void 0 ? void 0 : colors.error;
  const activeScale = isV3 ? 2 : 1;
  return /*#__PURE__*/React.createElement(Animated.View, {
    testID: "text-input-underline",
    style: [styles.underline, isV3 && styles.md3Underline, {
      backgroundColor,
      // Underlines is thinner when input is not focused
      transform: [{
        scaleY: (isV3 ? hasActiveOutline : parentState.focused) ? activeScale : 0.5
      }]
    }, style]
  });
};
const styles = StyleSheet.create({
  placeholder: {
    position: 'absolute',
    left: 0
  },
  underline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    zIndex: 1
  },
  md3Underline: {
    height: 1
  },
  labelContainer: {
    paddingTop: 0,
    paddingBottom: 0
  },
  input: {
    margin: 0
  },
  inputFlat: {
    paddingTop: 24,
    paddingBottom: 4
  },
  inputFlatDense: {
    paddingTop: 22,
    paddingBottom: 2
  },
  patchContainer: {
    height: 24,
    zIndex: 2
  },
  densePatchContainer: {
    height: 22,
    zIndex: 2
  }
});
//# sourceMappingURL=TextInputFlat.js.map