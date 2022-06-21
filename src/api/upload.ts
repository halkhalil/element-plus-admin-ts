import axios from "~/utils/axios";
import {AxiosPromise} from "axios";

export const fetchOssSign = (): AxiosPromise => axios.post('http://element-plus-admin.local/backend/uploads/oss');