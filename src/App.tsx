import React, { FC, useEffect, useRef, useState } from 'react';
import {SearchForm,InfiniteScrollSelect} from './components/index';
import { FormInstance, Input, Radio } from 'antd';
import { getSearchRes } from './service/api';
import { IItem } from './components/InfiniteScrollSelect';

interface IFormInput{
  status: string;
  system: string;
  name: string;
  packagecode: string;
  tags: string
}

interface IOption{
  label: string;
  value: string|number
}

const RadioTag:FC<{options: IOption[]}> = ({ options }) => {
  return (
    <Radio.Group>
      {options.map(option => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};

const App = () => {
  const page=useRef({
    pagination: 0,
    pageSize: 20,
  },)
  const [list,setList]=useState<IItem[]>([])

  const onValuesChange = (changedValues: IFormInput, allValues:IFormInput) => {
    console.log('Values changed:', changedValues, allValues);
  };

  const onSearch = (values: IFormInput, errors: any, formIns: FormInstance) => {
    console.log('onSearch', values);
    alert(JSON.stringify(values))
  };

  const onReset = (values: IFormInput, formIns: FormInstance) => {
    console.log('onReset', values, formIns);
  };

  const getListData=async()=>{
    let data=await getSearchRes(page.current) as IItem[]
    page.current.pagination+=1
    setList(data)
  }

  const appendListData=async ()=>{
    const data=await getSearchRes(page.current) as IItem[]
    setList(list=>[...list,...data])
    page.current.pagination+=1
  }

  useEffect(()=>{
    getListData()
  },[])

  return (
    <div>
      {/* <SearchForm
      onValuesChange={onValuesChange}
      key="basic-search-form"
      formLayout={3}
      onSearch={onSearch}
      onReset={onReset}
    >
      <SearchForm.Item name="status" label="状态" inputType="custom">
        <RadioTag
          options={[
            { value: '0', label: '全部' },
            { value: '1', label: '已购买' },
            { value: '2', label: '未购买' },
          ]}
        />
      </SearchForm.Item>
      <SearchForm.Item name="system" label="使用系统" inputType="custom">
        <Input placeholder="请选择" />
      </SearchForm.Item>
      <SearchForm.Item inputType="input" label="请输入名称" name="name" />
      <SearchForm.Item inputType="input" label="请输入资产包id" name="packagecode" />
      <SearchForm.Item name="tags" label="标签" inputType="custom">
        <RadioTag
          options={[
            { value: '0', label: '全部' },
            { value: '1', label: '标签1' },
            { value: '2', label: '标签2' },
          ]}
        />
      </SearchForm.Item>
      </SearchForm> */}
      <InfiniteScrollSelect list={list} onBottomingOut={appendListData}/>

    </div>
    
  );
};

export default App;
