"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _enums = require("./Adornment/enums");
var _TextInputAdornment = _interopRequireWildcard(require("./Adornment/TextInputAdornment"));
var _constants = require("./constants");
var _helpers = require("./helpers");
var _InputLabel = _interopRequireDefault(require("./Label/InputLabel"));
var _LabelBackground = _interopRequireDefault(require("./Label/LabelBackground"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const TextInputOutlined = _ref => {
  let {
    disabled = false,
    editable = true,
    label,
    error = false,
    selectionColor,
    underlineColor: _underlineColor,
    outlineColor: customOutlineColor,
    activeOutlineColor,
    outlineStyle,
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
    testID = 'text-input-outlined',
    contentStyle,
    ...rest
  } = _ref;
  const adornmentConfig = (0, _TextInputAdornment.getAdornmentConfig)({
    left,
    right
  });
  const {
    colors,
    isV3,
    roundness
  } = theme;
  const font = isV3 ? theme.fonts.bodyLarge : theme.fonts.regular;
  const hasActiveOutline = parentState.focused || error;
  const {
    INPUT_PADDING_HORIZONTAL,
    MIN_HEIGHT,
    ADORNMENT_OFFSET
  } = (0, _helpers.getConstants)(isV3);
  const {
    fontSize: fontSizeStyle,
    fontWeight,
    lineHeight,
    height,
    backgroundColor = colors === null || colors === void 0 ? void 0 : colors.background,
    textAlign,
    ...viewStyle
  } = _reactNative.StyleSheet.flatten(style) || {};
  const fontSize = fontSizeStyle || _constants.MAXIMIZED_LABEL_FONT_SIZE;
  const {
    inputTextColor,
    activeColor,
    outlineColor,
    placeholderColor,
    errorColor
  } = (0, _helpers.getOutlinedInputColors)({
    activeOutlineColor,
    customOutlineColor,
    textColor,
    disabled,
    error,
    theme
  });
  const labelScale = _constants.MINIMIZED_LABEL_FONT_SIZE / fontSize;
  const fontScale = _constants.MAXIMIZED_LABEL_FONT_SIZE / fontSize;
  const labelWidth = parentState.labelLayout.width;
  const labelHeight = parentState.labelLayout.height;
  const labelHalfWidth = labelWidth / 2;
  const labelHalfHeight = labelHeight / 2;
  const baseLabelTranslateX = (_reactNative.I18nManager.getConstants().isRTL ? 1 : -1) * (labelHalfWidth - labelScale * labelWidth / 2 - (fontSize - _constants.MINIMIZED_LABEL_FONT_SIZE) * labelScale);
  let labelTranslationXOffset = 0;
  const isAdornmentLeftIcon = adornmentConfig.some(_ref2 => {
    let {
      side,
      type
    } = _ref2;
    return side === _enums.AdornmentSide.Left && type === _enums.AdornmentType.Icon;
  });
  if (isAdornmentLeftIcon) {
    labelTranslationXOffset = (_reactNative.I18nManager.getConstants().isRTL ? -1 : 1) * (_constants.ADORNMENT_SIZE + ADORNMENT_OFFSET - (isV3 ? 0 : 8));
  }
  const minInputHeight = (dense ? _constants.MIN_DENSE_HEIGHT_OUTLINED : MIN_HEIGHT) - _constants.LABEL_PADDING_TOP;
  const inputHeight = (0, _helpers.calculateInputHeight)(labelHeight, height, minInputHeight);
  const topPosition = (0, _helpers.calculateLabelTopPosition)(labelHeight, inputHeight, _constants.LABEL_PADDING_TOP);
  if (height && typeof height !== 'number') {
    // eslint-disable-next-line
    console.warn('Currently we support only numbers in height prop');
  }
  const paddingSettings = {
    height: height ? +height : null,
    labelHalfHeight,
    offset: _constants.LABEL_PADDING_TOP,
    multiline: multiline ? multiline : null,
    dense: dense ? dense : null,
    topPosition,
    fontSize,
    lineHeight,
    label,
    scale: fontScale,
    isAndroid: _reactNative.Platform.OS === 'android',
    styles: _reactNative.StyleSheet.flatten(dense ? styles.inputOutlinedDense : styles.inputOutlined)
  };
  const pad = (0, _helpers.calculatePadding)(paddingSettings);
  const paddingOut = (0, _helpers.adjustPaddingOut)({
    ...paddingSettings,
    pad
  });
  const baseLabelTranslateY = -labelHalfHeight - (topPosition + _constants.OUTLINE_MINIMIZED_LABEL_Y_OFFSET);
  const placeholderOpacity = hasActiveOutline ? parentState.labeled : parentState.labelLayout.measured ? 1 : 0;
  const placeholderStyle = {
    position: 'absolute',
    left: 0,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL
  };
  const labelProps = {
    label,
    onLayoutAnimatedText,
    placeholderOpacity,
    labelError: error,
    placeholderStyle,
    baseLabelTranslateY,
    baseLabelTranslateX,
    font,
    fontSize,
    lineHeight,
    fontWeight,
    labelScale,
    wiggleOffsetX: _constants.LABEL_WIGGLE_X_OFFSET,
    topPosition,
    hasActiveOutline,
    activeColor,
    placeholderColor,
    backgroundColor: backgroundColor,
    errorColor,
    labelTranslationXOffset,
    roundness,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier,
    testID,
    contentStyle,
    opacity: parentState.value || parentState.focused ? parentState.labelLayout.measured ? 1 : 0 : 1
  };
  const minHeight = height || (dense ? _constants.MIN_DENSE_HEIGHT_OUTLINED : MIN_HEIGHT);
  const outlinedHeight = inputHeight + (!height ? dense ? _constants.LABEL_PADDING_TOP_DENSE / 2 : _constants.LABEL_PADDING_TOP : 0);
  const {
    leftLayout,
    rightLayout
  } = parentState;
  const leftAffixTopPosition = (0, _helpers.calculateOutlinedIconAndAffixTopPosition)({
    height: outlinedHeight,
    affixHeight: leftLayout.height || 0,
    labelYOffset: -_constants.OUTLINE_MINIMIZED_LABEL_Y_OFFSET
  });
  const rightAffixTopPosition = (0, _helpers.calculateOutlinedIconAndAffixTopPosition)({
    height: outlinedHeight,
    affixHeight: rightLayout.height || 0,
    labelYOffset: -_constants.OUTLINE_MINIMIZED_LABEL_Y_OFFSET
  });
  const iconTopPosition = (0, _helpers.calculateOutlinedIconAndAffixTopPosition)({
    height: outlinedHeight,
    affixHeight: _constants.ADORNMENT_SIZE,
    labelYOffset: -_constants.OUTLINE_MINIMIZED_LABEL_Y_OFFSET
  });
  const rightAffixWidth = right ? rightLayout.width || _constants.ADORNMENT_SIZE : _constants.ADORNMENT_SIZE;
  const leftAffixWidth = left ? leftLayout.width || _constants.ADORNMENT_SIZE : _constants.ADORNMENT_SIZE;
  const adornmentStyleAdjustmentForNativeInput = (0, _TextInputAdornment.getAdornmentStyleAdjustmentForNativeInput)({
    adornmentConfig,
    rightAffixWidth,
    leftAffixWidth,
    mode: 'outlined',
    isV3
  });
  const affixTopPosition = {
    [_enums.AdornmentSide.Left]: leftAffixTopPosition,
    [_enums.AdornmentSide.Right]: rightAffixTopPosition
  };
  const onAffixChange = {
    [_enums.AdornmentSide.Left]: onLeftAffixLayoutChange,
    [_enums.AdornmentSide.Right]: onRightAffixLayoutChange
  };
  let adornmentProps = {
    adornmentConfig,
    forceFocus,
    topPosition: {
      [_enums.AdornmentType.Icon]: iconTopPosition,
      [_enums.AdornmentType.Affix]: affixTopPosition
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
    style: viewStyle
  }, /*#__PURE__*/React.createElement(Outline, {
    isV3: isV3,
    style: outlineStyle,
    roundness: roundness,
    hasActiveOutline: hasActiveOutline,
    focused: parentState.focused,
    activeColor: activeColor,
    outlineColor: outlineColor,
    backgroundColor: backgroundColor
  }), /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.labelContainer, {
      paddingTop: _constants.LABEL_PADDING_TOP,
      minHeight
    }]
  }, label ? /*#__PURE__*/React.createElement(_InputLabel.default, _extends({
    labeled: parentState.labeled,
    error: parentState.error,
    focused: parentState.focused,
    wiggle: Boolean(parentState.value && labelProps.labelError),
    labelLayoutMeasured: parentState.labelLayout.measured,
    labelLayoutWidth: parentState.labelLayout.width
  }, labelProps, {
    labelBackground: _LabelBackground.default,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier
  })) : null, render === null || render === void 0 ? void 0 : render({
    testID,
    ...rest,
    ref: innerRef,
    onChangeText,
    placeholder: label ? parentState.placeholder : rest.placeholder,
    placeholderTextColor: placeholderTextColor || placeholderColor,
    editable: !disabled && editable,
    selectionColor: typeof selectionColor === 'undefined' ? activeColor : selectionColor,
    onFocus,
    onBlur,
    underlineColorAndroid: 'transparent',
    multiline,
    style: [styles.input, !multiline || multiline && height ? {
      height: inputHeight
    } : {}, paddingOut, {
      ...font,
      fontSize,
      lineHeight,
      fontWeight,
      color: inputTextColor,
      textAlignVertical: multiline ? 'top' : 'center',
      textAlign: textAlign ? textAlign : _reactNative.I18nManager.getConstants().isRTL ? 'right' : 'left',
      paddingHorizontal: INPUT_PADDING_HORIZONTAL
    }, _reactNative.Platform.OS === 'web' && {
      outline: 'none'
    }, adornmentStyleAdjustmentForNativeInput, contentStyle]
  })), /*#__PURE__*/React.createElement(_TextInputAdornment.default, adornmentProps)));
};
var _default = TextInputOutlined;
exports.default = _default;
const Outline = _ref3 => {
  let {
    isV3,
    activeColor,
    backgroundColor,
    hasActiveOutline,
    focused,
    outlineColor,
    roundness,
    style
  } = _ref3;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    testID: "text-input-outline",
    pointerEvents: "none",
    style: [styles.outline,
    // eslint-disable-next-line react-native/no-inline-styles
    {
      backgroundColor,
      borderRadius: roundness,
      borderWidth: (isV3 ? hasActiveOutline : focused) ? 2 : 1,
      borderColor: hasActiveOutline ? activeColor : outlineColor
    }, style]
  });
};
const styles = _reactNative.StyleSheet.create({
  outline: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 6,
    bottom: 0
  },
  labelContainer: {
    paddingBottom: 0
  },
  input: {
    margin: 0,
    zIndex: 1
  },
  inputOutlined: {
    paddingTop: 8,
    paddingBottom: 8
  },
  inputOutlinedDense: {
    paddingTop: 4,
    paddingBottom: 4
  }
});
//# sourceMappingURL=TextInputOutlined.js.map