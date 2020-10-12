import { axiosPost, axiosGet } from './request';
export default {
    //--------------------   分割线   ------------------------------
    // 获取当前登入获取所有系统
    getUserSystem: data => {
        return axiosPost('/applicationservice/User/getUserSystem', data);
    },
    // 获取系统分类列表
    getAllClassify: data => {
        return axiosGet('/backendservice/systemregistration/getAllClassify', data);
    },
    // 删除首页角色菜单
    deleteUserSystemBind: data => {
        return axiosGet('/applicationservice/User/deleteUserSystemBind', data);
    },
    // 添加首页角色菜单
    getUserSystemBind: data => {
        return axiosPost('/applicationservice/User/getUserSystemBind', data);
    },
    // 更新系统点击次数 
    udpateBrowsenumSystem: data => {
        return axiosPost('/backendservice/systemregistration/udpateBrowsenumSystem', data)
    }
}