import {
  formProps as elFormProps,
  formItemProps as elFormItemProps,
  buttonProps as ElButtonProps,
} from "element-plus";

const formProps = {
  ...elFormProps,
  modelValue: {
    type: Object,
    default: () => ({})
  },
  schemas: {
    type: Array,
    default: () => ([]),
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  actionProps: {
    type: Object,
    default: () => ({})
  },
  colProps: {
    type: Object,
    default: () => ({})
  }
}

const formItemProps = {
  modelValue: {
    type: [String, Array, Number, Object, Boolean],
    default: '',
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  schema: {
    type: Object,
    default: () => ({})
  },
}

const formActionProps = {
  submitButtonProps: {
    type: Object,
    default: () => ({})
  },
  resetButtonProps: {
    type: Object,
    default: () => ({})
  },
  showResetButton: {
    type: Boolean,
    default: true,
  },
  resetButtonText: {
    type: String,
    default: '重置'
  },
  submitButtonText: {
    type: String,
    default: '提交'
  },
  showAdvancedButton: {
    type: Boolean,
    default: false,
  },
  showAdvancedLength: {
    type: Number,
    default: 3,
  },
  advanced: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'left',
  },
  colProps: {
    type: Object,
    default: undefined,
  }
}

const defaultColProps = {xs: 24, sm: 24, md: 12, lg: 12, xl: 12}

export {formProps, formItemProps, formActionProps, defaultColProps}