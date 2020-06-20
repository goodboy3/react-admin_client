import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import { FormInstance } from 'antd/lib/form';
const Item = Form.Item;


interface Props
{
    categoryName: string
    
}

interface State
{

}

export default class UpdateForm extends Component<Props, State>
{
    formRef = React.createRef<FormInstance>()

    render()
    {
        
        let defaultValue = this.props.categoryName
        return (
            <Form
                layout="vertical"
                ref={this.formRef}
            >
                <Item
                    label={'[原名称:' + defaultValue + ']'}
                    name='categoryName'
                    initialValue={defaultValue}
                    rules={[
                        { required: true, whitespace: true, message: 'Please input your Username!' },
                    ]}
                >
                    <Input
                        placeholder='请输入分类名称'>
                    </Input>
                </Item>
            </Form>
        )
    }
}