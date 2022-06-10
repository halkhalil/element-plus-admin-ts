import {uploadProps as elUploadProps} from 'element-plus'

const uploadProps = {
  ...elUploadProps,
  action: {
    type: String,
    default: () => {
      return import.meta.env.VITE_UPLOAD_URL;
    },
    required: true,
  },
};

export {uploadProps}