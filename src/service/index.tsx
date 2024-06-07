import axios, { Axios, AxiosPromise } from "axios";
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
        config.headers.loading=createLoading()
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
        return Promise.resolve(response.data)
    },
    (error)=>{
        return Promise.reject(new Error(error))
    }
)
export async function request(reqService:()=>AxiosPromise):AxiosPromise<any>{
    const loading=createLoading()
    let res=await reqService()
    if(res){
        loading.hide()
    }
    return res
}
export default service