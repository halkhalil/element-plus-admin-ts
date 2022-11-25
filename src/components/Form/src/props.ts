import {formProps as elFormProps,} from "element-plus";
import {PropType} from "vue";
import {FormAction, FormSchema, FormSchemas} from "~/components";

const defaultFormActionProps = {
  singleLine: false,
  position: 'left',
  resetText: '重置',
  submitText: '提交',
}

const defaultColProps = {span: 24}

const formProps = {
  ...elFormProps,
  modelValue: {
    type: Object,
    default: () => ({})
  },
  schemas: {
    type: Array as PropType<FormSchemas>,
    required: true,
    default: () => ([]),
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  action: {
    type: Object as PropType<FormAction>,
    default: () => (defaultFormActionProps),
  },
  colProps: {
    type: Object,
    default: () => (defaultColProps)
  },
  refObj: {
    type: Object,
    default: null,
  },
  widthFull: {
    type: Boolean,
    default: false,
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
    type: Object as PropType<FormSchema>,
    default: () => ({})
  },
}

const formQueryProps = {
  ...formProps,
  simple: {
    type: Boolean,
    default: false,
  },
  advanced: {
    type: Boolean,
    default: false,
  },
  colProps: {
    default: () => ({xs: 24, sm: 12, md: 12, lg: 8, xl: 6})
  }
}

export {formProps, formItemProps, formQueryProps, defaultColProps, defaultFormActionProps}