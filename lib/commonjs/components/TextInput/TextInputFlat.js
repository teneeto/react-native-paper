"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
var _enums = require("./Adornment/enums");
var _TextInputAdornment = _interopRequireWildcard(require("./Adornment/TextInputAdornment"));
var _constants = require("./constants");
var _helpers = require("./helpers");
var _InputLabel = _interopRequireDefault(require("./Label/InputLabel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
    render = props => /*#__PURE__*/React.createElement(_reactNative.TextInput, props),
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
  const isAndroid = _reactNative.Platform.OS === 'android';
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
  } = (0, _helpers.getConstants)(isV3);
  const {
    fontSize: fontSizeStyle,
    lineHeight,
    fontWeight,
    height,
    paddingHorizontal,
    textAlign,
    ...viewStyle
  } = _reactNative.StyleSheet.flatten(style) || {};
  const fontSize = fontSizeStyle || _constants.MAXIMIZED_LABEL_FONT_SIZE;
  const isPaddingHorizontalPassed = paddingHorizontal !== undefined && typeof paddingHorizontal === 'number';
  const adornmentConfig = (0, _TextInputAdornment.getAdornmentConfig)({
    left,
    right
  });
  let {
    paddingLeft,
    paddingRight
  } = (0, _helpers.calculateFlatInputHorizontalPadding)({
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
  const rightAffixWidth = right ? rightLayout.width || _constants.ADORNMENT_SIZE : _constants.ADORNMENT_SIZE;
  const leftAffixWidth = left ? leftLayout.width || _constants.ADORNMENT_SIZE : _constants.ADORNMENT_SIZE;
  const adornmentStyleAdjustmentForNativeInput = (0, _TextInputAdornment.getAdornmentStyleAdjustmentForNativeInput)({
    adornmentConfig,
    rightAffixWidth,
    leftAffixWidth,
    paddingHorizontal,
    inputOffset: FLAT_INPUT_OFFSET,
    mode: _enums.InputMode.Flat,
    isV3
  });
  const {
    inputTextColor,
    activeColor,
    underlineColorCustom,
    placeholderColor,
    errorColor,
    backgroundColor
  } = (0, _helpers.getFlatInputColors)({
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
  const labelScale = _constants.MINIMIZED_LABEL_FONT_SIZE / fontSize;
  const fontScale = _constants.MAXIMIZED_LABEL_FONT_SIZE / fontSize;
  const labelWidth = parentState.labelLayout.width;
  const labelHeight = parentState.labelLayout.height;
  const labelHalfWidth = labelWidth / 2;
  const labelHalfHeight = labelHeight / 2;
  const baseLabelTranslateX = (_reactNative.I18nManager.getConstants().isRTL ? 1 : -1) * (labelHalfWidth - labelScale * labelWidth / 2) + (1 - labelScale) * (_reactNative.I18nManager.getConstants().isRTL ? -1 : 1) * paddingLeft;
  const minInputHeight = dense ? (label ? _constants.MIN_DENSE_HEIGHT_WL : _constants.MIN_DENSE_HEIGHT) - _constants.LABEL_PADDING_TOP_DENSE : MIN_HEIGHT - LABEL_PADDING_TOP;
  const inputHeight = (0, _helpers.calculateInputHeight)(labelHeight, height, minInputHeight);
  const topPosition = (0, _helpers.calculateLabelTopPosition)(labelHeight, inputHeight, multiline && height ? 0 : !height ? minInputHeight / 2 : 0);
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
    styles: _reactNative.StyleSheet.flatten(dense ? styles.inputFlatDense : styles.inputFlat)
  };
  const pad = (0, _helpers.calculatePadding)(paddingSettings);
  const paddingFlat = (0, _helpers.adjustPaddingFlat)({
    ...paddingSettings,
    pad
  });
  const baseLabelTranslateY = -labelHalfHeight - (topPosition + _constants.MINIMIZED_LABEL_Y_OFFSET);
  const placeholderOpacity = hasActiveOutline ? parentState.labeled : parentState.labelLayout.measured ? 1 : 0;
  const minHeight = height || (dense ? label ? _constants.MIN_DENSE_HEIGHT_WL : _constants.MIN_DENSE_HEIGHT : MIN_HEIGHT);
  const flatHeight = inputHeight + (!height ? dense ? _constants.LABEL_PADDING_TOP_DENSE : LABEL_PADDING_TOP : 0);
  const iconTopPosition = (flatHeight - _constants.ADORNMENT_SIZE) / 2;
  const leftAffixTopPosition = leftLayout.height ? (0, _helpers.calculateFlatAffixTopPosition)({
    height: flatHeight,
    ...paddingFlat,
    affixHeight: leftLayout.height
  }) : null;
  const rightAffixTopPosition = rightLayout.height ? (0, _helpers.calculateFlatAffixTopPosition)({
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
    wiggleOffsetX: _constants.LABEL_WIGGLE_X_OFFSET,
    topPosition,
    paddingLeft: isAndroid ? _reactNative.I18nManager.isRTL ? paddingRight : paddingLeft : paddingLeft,
    paddingRight: isAndroid ? _reactNative.I18nManager.isRTL ? paddingLeft : paddingRight : paddingRight,
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
    [_enums.AdornmentSide.Left]: leftAffixTopPosition,
    [_enums.AdornmentSide.Right]: rightAffixTopPosition
  };
  const onAffixChange = {
    [_enums.AdornmentSide.Left]: onLeftAffixLayoutChange,
    [_enums.AdornmentSide.Right]: onRightAffixLayoutChange
  };
  let adornmentProps = {
    paddingHorizontal,
    adornmentConfig,
    forceFocus,
    topPosition: {
      [_enums.AdornmentType.Affix]: affixTopPosition,
      [_enums.AdornmentType.Icon]: iconTopPosition
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
  return /*#__PURE__*/React.createElement(_reactNative.View, {
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
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.labelContainer, {
      minHeight
    }]
  }, !isAndroid && multiline && !!label && !disabled &&
  /*#__PURE__*/
  // Workaround for: https://github.com/callstack/react-native-paper/issues/2799
  // Patch for a multiline TextInput with fixed height, which allow to avoid covering input label with its value.
  React.createElement(_reactNative.View, {
    testID: "patch-container",
    pointerEvents: "none",
    style: [_reactNative.StyleSheet.absoluteFill, dense ? styles.densePatchContainer : styles.patchContainer, {
      backgroundColor: viewStyle.backgroundColor || containerStyle.backgroundColor,
      left: paddingLeft,
      right: paddingRight
    }]
  }), label ? /*#__PURE__*/React.createElement(_InputLabel.default, _extends({
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
      textAlign: textAlign ? textAlign : _reactNative.I18nManager.getConstants().isRTL ? 'right' : 'left'
    }, _reactNative.Platform.OS === 'web' && {
      outline: 'none'
    }, adornmentStyleAdjustmentForNativeInput, contentStyle]
  })), /*#__PURE__*/React.createElement(_TextInputAdornment.default, adornmentProps));
};
var _default = TextInputFlat;
exports.default = _default;
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
  } = (0, _theming.useInternalTheme)(themeOverrides);
  let backgroundColor = parentState.focused ? activeColor : underlineColorCustom;
  if (error) backgroundColor = colors === null || colors === void 0 ? void 0 : colors.error;
  const activeScale = isV3 ? 2 : 1;
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
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
const styles = _reactNative.StyleSheet.create({
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