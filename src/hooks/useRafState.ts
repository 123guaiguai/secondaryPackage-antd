import { useEffect, useRef, useState } from "react";

//使用requestAnimationFrame来实现平滑更新（可以代替需要频繁更新的useState）
export default function useRafState<S>(initialState: S | (() => S)) {
  const ref=useRef(0)
  const [state, setState]=useState(initialState);
  const setRafState=(value:S|((prevState:S)=>S))=>{
    ref.current=requestAnimationFrame(()=>{
        setState(value)
    })
  }
  useEffect(()=>{
    return ()=>{
        cancelAnimationFrame(ref.current)
    }
  })
  return [state,setRafState] as const;
}
