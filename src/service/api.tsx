import service from "./index"
export function getSearchRes(){
    return service({
        method:"get",
        url:"/testNode",
        params:{
            name:"test" 
        }
    })
}