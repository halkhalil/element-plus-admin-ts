import {responseSuccess} from "../_utils.js";

const token = {access_token: 'mockToken1'};

export default [
  {
    url: '/backend/login',
    method: 'post',
    response: (e) => {
      return responseSuccess(token)
    }
  },
  {
    url: '/backend/logout',
    method: 'post',
    response: () => {
      return responseSuccess([])
    }
  }
];