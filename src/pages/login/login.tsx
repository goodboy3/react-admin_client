import React, { Component } from 'react'

import './login.less'
import logo from '../../assets/images/logo.png'

import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { FormInstance } from 'antd/lib/form';
import { reqLogin} from '../../api/index'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { MemoryUtils } from '../../utils/memoryUtils'
import {StorageUtils} from '../../utils/storageUtils'

interface Props extends RouteComponentProps
{

}

interface State
{

}
export default class Login extends Component<Props,State>
{
    formRef = React.createRef<FormInstance>();

    
    validateValue()
    {
        let values = this.formRef.current?.getFieldsValue();
        console.log(values);
        
    }

    
    onFinish = async (values: Store) =>
    {

        //规则通过,开始发送登录请求
        console.log('Received values of form: ', values);
        const { username, password } = values
        
        let result:any = await reqLogin(username, password)
        console.log(result);
        if (result && result.status === 0)
        {
            //记录用户信息
            let user = result.data
            MemoryUtils.user = user
            StorageUtils.saveUser(user)
            console.log(MemoryUtils.user);
            

            //登录成功,页面进行跳转
            message.success("登录成功")
            this.props.history.replace('/')

        }
        else if (result && result.status === 1)
        {
            //登录失败,用户名或者密码错误
            message.error(result.msg)
        }
        // else
        // {
        //     message.error("出现未知错误")
        // }


    }

    render()
    {
        if (MemoryUtils.user && MemoryUtils.user._id) 
        {
            return (
                <Redirect to='/'></Redirect>
            )
        }

        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>React项目:后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form
                        ref={this.formRef}
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}                       
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, whitespace:true, message: 'Please input your Username!' },
                                { min:3,message:'用户名必须大于5个字符'},
                                { max: 40, message: '用户名必须小于40个字符' },
                                { type: 'string' },
                                { pattern: new RegExp(/^[a-zA-Z0-9_]+$/),message:'包含非法字符'},
                            ]}
                        >
                            <Input prefix={<UserOutlined style={{color:'rgba(0,0,0,.25'}} className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, whitespace: true, message: 'Please input your Password!' },
                                { min: 3, message: '密码必须大于5个字符' },
                                { max: 40, message: '密码必须小于40个字符' },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25' }} className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                               登录
                            </Button>       
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}


//const WrapLogin = Form.create()(Login)
//export default  WrapLogin