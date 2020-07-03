import React, { Component } from 'react'
import {Card,Select,Input,Button,Table} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button/link-button'

const Option=Select.Option


interface Props{

}

interface State
{
    products:any[]
}

export default class ProductHome extends Component<Props,State>
{
    columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key: 'age',
        },
        {
            title: '价格',
            dataIndex: 'price',
           
            render: (price) =>
            {
                return "¥"+price
            }
        },
        {
            title: '状态',
            dataIndex: 'state',
            width:100,
            render: (state) =>
            {
                return (
                    <span>
                        <Button type='primary'>下架</Button>
                        <span>在售</span>
                    </span>
                )
            }
        },
        {
            title: '操作',
            width: 100, 
            render: (product) =>
            {
                return (
                    <span>
                        <LinkButton>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>
                )
            }
        },
    ];

   
    render()
    {


        const title = (
            <span>
                <Select defaultValue="1" style={{ width: 150 }}>
                    <Option key='1' value='1'>按名称搜索</Option>
                    <Option key='2'value='2'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }}></Input>
                <Button type='primary'></Button>
            </span>
        )

        const extra = (
            <Button type='primary' icon={<PlusOutlined />}>添加商品</Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table dataSource={this.state.products} columns={this.columns}>

                </Table>
            </Card>
        )
    }
}