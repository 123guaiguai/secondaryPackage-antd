import React, { FC, useEffect, useState } from 'react'
import styles from '../styles/select.module.less'
import { getSearchRes } from '../service/api'

interface IProps{
  wrapHeight?:number,
  itemHeight?:number
}

export interface IItem{
  name:string
}

const InfiniteScrollSelect:FC<IProps>=({wrapHeight=300,itemHeight=20})=> {

  const [list,setList]=useState<IItem[]>([])
  const getListData=async()=>{
    let data=await getSearchRes() as IItem[]
    setList(data)
  }
  useEffect(()=>{
    getListData()
  },[])

  return (
    <div className={styles.wrapContainer} style={{height:wrapHeight+'px'}}>
      {
        list.length&&
        list.map((item,index)=>{
          return <div key={index} className={styles.selectItem} style={{height:itemHeight+'px'}}>{item.name}</div>
        })
      }
    </div>
  )
}
export default InfiniteScrollSelect
