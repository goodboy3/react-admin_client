/**
 * 应用的根组件
 */

import React, { Component } from 'react'
import { HashRouter as Router, Route,Switch } from 'react-router-dom'

import Login from "./pages/login/login"
import Admin from "./pages/admin/admin"


export default class App extends Component
{

    //修改测试
    render()
    {
        return (
            <Router>
                <Switch>{/*只匹配其中一个*/}
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </Router>
        )
    }
}