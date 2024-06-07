import React, { FC, useEffect, useState } from 'react'
import styles from '../styles/select.module.less'
import { getSearchRes } from '../service/api'
import { request } from '../service'
import createLoading from '../service/createLoading'

interface IProps{
  wrapHeight?:number,
  itemHeight?:number
}

interface IItem{
  name:string
}

const InfiniteScrollSelect:FC<IProps>=({wrapHeight=300,itemHeight=20})=> {

  const [list,setList]=useState<IItem[]>([])
  const getListData=async()=>{
    const {data}=await request(getSearchRes)
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
