import {request} from "./index"

/**
 * 
 * @param params pagination 页码
 * @param params pageSize 每页数量
 搜索内容
 * @returns 
 */
interface IGetSearchRes{
    pagination:number,
    pageSize:number,
}
export function getSearchRes(params: IGetSearchRes){
    return request({
        method:"get",
        url:"/testNode",
        params
    })
}