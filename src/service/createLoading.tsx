import { render } from "react-dom";
import React from "react";
import Spin from "../components/Spin/index"

let createdLoadingCounter=0//创建的loading实例计数，防止重复渲染

export default function createLoading() {
    let loadingWrapper:HTMLDivElement|null = null;
    const container = document.body;
    /** 清理loadingWrapper */
    const clean = () => {
        if (loadingWrapper) {
            container.removeChild(loadingWrapper);
            loadingWrapper = null;
        }
        createdLoadingCounter = 0;
    };
    /** 关闭loading回调 */
    const callback = () => {
        createdLoadingCounter--;
        // 所有loading都hide了
        if (createdLoadingCounter <= 0) {
            clean();
        }
    };
    // 已经有loading
    if (loadingWrapper && createdLoadingCounter > 0) {
      createdLoadingCounter++;
        return {
            hide: callback,
        };
    }
    // 还没有loading
    clean();
    createdLoadingCounter++;
    loadingWrapper = document.createElement("div");
    container.appendChild(loadingWrapper);
    const SpinHtml = <Spin getPopupContainer={loadingWrapper} spinning />;
    render(React.cloneElement(SpinHtml), loadingWrapper);
    return {
        hide: callback,
    };
}