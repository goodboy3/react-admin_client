import React, { Component } from 'react'
import moment from 'moment'
import { reqWeather } from '../../api/index'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import menuList, { IMenuList } from '../../config/menuConfig'
import { Modal } from 'antd'
import LinkButton from '../link-button/link-button'


import './header.less'
import { StorageUtils } from '../../utils/storageUtils'
import { MemoryUtils } from '../../utils/memoryUtils'

interface Props extends RouteComponentProps
{
    username: string;
}

interface State
{
    currentTime: string;
    dayPictureUrl: string;
    weather: string;
}

class Header extends Component<Props,State>
{
    pathMap: { [key: string]: string } = {};
    title: string = '';
    timer:NodeJS.Timeout = null;

    mapThePath(menuItems:IMenuList[])
    {
        menuItems.map((item) =>
        {
            let key=item.key.replace('/','')
            this.pathMap[key] = item.title;
            if (item.children)
            {
                this.mapThePath(item.children)
            }

            return 1
        })
    }


    getTitle()
    {
        let locationPaths = this.props.location.pathname.split('/');
        locationPaths.shift()
        let title = ''
        locationPaths.forEach((value) =>
        {
            title+=this.pathMap[value]+'/'
        })
        return (title.substring(0,title.length-1));
        
    }

    constructor(prop:Props)
    {
        super(prop)
        this.state={
            currentTime: moment().format("YYYY-M-D HH:mm:ss"),
            dayPictureUrl: '',
            weather:''
        }
        
        this.mapThePath(menuList);
        this.title = this.getTitle();
    }


    async componentDidMount()
    {
        this.timer=setInterval(() =>
        {
            this.setState({
                currentTime: moment().format("YYYY-M-D HH:mm:ss")
            })
        }, 1000)
        
        let { dayPictureUrl, weather } = await reqWeather("上海");
        this.setState({ dayPictureUrl, weather })
        

    }

    componentWillUnmount()
    {
        clearInterval(this.timer)
    }

    logout()
    {        
        Modal.confirm({
            content: "确定退出吗?",
            onOk:()=>
            {
                StorageUtils.delUser();
                MemoryUtils.user = null;
                console.log('OK');
                this.props.history.replace('/login');
            },
            onCancel()
            {
                console.log('Cancel');
            },
        })
    }

    render()
    {
        
        
        const {currentTime,dayPictureUrl,weather } = this.state;

        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎,{this.props.username}</span>
                    <LinkButton onClick={this.logout.bind(this)}>退出</LinkButton>
                    {/* <a href='javascript:' onClick={this.logout.bind(this)}>退出</a> */}
                </div>
                
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{this.title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)