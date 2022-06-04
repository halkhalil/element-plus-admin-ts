import {ExtractPropTypes} from "vue";

export declare const formItemProps: {
  modelValue: {
    type: (BooleanConstructor | ObjectConstructor | StringConstructor | NumberConstructor | ArrayConstructor)[];
    default: undefined;
  };
  schema: {
    type: Object,
    default: () => ({})
  },
}

export declare type FormItemProps = ExtractPropTypes<typeof formItemProps>;