import {uploadContentProps as elUploadContentProps} from 'element-plus'

const uploadProps = {
  ...elUploadContentProps,
  action: {
    type: String,
    default: () => {
      return import.meta.env.VITE_UPLOAD_URL;
    },
    required: true,
  },
};

export {uploadProps}