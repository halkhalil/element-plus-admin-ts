import {uploadProps} from 'element-plus'

const props = {
  ...uploadProps,
  action: {
    type: String,
    default: () => {
      return import.meta.env.VITE_UPLOAD_URL;
    },
    required: true,
  },
};

export {props}