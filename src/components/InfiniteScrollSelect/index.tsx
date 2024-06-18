import React, { FC, UIEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import styles from '../../styles/select.module.less'
import { getSearchRes } from '../../service/api'
import { useDebounceFn } from '../../hooks/useDebounce'

interface IProps{
  wrapHeight?:number,
  itemHeight?:number,
  list:IItem[],
  onBottomingOut: (...args:any[])=>any
}

export interface IItem{
  name:string
}

const InfiniteScrollSelect:FC<IProps>=({wrapHeight=300,itemHeight=30,list,onBottomingOut})=> {

  const [beginIndex,setBeginIndex]=useState(0)
  const [endIndex,setEndIndex]=useState(0)
  const [maxVolume,setMaxVolume]=useState(0)
  const {run:debounceBottomingOut}=useDebounceFn(onBottomingOut,{wait:100})

  const handleScroll: UIEventHandler= async (event)=>{
    const target = event.target as HTMLElement;
    const maxScrollHeight = target.scrollHeight - target.clientHeight;
    //触底追加数据
    if(target.scrollTop >= maxScrollHeight){
      debounceBottomingOut?.()
    }
    setBeginIndex(Math.floor(Math.min(target.scrollTop,maxScrollHeight)/itemHeight))
  }

  //截取显示数据
  const showList=useMemo(()=>{
    return list.slice(beginIndex, endIndex + 1);
  },[endIndex,list])

  const handleEndIndex=()=>{
    let endIndex = beginIndex + maxVolume;
    if (!list[endIndex]) {
      endIndex =list.length - 1;
    }
    setEndIndex(endIndex);
  }

  useEffect(()=>{
    //计算最大容积-注意这个加2,代表的是上下不完全显示的数据
    setMaxVolume(Math.floor(wrapHeight/itemHeight)+2)
  },[])

  useEffect(()=>{
    if(list.length&&maxVolume){
      handleEndIndex()
    }
  },[beginIndex,maxVolume,list])


  return (
    <div className={styles.wrapContainer} style={{height:wrapHeight+'px'}} onScroll={handleScroll}>
      <div style={{paddingTop:`${(beginIndex)*itemHeight}px`,paddingBottom:`${(list.length-endIndex-1)*itemHeight}px`}}>
        {
          showList.map((item,index)=>{
            return <div key={index} className={styles.selectItem} style={{height:itemHeight+'px'}}>{item.name}</div>
          })
        }
      </div>
    </div>
  )
}
export default InfiniteScrollSelect
