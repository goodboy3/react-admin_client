import React, { Component } from 'react'
import './home.less'

interface Props{

}

interface State
{
    
}

export default class Home extends Component<Props,State>
{
    
    render()
    {
        return (
            <div className='home'>
                欢迎使用硅谷后台管理系统
            </div>
        )
    }
}