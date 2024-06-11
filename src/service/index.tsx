import axios, { AxiosRequestConfig } from "axios";
import createLoading from "./createLoading";

const service=axios.create({
    baseURL:'https://mock.yonyoucloud.com/mock/29591/testlog',
    timeout:5000,
    headers:{
        'Content-Type':'application/json;charset=utf-8'
    }
})
//添加请求拦截器
service.interceptors.request.use(
    (config)=>{
        return config
    },
    (error)=>{
        return Promise.reject(new Error(error))
    }
)
//添加相应拦截器
service.interceptors.response.use(
    (response)=>{
        if(response.status!==200){
            alert(`$请求失败！{response.statusText}`)
            return Promise.reject(response.statusText)
        }
        return Promise.resolve(response)
    },
    (error)=>{
        return Promise.reject(new Error(error))
    }
)
export async function request(config: AxiosRequestConfig,showLoading=true){
    function createLoadingWrapper(){
        if(showLoading){
            const loading=createLoading()
            return loading
        }
        return null
    }
    let _loading=createLoadingWrapper()
    function hideLoading() {
        if (_loading) {
            _loading.hide();
            _loading = null;
        }
    }
    return new Promise((resolve,reject)=>{
        service(config).then((res)=>{
            const { code, message,data,success } = res.data ;
                // if (code === 200 || status === 1) {
                if ( success  || code === "200" || code === 200 || message /* FIXME 临时处理下载 */) {
                    resolve(data);
                } else {
                    reject(message);
                }
        }).catch(err=>{
            reject(err)
        }).finally(()=>{
            if(showLoading){
                hideLoading()
            }
        })
    })
}
export async function requestWithLoading(config: AxiosRequestConfig){
    return request(config,false)
}