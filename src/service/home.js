import { axiosPost } from './request';

export default {
    //--------------------   分割线   ------------------------------
    //用户登陆
    Login: data => {
        return axiosPost('/BackendNoverify/logIn', data);
    },
}