import debounce from "lodash-es/debounce";
import { useEffect, useMemo, useRef, useState } from "react";

interface IDebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}
export function useDebounceFn<T extends (...args: any[]) => any>(fn:T,options:IDebounceOptions){
    const fnRef=useRef<T>(fn)
    fnRef.current=fn
    const waiting=options.wait||1000
    const debounced= useMemo(()=>
        debounce((...args:Parameters<T>):ReturnType<T>=>{
            return fnRef.current(...args)
        },waiting,options),[])
    useEffect(()=>{
        return ()=>{
            debounced.cancel()
        }
    })
    return {
        run:debounced,
        cancel:debounced.cancel,
        flush:debounced.flush
    }

}

export function useDebounceValue<T>(value: T,options:IDebounceOptions){
    const [debouncedValue,setDebouncedValue]=useState(value)
    const {run}=useDebounceFn(()=>{
        setDebouncedValue(value)
    },options)
    useEffect(()=>{
        run()
    },[value])
    return debouncedValue
}