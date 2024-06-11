import React, { FC, UIEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import styles from '../styles/select.module.less'
import { getSearchRes } from '../service/api'

interface IProps{
  wrapHeight?:number,
  itemHeight?:number
}

export interface IItem{
  name:string
}

const InfiniteScrollSelect:FC<IProps>=({wrapHeight=300,itemHeight=30})=> {

  const [list,setList]=useState<IItem[]>([])
  const [beginIndex,setBeginIndex]=useState(0)
  const [endIndex,setEndIndex]=useState(0)
  const [maxVolume,setMaxVolume]=useState(0)

  const handleScroll: UIEventHandler=(event)=>{
    const target = event.target as HTMLElement;
    const maxScrollHeight = target.scrollHeight - target.clientHeight;
    setBeginIndex(Math.floor(Math.min(target.scrollTop,maxScrollHeight)/itemHeight))
  }

  const showList=useMemo(()=>{
    return list.slice(beginIndex, endIndex + 1);
  },[endIndex])

  const getListData=async()=>{
    let data=await getSearchRes() as IItem[]
    setList(data)
  }
  useEffect(()=>{
    getListData()
    setMaxVolume(Math.floor(wrapHeight/itemHeight)+2)
  },[])

  useEffect(()=>{
    let endIndex = beginIndex + maxVolume;
    if (!list[endIndex]) {
      endIndex =list.length - 1;
    }
    console.log('begin,end',beginIndex,endIndex)
    setEndIndex(endIndex);
  },[beginIndex,maxVolume])


  return (
    <div className={styles.wrapContainer} style={{height:wrapHeight+'px'}} onScroll={handleScroll}>
      <div style={{paddingTop:`${beginIndex*itemHeight}px`,paddingBottom:`${(list.length-endIndex-1)*itemHeight}px`}}>
        {
          showList.length&&
          showList.map((item,index)=>{
            return <div key={index} className={styles.selectItem} style={{height:itemHeight+'px'}}>{item.name}</div>
          })
        }
      </div>
    </div>
  )
}
export default InfiniteScrollSelect
