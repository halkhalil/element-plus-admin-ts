// import 'element-plus/es/components/select/style/css';
// import 'element-plus/es/components/input/style/css';
// import 'element-plus/es/components/time-picker/style/css';
// import 'element-plus/es/components/date-picker/style/css';
// import 'element-plus/es/components/radio/style/css';
// import 'element-plus/es/components/radio-button/style/css';
// import 'element-plus/es/components/checkbox-group/style/css';
// import 'element-plus/es/components/checkbox-button/style/css';
// import 'element-plus/es/components/upload/style/css';
// import 'element-plus/es/components/slider/style/css';
import {
  ElInput,
  ElRadio,
  ElCheckbox,
  ElDatePicker,
  ElTimePicker,
  ElInputNumber,
  ElSwitch,
  ElCascader,
  ElSlider,
  ElTimeSelect,
  ElTreeSelect,
} from 'element-plus'
import Select from "./components/Select.vue";
import RadioGroup from "./components/RadioGroup.vue";
import CheckboxGroup from "./components/CheckboxGroup.vue";
import {BasicUpload} from '~/components/Upload'

const componentMap = new Map;
componentMap.set('Input', ElInput);
componentMap.set('Select', Select);
componentMap.set('Radio', ElRadio);
componentMap.set('RadioGroup', RadioGroup);
componentMap.set('Checkbox', ElCheckbox);
componentMap.set('CheckboxGroup', CheckboxGroup);
componentMap.set('InputNumber', ElInputNumber);
componentMap.set('Switch', ElSwitch);
componentMap.set('Cascader', ElCascader);
componentMap.set('Slider', ElSlider);
componentMap.set('DatePicker', ElDatePicker);
componentMap.set('TimePicker', ElTimePicker);
componentMap.set('TimeSelect', ElTimeSelect);
componentMap.set('TreeSelect', ElTreeSelect);
componentMap.set('Upload', BasicUpload);

export {
  componentMap
}