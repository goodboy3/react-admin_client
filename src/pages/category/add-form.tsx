import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import { FormInstance } from 'antd/lib/form';
import {ICategory} from './category'
const Item = Form.Item;
const Option = Select.Option;

interface Props{
    categorys: ICategory[]
    parentId:string
}

interface State
{

}

export default class AddForm extends Component<Props,State>
{
    formRef = React.createRef<FormInstance>()

    render()
    {
        return (
            <Form
                ref={this.formRef}
                layout={'vertical'}
            >
                <Item name='parentId' label="选择分类" initialValue={this.props.parentId}>
                    <Select>
                        <Option key='0' value='0'>一级分类</Option>
                        {this.props.categorys && this.props.categorys.map((item, index) =>
                        {
                            return <Option key={index+1}value={item._id}>{item.name}</Option>
                        })}
                    </Select>
                </Item>
               
                <Item name='categoryName' label='分类名称'
                    rules={[
                        { required: true, whitespace: true, message: 'Please input your Username!' },
                    ]}>
                    {/* <span>分类名称:</span> */}
                    <Input placeholder='输入分类名称'></Input>
                </Item>
            </Form>
        )
    }
}