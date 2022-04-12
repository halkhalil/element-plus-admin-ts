import {responsePageSuccess, responseSuccess} from "../../_utils.js";

export const lists = (() => {
  const result = [
    {
      "id": 1,
      "name": "Administrator",
      "label": "超级管理员",
      "desc": "描述",
      "status": 1,
      "created_at": "2022-01-20 08:10:40",
      "status_label": "正常"
    },
    {
      "id": 2,
      "name": "Test",
      "label": "测试人员",
      "desc": "描述",
      "status": 1,
      "created_at": "2022-01-20 08:10:40",
      "status_label": "正常"
    }
  ];

  return result;
})();


export default [
  {
    url: '/backend/all/roles',
    method: 'get',
    response: ({query}) => {
      const {page} = query;
      return responsePageSuccess(lists, page)
    }
  },
];