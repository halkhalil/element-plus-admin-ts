import type {
  FormItemProps as ElFormItemProps,
} from 'element-plus'
import {CallbackFn} from "#/config";
import {ExtractPropTypes} from "vue";

import {formProps} from '../props'

export enum FormComponentEnum {
  Input = 'Input',
  Select = 'Select',
  Radio = 'Radio',
  RadioGroup = 'RadioGroup',
  Checkbox = 'Checkbox',
  CheckboxGroup = 'CheckboxGroup',
  InputNumber = 'InputNumber',
  Switch = 'Switch',
  Cascader = 'Cascader',
  Slider = 'Slider',
  DatePicker = 'DatePicker',
  TimePicker = 'TimePicker',
  TimeSelect = 'TimeSelect',
  TreeSelect = 'TreeSelect',
  Upload = 'Upload',
}

export type showFn = (schema: FormSchema) => boolean

export interface FormSchema {
  field?: string,
  label?: string,
  component?: string | FormComponentEnum,
  placeholder?: string,
  componentProps?: object | CallbackFn,
  formItemProps?: ElFormItemProps,
  slot?: string,
  show?: boolean | showFn,
  ifShow?: boolean | showFn,
}

export type FormSchemas = FormSchema[];

// export interface FormProps extends ElFormProps {
//   readonly schemas: FormSchema[],
//   actionProps?: object,
//   modelValue: object,
// }

export interface FormAction {
  singleLine?: boolean,
  position?: 'left' | 'center' | 'right',
  resetText?: string,
  submitText?: string,
}

export type FormProps = ExtractPropTypes<typeof formProps>;
