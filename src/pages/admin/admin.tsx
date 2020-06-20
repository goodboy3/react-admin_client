import React, { Component } from 'react'
import { Switch,Route, Redirect } from 'react-router-dom'

import { Layout,message } from 'antd';

import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import { RouteComponentProps } from 'react-router-dom'
import { MemoryUtils } from '../../utils/memoryUtils'
interface Props extends RouteComponentProps
{

}

interface State
{

}

const {  Footer, Sider, Content } = Layout;
export default class Admin extends Component<Props,State>
{
    
    render()
    {
        let user = MemoryUtils.user
        //console.log(user);
        
        if (!user || !user._id)
        {
            message.error("请重新登录")
            return <Redirect to='/login'></Redirect>
        }
        
        return (
            <Layout style={{height:'100%'}}>
                <Sider style={{ width: '300px' }}>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header username={MemoryUtils.user.username}>Header</Header>
                    <Content style={{ margin:20,backgroundColor: 'white' }}>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/products/category' component={Category}></Route>
                            <Route path='/products/product' component={Product}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/charts/bar' component={Bar}></Route>
                            <Route path='/charts/line' component={Line}></Route>
                            <Route path='/charts/pie' component={Pie}></Route>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign:'center',color:'#aaaaaa'}}>底部文字 备案号 版权zzb</Footer>
                </Layout>
            </Layout>
        )
    }
}