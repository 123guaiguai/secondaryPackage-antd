import { render } from "react-dom";
import React from "react";
import Spin from "../components/Spin/index"

let createdLoadingCounter=0//创建的loading实例计数，防止重复渲染

export default function createLoading() {
  let loadingWrap:HTMLDivElement|null=null;
  function callback() {
    createdLoadingCounter--
    if(createdLoadingCounter<=0&&loadingWrap){
      loadingWrap.parentNode?.removeChild(loadingWrap)
      loadingWrap=null
      createdLoadingCounter=0
    }
  }
  if(createdLoadingCounter===0){
    loadingWrap=document.createElement('div');
    document.body.appendChild(loadingWrap)
    const SpinHtml=<Spin spining={true} getPopupContainer={loadingWrap} />
    render(React.cloneElement(SpinHtml),loadingWrap)
  }else{
    createdLoadingCounter++
  }
  return {
    hide:callback
  }
}