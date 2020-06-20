/**
 * 入口文件
 */

import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { MemoryUtils } from "./utils/memoryUtils"
import { StorageUtils } from "./utils/storageUtils"

//读取local中保存的user
MemoryUtils.user=StorageUtils.getUser()


//将App组件标签渲染到index页面的div上
ReactDOM.render(<App />, document.getElementById("root"))