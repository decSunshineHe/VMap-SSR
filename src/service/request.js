import axios from 'axios';

const axiosPost = (url, data, token) => {
    url = 'http://192.168.0.243:8080/gateway' + url;
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            headers: {
            }
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

const axiosGet = (url) => {
    url = 'http://192.168.0.243:8080/gateway' + url;
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: {

            }
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
export { axiosGet, axiosPost };
