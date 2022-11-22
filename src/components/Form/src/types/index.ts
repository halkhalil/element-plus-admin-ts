import type {
  FormProps as ElFormProps,
  FormItemProps as ElFormItemProps,
} from 'element-plus'
import {callbackFn} from "@tinymce/tinymce-vue/lib/es2015/main/ts/ScriptLoader";



export interface FormSchema {
  field: string,
  label?: string,
  component: string,
  placeholder?: string,
  componentProps?: object | callbackFn,
  formItemProps?: ElFormItemProps,
  slot?: string,
  // 是否显示
  show?: boolean | callbackFn,
}
export type FormSchemas = FormSchema[];

export interface FormProps extends ElFormProps {
  readonly schemas: FormSchema[],
  actionProps?: object,
  modelValue: object,
}

