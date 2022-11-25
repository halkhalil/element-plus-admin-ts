import 'element-plus/es/components/select/style/css';
import 'element-plus/es/components/input/style/css';
import 'element-plus/es/components/time-picker/style/css';
import 'element-plus/es/components/date-picker/style/css';
import 'element-plus/es/components/radio/style/css';
import 'element-plus/es/components/radio-button/style/css';
import 'element-plus/es/components/checkbox-group/style/css';
import 'element-plus/es/components/checkbox-button/style/css';
import 'element-plus/es/components/upload/style/css';
import 'element-plus/es/components/slider/style/css';
import 'element-plus/es/components/cascader/style/css';
import 'element-plus/es/components/tree-select/style/css';
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
import {FormComponentEnum} from "./types";

const componentMap = new Map;
componentMap.set(FormComponentEnum.Input, ElInput);
componentMap.set(FormComponentEnum.Select, Select);
componentMap.set(FormComponentEnum.Radio, ElRadio);
componentMap.set(FormComponentEnum.RadioGroup, RadioGroup);
componentMap.set(FormComponentEnum.Checkbox, ElCheckbox);
componentMap.set(FormComponentEnum.CheckboxGroup, CheckboxGroup);
componentMap.set(FormComponentEnum.InputNumber, ElInputNumber);
componentMap.set(FormComponentEnum.Switch, ElSwitch);
componentMap.set(FormComponentEnum.Cascader, ElCascader);
componentMap.set(FormComponentEnum.Slider, ElSlider);
componentMap.set(FormComponentEnum.DatePicker, ElDatePicker);
componentMap.set(FormComponentEnum.TimePicker, ElTimePicker);
componentMap.set(FormComponentEnum.TimeSelect, ElTimeSelect);
componentMap.set(FormComponentEnum.TreeSelect, ElTreeSelect);
componentMap.set(FormComponentEnum.Upload, BasicUpload);

export {
  componentMap
}