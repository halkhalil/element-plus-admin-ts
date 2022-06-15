export const selectOptions = [
  {
    label: '选项1',
    value: 'value1',
  },
  {
    label: '选项2',
    value: 'value2',
  },
  {
    label: '选项3',
    value: 'value3',
  }
];

export const selectGroupOptions = [
  {
    label: '分组1',
    options: selectOptions
  },
  {
    label: '分组2',
    options: [
      {
        label: '选项5',
        value: 'value5',
      },
      {
        label: '选项6',
        value: 'value6',
      }
    ]
  },
];

export const cascaderOptions = [
  {
    label: '选项1',
    value: 'value1',
    children: [
      {label: '选项3', value: 'value1',},
      {label: '选项4', value: 'value1',}
    ]
  },
  {
    label: '选项2',
    value: 'value2',
    children: [
      {label: '选项4', value: 'value1',},
      {label: '选项5', value: 'value1',}
    ]
  },
];


export function getBasicFormData() {
  return [
    {
      field: 'input',
      label: '输入框',
      component: 'Input',
      componentProps: {
        placeholder: '这是一个Input表单',
      },
    },
    {
      field: 'input_number',
      label: '计数器',
      component: 'InputNumber',
      componentProps: {
        placeholder: '这是一个InputNumber表单',
        style: {
          // minWidth: '300px'
        }
      },
    },
    {
      field: 'select',
      label: '选择器',
      component: 'Select',
      componentProps: {
        placeholder: '这是一个Select',
        options: selectOptions
      },
    },
    {
      field: 'cascader',
      label: '级联选择器',
      component: 'Cascader',
      componentProps: {
        placeholder: '这是一个Cascader',
        collapseTags: true,
        options: cascaderOptions,
      },
    },
    {
      field: 'slider',
      label: '滑块',
      component: 'Slider',
      componentProps: {
        placeholder: '这是一个Input表单',
      },
    },
    {
      field: 'switch',
      label: '开关',
      component: 'Switch',
      componentProps: {
        placeholder: 'Switch',
      },
    },
    {
      field: 'time_picker',
      label: '时间选择器',
      component: 'TimePicker',
      componentProps: {
        placeholder: 'TimePicker',
        valueFormat: 'HH:mm:ss',
      },
    },
    {
      field: 'time_select',
      label: '时间选择器',
      component: 'TimeSelect',
      componentProps: {
        placeholder: 'TimeSelect',
      },
    },
    {
      field: 'date_picker',
      label: '日期选择器',
      component: 'DatePicker',
      componentProps: {
        placeholder: 'DatePicker',
        type: 'date',
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        onChange: (e) => {
          console.log(e)
        },
      },
    },
    {
      field: 'date_time_picker',
      label: '日期时间选择器',
      component: 'DatePicker',
      componentProps: {
        placeholder: 'DateTimePicker',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        type: 'datetime',
      },
    },
    {
      field: 'radio_group',
      label: '单选框',
      component: 'RadioGroup',
      componentProps: {
        placeholder: 'RadioGroup',
        options: selectOptions,
      },
    },
    {
      field: 'radio_button_group',
      label: '单选框按钮',
      component: 'RadioGroup',
      componentProps: {
        placeholder: 'RadioButtonGroup',
        options: selectOptions,
        button: true,
      },
    },
    {
      field: 'checkbox_group',
      label: '多选框',
      component: 'CheckboxGroup',
      componentProps: {
        options: selectOptions,
      },
    },
    {
      field: 'checkbox_button_group',
      label: '多选框按钮',
      component: 'CheckboxGroup',
      componentProps: {
        options: selectOptions,
        button: true,
      },
    },
    {
      field: 'upload',
      label: '上传',
      component: 'Upload',
      componentProps: {
        listType: "text",
        // limit: 1,
        multiple: true,
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
        ],
      },
      // componentEvents: {
      //   'on-success': (response, VModel) => {
      //     const {url} = response.data;
      //     VModel.value=response.data;
      //   }
      // }
    },
  ];
}

export function getRuleFormData() {
  return [
    {
      field: 'input',
      label: '输入框',
      component: 'Input',
      componentProps: {
        placeholder: '这是一个Input表单',
      },
    },
    {
      field: 'input_number',
      label: '计数器',
      component: 'InputNumber',
      componentProps: {
        placeholder: '这是一个InputNumber表单',
        style: {
          minWidth: '300px'
        }
      },
      formProps: {
        rules: [{required: true, message: '这是个必填项', trigger: 'blur'}],
      },
    },
    {
      field: 'select',
      label: '选择器',
      component: 'Select',
      componentProps: {
        placeholder: '这是一个Select',
        options: selectOptions
      },
    },
    {
      field: 'cascader',
      label: '级联选择器',
      component: 'Cascader',
      componentProps: {
        placeholder: '这是一个Cascader',
        collapseTags: true,
        options: cascaderOptions,
        change: () => {
          console.log(111);
        }
      },
    },
    {
      field: 'slider',
      label: '滑块',
      component: 'Slider',
      componentProps: {
        placeholder: '这是一个Input表单',
      },
    },
    {
      field: 'switch',
      label: '开关',
      component: 'Switch',
      componentProps: {
        placeholder: 'Switch',
      },
    },
    {
      field: 'time_picker',
      label: '时间选择器',
      component: 'TimePicker',
      componentProps: {
        placeholder: 'TimePicker',
        valueFormat: 'HH:mm:ss',
      },
    },
    {
      field: 'time_select',
      label: '时间选择器',
      component: 'TimeSelect',
      componentProps: {
        placeholder: 'TimeSelect',
      },
    },
    {
      field: 'date_picker',
      label: '日期选择器',
      component: 'DatePicker',
      componentProps: {
        placeholder: 'DatePicker',
        type: 'date',
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        onChange: (e) => {
          console.log(e)
        },
      },
    },
    {
      field: 'date_time_picker',
      label: '日期时间选择器',
      component: 'DatePicker',
      componentProps: {
        placeholder: 'DateTimePicker',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        type: 'datetime',
      },
    },
    {
      field: 'radio_group',
      label: '单选框',
      component: 'RadioGroup',
      componentProps: {
        placeholder: 'RadioGroup',
        options: selectOptions,
      },
    },
    {
      field: 'radio_button_group',
      label: '单选框按钮',
      component: 'RadioButtonGroup',
      componentProps: {
        placeholder: 'RadioButtonGroup',
        options: selectOptions,
      },
    },
    {
      field: 'checkbox_group',
      label: '多选框',
      component: 'CheckboxGroup',
      componentProps: {
        options: selectOptions,
      },
    },
    {
      field: 'checkbox_button_group',
      label: '多选框按钮',
      component: 'CheckboxButtonGroup',
      componentProps: {
        options: selectOptions,
      },
    },
    {
      field: 'upload',
      label: '上传',
      component: 'Upload',
      componentProps: {
        action: "https://jsonplaceholder.typicode.com/posts/",
        listType: "text",
        tips: '我是一个温馨小提示',
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
        ]
      },
    },
  ];
}

export function getSearchFormData() {
  return [
    {
      field: 'input',
      label: '输入框',
      placeholder: '请输入要搜索的内容',
      component: 'Input',
    },
    {
      field: 'daterange',
      label: '时间范围',
      placeholder: '请选择时间范围',
      component: 'DatePicker',
      componentProps: {type: 'daterange', startPlaceholder: '开始时间', endPlaceholder: '结束时间', valueFormat: 'YYYY-MM-DD'},
    },
    {
      field: 'date',
      label: '时间',
      placeholder: '请选择时间',
      component: 'DatePicker',
      componentProps: {type: 'date', valueFormat: 'YYYY-MM-DD'},
    },
    {
      field: 'selectSingle',
      label: '单选框',
      placeholder: '这是一个单选select选择器',
      component: 'Select',
      componentProps: {
        options: selectGroupOptions
      },
    },
    {
      field: 'selectMultiple',
      label: '多选框',
      placeholder: '这是一个多选select选择器',
      component: 'Select',
      componentProps: {
        multiple: true,
        options: selectOptions
      },
    },
    {
      field: 'cascader',
      label: '级联选择器',
      placeholder: '这是一个级联选择器',
      component: 'Cascader',
      componentProps: {
        collapseTags: true,
        options: cascaderOptions,
      },
    },
    {
      field: 'treeSelect',
      label: '树形选择器',
      placeholder: '这是一个树形选择器',
      component: 'TreeSelect',
      componentProps: {
        data: [
          {
            value: '1',
            label: 'Level one 1',
            children: [
              {
                value: '1-1',
                label: 'Level two 1-1',
                children: [
                  {
                    value: '1-1-1',
                    label: 'Level three 1-1-1',
                  },
                ],
              },
            ],
          },
          {
            value: '2',
            label: 'Level one 2',
            children: [
              {
                value: '2-1',
                label: 'Level two 2-1',
                children: [
                  {
                    value: '2-1-1',
                    label: 'Level three 2-1-1',
                  },
                ],
              },
              {
                value: '2-2',
                label: 'Level two 2-2',
                children: [
                  {
                    value: '2-2-1',
                    label: 'Level three 2-2-1',
                  },
                ],
              },
            ],
          },
          {
            value: '3',
            label: 'Level one 3',
            children: [
              {
                value: '3-1',
                label: 'Level two 3-1',
                children: [
                  {
                    value: '3-1-1',
                    label: 'Level three 3-1-1',
                  },
                ],
              },
              {
                value: '3-2',
                label: 'Level two 3-2',
                children: [
                  {
                    value: '3-2-1',
                    label: 'Level three 3-2-1',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ];
}

export function getDynamicFormData() {
  return [
    {
      field: 'input',
      label: '输入框',
      component: 'Input',
      componentProps: {
        placeholder: '这是一个Input表单',
      },
      formProps: {
        rules: [{required: true, message: '这是个必填项', trigger: 'blur'}],
      },
    },
    {
      field: 'input_number',
      label: '计数器',
      component: 'InputNumber',
      componentProps: {
        placeholder: '这是一个InputNumber表单',
        style: {
          minWidth: '300px'
        }
      },
      formProps: {
        rules: [{required: true, message: '这是个必填项', trigger: 'blur'}],
      },
    },
    {
      field: 'select',
      label: '选择器',
      component: 'Select',
      componentProps: {
        placeholder: '这是一个Select',
        options: selectOptions
      },
    },
    {
      field: 'cascader',
      label: '级联选择器',
      component: 'Cascader',
      componentProps: {
        placeholder: '这是一个Cascader',
        collapseTags: true,
        options: cascaderOptions,
      },
    },
  ];
}