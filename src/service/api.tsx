import {request} from "./index"
export function getSearchRes(){
    return request({
        method:"get",
        url:"/testNode",
        params:{
            name:"test" 
        }
    })
}