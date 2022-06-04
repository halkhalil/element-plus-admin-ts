import type {
  FormProps as ElFormProps,
  FormItemProps as ElFormItemProps,
  FormInstance as ElFormInstance,
} from 'element-plus'
import {callbackFn} from "@tinymce/tinymce-vue/lib/es2015/main/ts/ScriptLoader";
import {Ref} from "vue";

export interface FormSchema {
  field: string,
  placeholder: string,
  component: string,
  componentProps?: object | callbackFn,
  formItemProps?: ElFormItemProps,
  slot?: string,
  // 是否显示
  show?: boolean | callbackFn,
}

export interface FormProps extends ElFormProps {
  readonly schemas: FormSchema[],
  actionProps?: object,
  modelValue: object,
}

