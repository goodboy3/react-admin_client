import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'

export default class Product extends Component
{
    render()
    {
        return (
            <Switch>
                <Route exact path='/products/product' component={ProductHome} />
                <Route path='/products/product/addupdate' component={ProductAddUpdate} />
                <Route path='/products/product/detail' component={ProductDetail} />  
                <Redirect to='/products/product'></Redirect>
            </Switch>
        )
    }
}