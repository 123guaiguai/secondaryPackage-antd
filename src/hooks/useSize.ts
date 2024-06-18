import { RefObject, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import useRafState from "./useRafState";

//用于获取dom元素的宽高的自定义hook
type Size={
    width:number,
    height:number
}
export default function useSize(refTarget:RefObject<HTMLElement>):Size|undefined{
    const [size,setSize]=useRafState(()=>{
        if(!refTarget.current){
            return undefined
        }
        const el=refTarget.current
        return el? {
            width:el.clientWidth,
            height:el.clientHeight
        }:undefined
    })
    const resizeObserver=new ResizeObserver((entries)=>{
        for(let entry of entries){
            const {clientWidth,clientHeight}=entry.target
            setSize({width:clientWidth,height:clientHeight})
        }
    })
    resizeObserver.observe(refTarget.current!)
    useEffect(()=>{
        return ()=>{
            resizeObserver.disconnect()
        }
    },[])
    return size

}