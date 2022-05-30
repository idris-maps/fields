interface HTMLCoreProps {
  accesskey?: string;
  autocapitalize?: string;
  class?: string;
  contenteditable?: boolean;
  contextmenu?: string;
  dir?: "auto" | "rtl" | "ltr";
  draggable?: boolean;
  hidden?: boolean;
  id?: string;
  itemprop?: string;
  lang?: string;
  slot?: string;
  spellcheck?: boolean;
  style?: string;
  tabindex?: number;
  title?: string;
  translate?: string;
}
interface HTMLElementAProps extends HTMLCoreProps {
  download?: any;
  href?: string;
  hreflang?: string;
  media?: string;
  ping?: string;
  referrerpolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  rel?: string;
  shape?: string;
  target?: string;
}
interface HTMLElementAbbrProps extends HTMLCoreProps {
}
interface HTMLElementAddressProps extends HTMLCoreProps {
}
interface HTMLElementAreaProps extends HTMLCoreProps {
  alt?: string;
  coords?: string;
  download?: any;
  href?: string;
  hreflang?: string;
  media?: string;
  ping?: string;
  referrerpolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  rel?: string;
  shape?: string;
  target?: string;
}
interface HTMLElementArticleProps extends HTMLCoreProps {
}
interface HTMLElementAsideProps extends HTMLCoreProps {
}
interface HTMLElementAudioProps extends HTMLCoreProps {
  autoplay?: boolean;
  buffered?: string;
  controls?: boolean;
  crossorigin?: string;
  loop?: boolean;
  muted?: boolean;
  preload?: string;
  src?: string;
}
interface HTMLElementBProps extends HTMLCoreProps {
}
interface HTMLElementBaseProps extends HTMLCoreProps {
  href?: string;
  target?: string;
}
interface HTMLElementBdiProps extends HTMLCoreProps {
}
interface HTMLElementBdoProps extends HTMLCoreProps {
}
interface HTMLElementBlockquoteProps extends HTMLCoreProps {
  cite?: string;
}
interface HTMLElementBodyProps extends HTMLCoreProps {
  background?: string;
  bgcolor?: string;
}
interface HTMLElementBrProps extends HTMLCoreProps {
}
interface HTMLElementButtonProps extends HTMLCoreProps {
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean;
  formtarget?: string;
  name?: string;
  type?: string;
  value?: string | string[] | number;
}
interface HTMLElementCanvasProps extends HTMLCoreProps {
  width?: number | string;
  height?: number | string;
}
interface HTMLElementCaptionProps extends HTMLCoreProps {
  align?: string;
}
interface HTMLElementCiteProps extends HTMLCoreProps {
}
interface HTMLElementCodeProps extends HTMLCoreProps {
}
interface HTMLElementColProps extends HTMLCoreProps {
  align?: string;
  span?: number;
  bgcolor?: string;
}
interface HTMLElementColgroupProps extends HTMLCoreProps {
  align?: string;
  span?: number;
  bgcolor?: string;
}
interface HTMLElementDataProps extends HTMLCoreProps {
  value?: string | string[] | number;
}
interface HTMLElementDatalistProps extends HTMLCoreProps {
}
interface HTMLElementDdProps extends HTMLCoreProps {
}
interface HTMLElementDelProps extends HTMLCoreProps {
  cite?: string;
  datetime?: string;
}
interface HTMLElementDetailsProps extends HTMLCoreProps {
  open?: boolean;
}
interface HTMLElementDfnProps extends HTMLCoreProps {
}
interface HTMLElementDialogProps extends HTMLCoreProps {
  open?: boolean;
}
interface HTMLElementDivProps extends HTMLCoreProps {
}
interface HTMLElementDlProps extends HTMLCoreProps {
}
interface HTMLElementDtProps extends HTMLCoreProps {
}
interface HTMLElementEmProps extends HTMLCoreProps {
}
interface HTMLElementEmbedProps extends HTMLCoreProps {
  src?: string;
  type?: string;
  width?: number | string;
  height?: number | string;
}
interface HTMLElementFieldsetProps extends HTMLCoreProps {
  disabled?: boolean;
  form?: string;
  name?: string;
}
interface HTMLElementFigcaptionProps extends HTMLCoreProps {
}
interface HTMLElementFigureProps extends HTMLCoreProps {
}
interface HTMLElementFooterProps extends HTMLCoreProps {
}
interface HTMLElementFormProps extends HTMLCoreProps {
  accept?: string;
  "accept-charset"?: string;
  action?: string;
  autocomplete?: string;
  enctype?: string;
  method?: string;
  name?: string;
  novalidate?: boolean;
  target?: string;
}
interface HTMLElementHeadProps extends HTMLCoreProps {
}
interface HTMLElementHeaderProps extends HTMLCoreProps {
}
interface HTMLElementH1Props extends HTMLCoreProps {
}
interface HTMLElementHrProps extends HTMLCoreProps {
  align?: string;
  color?: string;
}
interface HTMLElementHtmlProps extends HTMLCoreProps {
  manifest?: string;
}
interface HTMLElementIProps extends HTMLCoreProps {
}
interface HTMLElementIframeProps extends HTMLCoreProps {
  align?: string;
  allow?: string;
  csp?: string;
  importance?: string;
  name?: string;
  referrerpolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  sandbox?: string;
  src?: string;
  srcdoc?: string;
  width?: number | string;
  height?: number | string;
  loading?: "eager" | "lazy";
}
interface HTMLElementImgProps extends HTMLCoreProps {
  align?: string;
  alt?: string;
  crossorigin?: string;
  decoding?: "sync" | "async" | "auto";
  importance?: string;
  intrinsicsize?: string;
  ismap?: string;
  referrerpolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  sizes?: string;
  src?: string;
  srcset?: string;
  usemap?: string;
  width?: number | string;
  border?: string;
  height?: number | string;
  loading?: "eager" | "lazy";
}
interface HTMLElementInputProps extends HTMLCoreProps {
  accept?: string;
  alt?: string;
  autocomplete?: string;
  autofocus?: boolean;
  capture?: boolean | string;
  checked?: boolean;
  dirname?: string;
  disabled?: boolean;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean;
  formtarget?: string;
  list?: string;
  max?: number | string;
  maxlength?: number;
  minlength?: number;
  min?: number | string;
  multiple?: boolean;
  name?: string;
  pattern?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  size?: number;
  src?: string;
  step?: number | string;
  type?: string;
  usemap?: string;
  value?: string | string[] | number;
  width?: number | string;
  height?: number | string;
}
interface HTMLElementInsProps extends HTMLCoreProps {
  cite?: string;
  datetime?: string;
}
interface HTMLElementKbdProps extends HTMLCoreProps {
}
interface HTMLElementLabelProps extends HTMLCoreProps {
  for?: string;
  form?: string;
}
interface HTMLElementLegendProps extends HTMLCoreProps {
}
interface HTMLElementLiProps extends HTMLCoreProps {
  value?: string | string[] | number;
}
interface HTMLElementLinkProps extends HTMLCoreProps {
  crossorigin?: string;
  href?: string;
  hreflang?: string;
  importance?: string;
  integrity?: string;
  media?: string;
  referrerpolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  rel?: string;
  sizes?: string;
  type?: string;
}
interface HTMLElementMainProps extends HTMLCoreProps {
}
interface HTMLElementMapProps extends HTMLCoreProps {
  name?: string;
}
interface HTMLElementMarkProps extends HTMLCoreProps {
}
interface HTMLElementMetaProps extends HTMLCoreProps {
  charset?: string;
  content?: string;
  "http-equiv"?: string;
  name?: string;
}
interface HTMLElementMeterProps extends HTMLCoreProps {
  form?: string;
  high?: number;
  low?: number;
  max?: number | string;
  min?: number | string;
  optimum?: number;
  value?: string | string[] | number;
}
interface HTMLElementNavProps extends HTMLCoreProps {
}
interface HTMLElementNoscriptProps extends HTMLCoreProps {
}
interface HTMLElementObjectProps extends HTMLCoreProps {
  data?: string;
  form?: string;
  name?: string;
  type?: string;
  usemap?: string;
  width?: number | string;
  border?: string;
  height?: number | string;
}
interface HTMLElementOlProps extends HTMLCoreProps {
  reversed?: boolean;
  start?: number;
}
interface HTMLElementOptgroupProps extends HTMLCoreProps {
  disabled?: boolean;
  label?: string;
}
interface HTMLElementOptionProps extends HTMLCoreProps {
  disabled?: boolean;
  label?: string;
  selected?: boolean;
  value?: string | string[] | number;
}
interface HTMLElementOutputProps extends HTMLCoreProps {
  for?: string;
  form?: string;
  name?: string;
}
interface HTMLElementPProps extends HTMLCoreProps {
}
interface HTMLElementParamProps extends HTMLCoreProps {
  name?: string;
  value?: string | string[] | number;
}
interface HTMLElementPictureProps extends HTMLCoreProps {
}
interface HTMLElementPortalProps extends HTMLCoreProps {
}
interface HTMLElementPreProps extends HTMLCoreProps {
}
interface HTMLElementProgressProps extends HTMLCoreProps {
  form?: string;
  max?: number | string;
  value?: string | string[] | number;
}
interface HTMLElementQProps extends HTMLCoreProps {
  cite?: string;
}
interface HTMLElementRpProps extends HTMLCoreProps {
}
interface HTMLElementRtProps extends HTMLCoreProps {
}
interface HTMLElementRubyProps extends HTMLCoreProps {
}
interface HTMLElementSProps extends HTMLCoreProps {
}
interface HTMLElementSampProps extends HTMLCoreProps {
}
interface HTMLElementScriptProps extends HTMLCoreProps {
  async?: boolean;
  charset?: string;
  crossorigin?: string;
  defer?: boolean;
  importance?: string;
  integrity?: string;
  language?: string;
  referrerpolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  src?: string;
  type?: string;
}
interface HTMLElementSectionProps extends HTMLCoreProps {
}
interface HTMLElementSelectProps extends HTMLCoreProps {
  autocomplete?: string;
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  multiple?: boolean;
  name?: string;
  required?: boolean;
  size?: number;
}
interface HTMLElementSlotProps extends HTMLCoreProps {
}
interface HTMLElementSmallProps extends HTMLCoreProps {
}
interface HTMLElementSourceProps extends HTMLCoreProps {
  media?: string;
  sizes?: string;
  src?: string;
  srcset?: string;
  type?: string;
}
interface HTMLElementSpanProps extends HTMLCoreProps {
}
interface HTMLElementStrongProps extends HTMLCoreProps {
}
interface HTMLElementStyleProps extends HTMLCoreProps {
  media?: string;
  scoped?: boolean;
  type?: string;
}
interface HTMLElementSubProps extends HTMLCoreProps {
}
interface HTMLElementSummaryProps extends HTMLCoreProps {
}
interface HTMLElementSupProps extends HTMLCoreProps {
}
interface HTMLElementTableProps extends HTMLCoreProps {
  align?: string;
  summary?: string;
  background?: string;
  bgcolor?: string;
  border?: string;
}
interface HTMLElementTbodyProps extends HTMLCoreProps {
  align?: string;
  bgcolor?: string;
}
interface HTMLElementTdProps extends HTMLCoreProps {
  align?: string;
  colspan?: number;
  headers?: string;
  rowspan?: number;
  background?: string;
  bgcolor?: string;
}
interface HTMLElementTemplateProps extends HTMLCoreProps {
}
interface HTMLElementTextareaProps extends HTMLCoreProps {
  autocomplete?: string;
  autofocus?: boolean;
  cols?: number;
  dirname?: string;
  disabled?: boolean;
  enterkeyhint?:
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send";
  form?: string;
  inputmode?: string;
  maxlength?: number;
  minlength?: number;
  name?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  wrap?: string;
}
interface HTMLElementTfootProps extends HTMLCoreProps {
  align?: string;
  bgcolor?: string;
}
interface HTMLElementThProps extends HTMLCoreProps {
  align?: string;
  colspan?: number;
  headers?: string;
  rowspan?: number;
  scope?: string;
  background?: string;
  bgcolor?: string;
}
interface HTMLElementTheadProps extends HTMLCoreProps {
  align?: string;
}
interface HTMLElementTimeProps extends HTMLCoreProps {
  datetime?: string;
}
interface HTMLElementTitleProps extends HTMLCoreProps {
}
interface HTMLElementTrProps extends HTMLCoreProps {
  align?: string;
  bgcolor?: string;
}
interface HTMLElementTrackProps extends HTMLCoreProps {
  default?: boolean;
  kind?: string;
  label?: string;
  src?: string;
  srclang?: string;
}
interface HTMLElementUProps extends HTMLCoreProps {
}
interface HTMLElementUlProps extends HTMLCoreProps {
}
interface HTMLElementVarProps extends HTMLCoreProps {
}
interface HTMLElementVideoProps extends HTMLCoreProps {
  autoplay?: boolean;
  buffered?: string;
  controls?: boolean;
  crossorigin?: string;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  preload?: string;
  src?: string;
  width?: number | string;
  height?: number | string;
}
interface HTMLElementWbrProps extends HTMLCoreProps {
}
interface HTMLElementAppletProps extends HTMLCoreProps {
  align?: string;
  alt?: string;
  code?: string;
  codebase?: string;
}
interface HTMLElementKeygenProps extends HTMLCoreProps {
  autofocus?: boolean;
  challenge?: string;
  disabled?: boolean;
  form?: string;
  keytype?: string;
  name?: string;
}
interface HTMLElementCommandProps extends HTMLCoreProps {
  checked?: boolean;
  disabled?: boolean;
  icon?: string;
  radiogroup?: string;
  type?: string;
}
interface HTMLElementContenteditableProps extends HTMLCoreProps {
  enterkeyhint?:
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send";
  inputmode?: string;
}
interface HTMLElementBgsoundProps extends HTMLCoreProps {
  loop?: boolean;
}
interface HTMLElementMarqueeProps extends HTMLCoreProps {
  loop?: boolean;
  bgcolor?: string;
}
interface HTMLElementMenuProps extends HTMLCoreProps {
  type?: string;
}
interface HTMLElementBasefontProps extends HTMLCoreProps {
  color?: string;
}
interface HTMLElementFontProps extends HTMLCoreProps {
  color?: string;
}
interface SVGCoreProps {
  id?: string;
  lang?: string;
  tabindex?: number;
  "xml:base"?: string;
  "xml:lang"?: string;
  "xml:space"?: string;
}
interface SVGStyleProps {
  class?: string;
  style?: string;
}
interface SVGPresentProps {
  "alignment-baseline"?:
    | "auto"
    | "baseline"
    | "before-edge"
    | "text-before-edge"
    | "middle"
    | "central"
    | "after-edge"
    | "text-after-edge"
    | "ideographic"
    | "alphabetic"
    | "hanging"
    | "mathematical"
    | "inherit";
  "baseline-shift"?: number | string;
  clip?: number | string;
  "clip-path"?: string;
  "clip-rule"?: number | string;
  color?: string;
  "color-interpolation"?: number | string;
  "color-interpolation-filters"?: "auto" | "sRGB" | "linearRGB" | "inherit";
  "color-profile"?: number | string;
  "color-rendering"?: number | string;
  cursor?: number | string;
  d?: string;
  direction?: number | string;
  display?: number | string;
  "dominant-baseline"?: number | string;
  "enable-background"?: number | string;
  fill?: string;
  "fill-opacity"?: number | string;
  "fill-rule"?: "nonzero" | "evenodd" | "inherit";
  filter?: string;
  "flood-color"?: number | string;
  "flood-opacity"?: number | string;
  "font-family"?: string;
  "font-size"?: number | string;
  "font-size-adjust"?: number | string;
  "font-stretch"?: number | string;
  "font-style"?: number | string;
  "font-variant"?: number | string;
  "font-weight"?: number | string;
  "glyph-orientation-horizontal"?: number | string;
  "glyph-orientation-vertical"?: number | string;
  "image-rendering"?: number | string;
  kerning?: number | string;
  "letter-spacing"?: number | string;
  "lighting-color"?: number | string;
  "marker-end"?: string;
  "marker-mid"?: string;
  "marker-start"?: string;
  mask?: string;
  opacity?: number | string;
  overflow?: number | string;
  "pointer-events"?: number | string;
  "shape-rendering"?: number | string;
  "solid-color"?: string;
  "solid-opacity"?: string;
  "stop-color"?: string;
  "stop-opacity"?: number | string;
  stroke?: string;
  "stroke-dasharray"?: string | number;
  "stroke-dashoffset"?: string | number;
  "stroke-linecap"?: "butt" | "round" | "square" | "inherit";
  "stroke-linejoin"?: "miter" | "round" | "bevel" | "inherit";
  "stroke-miterlimit"?: string | number;
  "stroke-opacity"?: number | string;
  "stroke-width"?: number | string;
  "text-anchor"?: string;
  "text-decoration"?: number | string;
  "text-rendering"?: number | string;
  transform?: string;
  "unicode-bidi"?: number | string;
  "vector-effect"?: number | string;
  visibility?: number | string;
  "word-spacing"?: number | string;
  "writing-mode"?: number | string;
}
interface SVGFilterProps {
  height?: number | string;
  result?: string;
  width?: number | string;
  x?: number | string;
  y?: number | string;
  type?: string;
  tableValues?: number | string;
  slope?: number | string;
  intercept?: number | string;
  amplitude?: number | string;
  exponent?: number | string;
  offset?: number | string;
}
interface SVGAnimProps {
  href?: string;
  attributeType?: string;
  attributeName?: string;
  begin?: number | string;
  dur?: number | string;
  end?: number | string;
  min?: number | string;
  max?: number | string;
  restart?: number | string;
  repeatCount?: number | string;
  repeatDur?: number | string;
  fill?: string;
  calcMode?: number | string;
  values?: string;
  keyTimes?: number | string;
  keySplines?: number | string;
  from?: number | string;
  to?: number | string;
  by?: number | string;
  autoReverse?: number | string;
  accelerate?: string;
  decelerate?: number | string;
  additive?: "replace" | "sum";
  accumulate?: "none" | "sum";
}
interface SVGXlinkProps {
  "xlink:href"?: string;
  "xlink:type"?: string;
  "xlink:role"?: string;
  "xlink:arcrole"?: string;
  "xlink:title"?: string;
  "xlink:show"?: string;
  "xlink:actuate"?: string;
}
interface SVGAriaProps {
  "aria-activedescendant"?: string;
  "aria-atomic"?: string;
  "aria-autocomplete"?: string;
  "aria-busy"?: string;
  "aria-checked"?: string;
  "aria-colcount"?: string;
  "aria-colindex"?: string;
  "aria-colspan"?: string;
  "aria-controls"?: string;
  "aria-current"?: string;
  "aria-describedby"?: string;
  "aria-details"?: string;
  "aria-disabled"?: string;
  "aria-dropeffect"?: string;
  "aria-errormessage"?: string;
  "aria-expanded"?: string;
  "aria-flowto"?: string;
  "aria-grabbed"?: string;
  "aria-haspopup"?: string;
  "aria-hidden"?: string;
  "aria-invalid"?: string;
  "aria-keyshortcuts"?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-level"?: string;
  "aria-live"?: string;
  "aria-modal"?: string;
  "aria-multiline"?: string;
  "aria-multiselectable"?: string;
  "aria-orientation"?: string;
  "aria-owns"?: string;
  "aria-placeholder"?: string;
  "aria-posinset"?: string;
  "aria-pressed"?: string;
  "aria-readonly"?: string;
  "aria-relevant"?: string;
  "aria-required"?: string;
  "aria-roledescription"?: string;
  "aria-rowcount"?: string;
  "aria-rowindex"?: string;
  "aria-rowspan"?: string;
  "aria-selected"?: string;
  "aria-setsize"?: string;
  "aria-sort"?: string;
  "aria-valuemax"?: string;
  "aria-valuemin"?: string;
  "aria-valuenow"?: string;
  "aria-valuetext"?: string;
  role?: string;
}
interface SVGElementAProps
  extends
    SVGCoreProps,
    SVGStyleProps,
    SVGAriaProps,
    SVGXlinkProps,
    SVGPresentProps {
  download?: any;
  href?: string;
  hreflang?: string;
  ping?: string;
  referrerPolicy?: string;
  rel?: string;
  target?: string;
  type?: string;
}
interface SVGElementAltglyphProps extends SVGXlinkProps {
}
interface SVGElementAltglyphdefProps {
}
interface SVGElementAltglyphitemProps {
}
interface SVGElementAnimateProps
  extends SVGAnimProps, SVGCoreProps, SVGStyleProps {
  attributeName?: string;
  attributeType?: string;
  dur?: number | string;
  from?: number | string;
  repeatCount?: number | string;
  to?: number | string;
}
interface SVGElementAnimatecolorProps {
}
interface SVGElementAnimatemotionProps
  extends SVGAnimProps, SVGCoreProps, SVGStyleProps {
  calcMode?: number | string;
  keyPoints?: number | string;
  origin?: number | string;
  path?: string;
  rotate?: number | string;
}
interface SVGElementAnimatetransformProps {
  by?: number | string;
  from?: number | string;
  to?: number | string;
  type?: string;
}
interface SVGElementCircleProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
  cx?: number | string;
  cy?: number | string;
  r?: number | string;
}
interface SVGElementClippathProps
  extends SVGCoreProps, SVGStyleProps, SVGPresentProps {
  clipPathUnits?: number | string;
}
interface SVGElementColorprofileProps {
  local?: number | string;
  name?: string;
  "rendering-intent"?: number | string;
}
interface SVGElementCursorProps {
  href?: string;
  x?: number | string;
  y?: number | string;
}
interface SVGElementDefsProps
  extends SVGCoreProps, SVGStyleProps, SVGPresentProps {
}
interface SVGElementDescProps extends SVGCoreProps, SVGStyleProps {
}
interface SVGElementDiscardProps {
}
interface SVGElementEllipseProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
  cx?: number | string;
  cy?: number | string;
  rx?: number | string;
  ry?: number | string;
}
interface SVGElementFeblendProps {
  in?: string;
  in2?: number | string;
  mode?: number | string;
}
interface SVGElementFecolormatrixProps {
  in?: string;
  type?: string;
  values?: string;
}
interface SVGElementFecomponenttransferProps {
  in?: string;
}
interface SVGElementFecompositeProps {
  in?: string;
  in2?: number | string;
  k1?: number | string;
  k2?: number | string;
  k3?: number | string;
  k4?: number | string;
  operator?: number | string;
}
interface SVGElementFeconvolvematrixProps {
  bias?: number | string;
  divisor?: number | string;
  edgeMode?: number | string;
  in?: string;
  kernelMatrix?: number | string;
  kernelUnitLength?: number | string;
  order?: number | string;
  preserveAlpha?: number | string;
  targetX?: number | string;
  targetY?: number | string;
}
interface SVGElementFediffuselightingProps {
  diffuseConstant?: number | string;
  in?: string;
  kernelUnitLength?: number | string;
  surfaceScale?: number | string;
}
interface SVGElementFedisplacementmapProps {
  in?: string;
  in2?: number | string;
  scale?: number | string;
  xChannelSelector?: string;
  yChannelSelector?: string;
}
interface SVGElementFedistantlightProps {
  azimuth?: number | string;
  elevation?: number | string;
}
interface SVGElementFedropshadowProps
  extends SVGCoreProps, SVGStyleProps, SVGPresentProps, SVGFilterProps {
  dx?: number | string;
  dy?: number | string;
  in?: string;
  stdDeviation?: number | string;
}
interface SVGElementFefloodProps {
  "flood-color"?: number | string;
  "flood-opacity"?: number | string;
}
interface SVGElementFefuncaProps {
}
interface SVGElementFefuncbProps {
}
interface SVGElementFefuncgProps {
}
interface SVGElementFefuncrProps {
}
interface SVGElementFegaussianblurProps {
  edgeMode?: number | string;
  in?: string;
  stdDeviation?: number | string;
}
interface SVGElementFeimageProps {
  href?: string;
  preserveAspectRatio?: string;
}
interface SVGElementFemergeProps {
}
interface SVGElementFemergenodeProps {
  in?: string;
}
interface SVGElementFemorphologyProps {
  in?: string;
  operator?: number | string;
  radius?: number | string;
}
interface SVGElementFeoffsetProps {
  dx?: number | string;
  dy?: number | string;
  in?: string;
}
interface SVGElementFepointlightProps {
  x?: number | string;
  y?: number | string;
  z?: number | string;
}
interface SVGElementFespecularlightingProps {
  in?: string;
  kernelUnitLength?: number | string;
  specularConstant?: number | string;
  specularExponent?: number | string;
  surfaceScale?: number | string;
}
interface SVGElementFespotlightProps {
  limitingConeAngle?: number | string;
  pointsAtX?: number | string;
  pointsAtY?: number | string;
  pointsAtZ?: number | string;
  specularExponent?: number | string;
  x?: number | string;
  y?: number | string;
  z?: number | string;
}
interface SVGElementFetileProps {
  in?: string;
}
interface SVGElementFeturbulenceProps {
  baseFrequency?: number | string;
  numOctaves?: number | string;
  seed?: number | string;
  stitchTiles?: number | string;
  type?: string;
}
interface SVGElementFilterProps {
  filterRes?: number | string;
  filterUnits?: number | string;
  height?: number | string;
  primitiveUnits?: number | string;
  width?: number | string;
  x?: number | string;
  y?: number | string;
}
interface SVGElementFontfaceformatProps {
}
interface SVGElementFontfacenameProps {
}
interface SVGElementFontfacesrcProps {
}
interface SVGElementFontfaceuriProps {
}
interface SVGElementFontfaceProps {
}
interface SVGElementFontProps {
}
interface SVGElementForeignobjectProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
  height?: number | string;
  width?: number | string;
  x?: number | string;
  y?: number | string;
}
interface SVGElementGProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
}
interface SVGElementGlyphProps {
}
interface SVGElementGlyphrefProps {
}
interface SVGElementHatchProps {
}
interface SVGElementHatchpathProps {
}
interface SVGElementHkernProps {
}
interface SVGElementImageProps {
  height?: number | string;
  preserveAspectRatio?: string;
  width?: number | string;
  x?: number | string;
  y?: number | string;
}
interface SVGElementLineProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
  x1?: number | string;
  x2?: number | string;
  y1?: number | string;
  y2?: number | string;
}
interface SVGElementLineargradientProps
  extends SVGCoreProps, SVGStyleProps, SVGXlinkProps, SVGPresentProps {
  gradientTransform?: string;
  gradientUnits?: string;
  spreadMethod?: string;
  x1?: number | string;
  x2?: number | string;
  y1?: number | string;
  y2?: number | string;
}
interface SVGElementMarkerProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
  markerHeight?: number | string;
  markerUnits?: number | string;
  markerWidth?: number | string;
  orient?: number | string;
  refX?: number | string;
  refY?: number | string;
  viewBox?: string;
}
interface SVGElementMaskProps
  extends SVGCoreProps, SVGStyleProps, SVGPresentProps {
  height?: number | string;
  maskContentUnits?: number | string;
  maskUnits?: number | string;
  width?: number | string;
  x?: number | string;
  y?: number | string;
}
interface SVGElementMetadataProps {
}
interface SVGElementMissingglyphProps {
  d?: string;
  "horiz-adv-x"?: number | string;
  "vert-adv-y"?: number | string;
  "vert-origin-x"?: number | string;
  "vert-origin-y"?: number | string;
}
interface SVGElementMpathProps {
}
interface SVGElementPathProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
  d?: string;
}
interface SVGElementPatternProps
  extends SVGCoreProps, SVGStyleProps, SVGXlinkProps, SVGPresentProps {
  height?: number | string;
  href?: string;
  patternContentUnits?: string;
  patternTransform?: number | string;
  patternUnits?: string;
  width?: number | string;
  x?: number | string;
  y?: number | string;
}
interface SVGElementPolygonProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
  points?: string;
}
interface SVGElementPolylineProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
  points?: string;
}
interface SVGElementRadialgradientProps
  extends SVGCoreProps, SVGStyleProps, SVGXlinkProps, SVGPresentProps {
  cx?: number | string;
  cy?: number | string;
  fr?: string;
  fx?: number | string;
  fy?: number | string;
  gradientTransform?: string;
  gradientUnits?: string;
  href?: string;
  r?: number | string;
  spreadMethod?: string;
}
interface SVGElementRectProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
  height?: number | string;
  rx?: number | string;
  ry?: number | string;
  width?: number | string;
  x?: number | string;
  y?: number | string;
}
interface SVGElementScriptProps extends SVGCoreProps, SVGStyleProps {
  type?: string;
}
interface SVGElementSetProps extends SVGAnimProps, SVGCoreProps, SVGStyleProps {
  to?: number | string;
}
interface SVGElementSolidcolorProps {
}
interface SVGElementStopProps
  extends SVGCoreProps, SVGStyleProps, SVGPresentProps {
  offset?: number | string;
  "stop-color"?: string;
  "stop-opacity"?: number | string;
}
interface SVGElementStyleProps extends SVGCoreProps, SVGStyleProps {
  media?: string;
  title?: string;
  type?: string;
}
interface SVGElementSvgProps extends SVGAriaProps {
  height?: number | string;
  preserveAspectRatio?: string;
  viewBox?: string;
  width?: number | string;
  x?: number | string;
  y?: number | string;
}
interface SVGElementSwitchProps {
}
interface SVGElementSymbolProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
  preserveAspectRatio?: string;
  viewBox?: string;
}
interface SVGElementTextProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
}
interface SVGElementTextpathProps
  extends
    SVGCoreProps,
    SVGStyleProps,
    SVGAriaProps,
    SVGXlinkProps,
    SVGPresentProps {
  href?: string;
  method?: string;
  spacing?: number | string;
  startOffset?: number | string;
}
interface SVGElementTitleProps extends SVGCoreProps, SVGStyleProps {
}
interface SVGElementTrefProps {
}
interface SVGElementTspanProps
  extends SVGCoreProps, SVGStyleProps, SVGAriaProps, SVGPresentProps {
  dx?: number | string;
  dy?: number | string;
  lengthAdjust?: number | string;
  rotate?: number | string;
  textLength?: number | string;
  x?: number | string;
  y?: number | string;
}
interface SVGElementUseProps
  extends
    SVGCoreProps,
    SVGStyleProps,
    SVGAriaProps,
    SVGXlinkProps,
    SVGPresentProps {
  height?: number | string;
  href?: string;
  width?: number | string;
  x?: number | string;
  y?: number | string;
}
interface SVGElementViewProps {
  preserveAspectRatio?: string;
  viewBox?: string;
  viewTarget?: number | string;
}
interface SVGElementVkernProps {
  g1?: number | string;
  g2?: number | string;
  k?: number | string;
  u1?: number | string;
  u2?: number | string;
}

declare namespace JSX {
  export interface IntrinsicElements {
    a: HTMLElementAProps | SVGElementAProps;
    abbr: HTMLElementAbbrProps;
    address: HTMLElementAddressProps;
    altGlyph: SVGElementAltglyphProps;
    altGlyphDef: SVGElementAltglyphdefProps;
    altGlyphItem: SVGElementAltglyphitemProps;
    animate: SVGElementAnimateProps;
    animateColor: SVGElementAnimatecolorProps;
    animateMotion: SVGElementAnimatemotionProps;
    animateTransform: SVGElementAnimatetransformProps;
    applet: HTMLElementAppletProps;
    area: HTMLElementAreaProps;
    article: HTMLElementArticleProps;
    aside: HTMLElementAsideProps;
    audio: HTMLElementAudioProps;
    b: HTMLElementBProps;
    base: HTMLElementBaseProps;
    basefont: HTMLElementBasefontProps;
    bdi: HTMLElementBdiProps;
    bdo: HTMLElementBdoProps;
    bgsound: HTMLElementBgsoundProps;
    blockquote: HTMLElementBlockquoteProps;
    body: HTMLElementBodyProps;
    br: HTMLElementBrProps;
    button: HTMLElementButtonProps;
    canvas: HTMLElementCanvasProps;
    caption: HTMLElementCaptionProps;
    circle: SVGElementCircleProps;
    cite: HTMLElementCiteProps;
    clipPath: SVGElementClippathProps;
    code: HTMLElementCodeProps;
    col: HTMLElementColProps;
    colgroup: HTMLElementColgroupProps;
    "color-profile": SVGElementColorprofileProps;
    command: HTMLElementCommandProps;
    contenteditable: HTMLElementContenteditableProps;
    cursor: SVGElementCursorProps;
    data: HTMLElementDataProps;
    datalist: HTMLElementDatalistProps;
    dd: HTMLElementDdProps;
    defs: SVGElementDefsProps;
    del: HTMLElementDelProps;
    desc: SVGElementDescProps;
    details: HTMLElementDetailsProps;
    dfn: HTMLElementDfnProps;
    dialog: HTMLElementDialogProps;
    discard: SVGElementDiscardProps;
    div: HTMLElementDivProps;
    dl: HTMLElementDlProps;
    dt: HTMLElementDtProps;
    ellipse: SVGElementEllipseProps;
    em: HTMLElementEmProps;
    embed: HTMLElementEmbedProps;
    feBlend: SVGElementFeblendProps;
    feColorMatrix: SVGElementFecolormatrixProps;
    feComponentTransfer: SVGElementFecomponenttransferProps;
    feComposite: SVGElementFecompositeProps;
    feConvolveMatrix: SVGElementFeconvolvematrixProps;
    feDiffuseLighting: SVGElementFediffuselightingProps;
    feDisplacementMap: SVGElementFedisplacementmapProps;
    feDistantLight: SVGElementFedistantlightProps;
    feDropShadow: SVGElementFedropshadowProps;
    feFlood: SVGElementFefloodProps;
    feFuncA: SVGElementFefuncaProps;
    feFuncB: SVGElementFefuncbProps;
    feFuncG: SVGElementFefuncgProps;
    feFuncR: SVGElementFefuncrProps;
    feGaussianBlur: SVGElementFegaussianblurProps;
    feImage: SVGElementFeimageProps;
    feMerge: SVGElementFemergeProps;
    feMergeNode: SVGElementFemergenodeProps;
    feMorphology: SVGElementFemorphologyProps;
    feOffset: SVGElementFeoffsetProps;
    fePointLight: SVGElementFepointlightProps;
    feSpecularLighting: SVGElementFespecularlightingProps;
    feSpotLight: SVGElementFespotlightProps;
    feTile: SVGElementFetileProps;
    feTurbulence: SVGElementFeturbulenceProps;
    fieldset: HTMLElementFieldsetProps;
    figcaption: HTMLElementFigcaptionProps;
    figure: HTMLElementFigureProps;
    filter: SVGElementFilterProps;
    font: HTMLElementFontProps | SVGElementFontProps;
    "font-face": SVGElementFontfaceProps;
    "font-face-format": SVGElementFontfaceformatProps;
    "font-face-name": SVGElementFontfacenameProps;
    "font-face-src": SVGElementFontfacesrcProps;
    "font-face-uri": SVGElementFontfaceuriProps;
    footer: HTMLElementFooterProps;
    foreignObject: SVGElementForeignobjectProps;
    form: HTMLElementFormProps;
    g: SVGElementGProps;
    glyph: SVGElementGlyphProps;
    glyphRef: SVGElementGlyphrefProps;
    h1: HTMLElementH1Props;
    h2: HTMLElementH1Props;
    h3: HTMLElementH1Props;
    h4: HTMLElementH1Props;
    h5: HTMLElementH1Props;
    h6: HTMLElementH1Props;
    hatch: SVGElementHatchProps;
    hatchpath: SVGElementHatchpathProps;
    head: HTMLElementHeadProps;
    header: HTMLElementHeaderProps;
    hkern: SVGElementHkernProps;
    hr: HTMLElementHrProps;
    html: HTMLElementHtmlProps;
    i: HTMLElementIProps;
    iframe: HTMLElementIframeProps;
    image: SVGElementImageProps;
    img: HTMLElementImgProps;
    input: HTMLElementInputProps;
    ins: HTMLElementInsProps;
    kbd: HTMLElementKbdProps;
    keygen: HTMLElementKeygenProps;
    label: HTMLElementLabelProps;
    legend: HTMLElementLegendProps;
    li: HTMLElementLiProps;
    line: SVGElementLineProps;
    linearGradient: SVGElementLineargradientProps;
    link: HTMLElementLinkProps;
    main: HTMLElementMainProps;
    map: HTMLElementMapProps;
    mark: HTMLElementMarkProps;
    marker: SVGElementMarkerProps;
    marquee: HTMLElementMarqueeProps;
    mask: SVGElementMaskProps;
    menu: HTMLElementMenuProps;
    meta: HTMLElementMetaProps;
    metadata: SVGElementMetadataProps;
    meter: HTMLElementMeterProps;
    "missing-glyph": SVGElementMissingglyphProps;
    mpath: SVGElementMpathProps;
    nav: HTMLElementNavProps;
    noscript: HTMLElementNoscriptProps;
    object: HTMLElementObjectProps;
    ol: HTMLElementOlProps;
    optgroup: HTMLElementOptgroupProps;
    option: HTMLElementOptionProps;
    output: HTMLElementOutputProps;
    p: HTMLElementPProps;
    param: HTMLElementParamProps;
    path: SVGElementPathProps;
    pattern: SVGElementPatternProps;
    picture: HTMLElementPictureProps;
    polygon: SVGElementPolygonProps;
    polyline: SVGElementPolylineProps;
    portal: HTMLElementPortalProps;
    pre: HTMLElementPreProps;
    progress: HTMLElementProgressProps;
    q: HTMLElementQProps;
    radialGradient: SVGElementRadialgradientProps;
    rect: SVGElementRectProps;
    rp: HTMLElementRpProps;
    rt: HTMLElementRtProps;
    ruby: HTMLElementRubyProps;
    s: HTMLElementSProps;
    samp: HTMLElementSampProps;
    script: HTMLElementScriptProps | SVGElementScriptProps;
    section: HTMLElementSectionProps;
    select: HTMLElementSelectProps;
    set: SVGElementSetProps;
    slot: HTMLElementSlotProps;
    small: HTMLElementSmallProps;
    solidcolor: SVGElementSolidcolorProps;
    source: HTMLElementSourceProps;
    span: HTMLElementSpanProps;
    stop: SVGElementStopProps;
    strong: HTMLElementStrongProps;
    style: HTMLElementStyleProps | SVGElementStyleProps;
    sub: HTMLElementSubProps;
    summary: HTMLElementSummaryProps;
    sup: HTMLElementSupProps;
    svg: SVGElementSvgProps;
    switch: SVGElementSwitchProps;
    symbol: SVGElementSymbolProps;
    table: HTMLElementTableProps;
    tbody: HTMLElementTbodyProps;
    td: HTMLElementTdProps;
    template: HTMLElementTemplateProps;
    text: SVGElementTextProps;
    textPath: SVGElementTextpathProps;
    textarea: HTMLElementTextareaProps;
    tfoot: HTMLElementTfootProps;
    th: HTMLElementThProps;
    thead: HTMLElementTheadProps;
    time: HTMLElementTimeProps;
    title: HTMLElementTitleProps | SVGElementTitleProps;
    tr: HTMLElementTrProps;
    track: HTMLElementTrackProps;
    tref: SVGElementTrefProps;
    tspan: SVGElementTspanProps;
    u: HTMLElementUProps;
    ul: HTMLElementUlProps;
    use: SVGElementUseProps;
    var: HTMLElementVarProps;
    video: HTMLElementVideoProps;
    view: SVGElementViewProps;
    vkern: SVGElementVkernProps;
    wbr: HTMLElementWbrProps;
  }
}
