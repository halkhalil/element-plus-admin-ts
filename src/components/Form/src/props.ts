import {formProps} from "element-plus";

const basicFormProps = {
  ...formProps,
  modelValue: {
    type: Object,
    default: () => ({})
  },
  schemas: {
    type: Array,
    default: () => ([]),
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  inline: {
    type: Boolean,
    default: false,
  },
  labelPosition: {
    type: String,
    default: 'right',
  },
  labelWidth: {
    type: String,
    default: '',
  },
  labelSuffix: {
    type: String,
    default: '',
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
  inlineMessage: {
    type: Boolean,
    default: false,
  },
  statusIcon: {
    type: Boolean,
    default: false,
  },
  validateOnRuleChange: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false
  },
  actionProps: {
    type: Object,
    default: () => ({})
  }
}

export {basicFormProps}