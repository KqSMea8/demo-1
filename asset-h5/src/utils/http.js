/**
 * @file 统一处理http
 */

import axios from 'axios';

let errNet = '网络异常，请稍后再试';

export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    alert(errNet);
                });
        });
    },
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params: params || ''
                })
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    alert(errNet);
                });
        });
    }
};
