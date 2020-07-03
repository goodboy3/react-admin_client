import React, { Component } from 'react'
import { Card, Button, Table, message, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button/link-button'
import { reqCategorys,reqUpdateCategory,reqAddCategory } from '../../api/index'
import AddForm from './add-form'
import UpdateForm from './update-form'

export interface ICategory
{
    partenId: string,
    _id: string,
    name: string,
    __v: number
}

interface Prop
{

}

interface State
{
    categorys: ICategory[]
    subCategroys: ICategory[]
    loading: boolean
    parentId: string
    parentName: string

    //添加 更新 的确认框是否显示 0都不显示 1显示添加 2显示更新
    showStatus: 0 | 1 | 2
}

export default class Category extends Component<Prop, State>
{
    columns = null
    categroy: ICategory = null
    updateForm = React.createRef<UpdateForm>()
    addForm = React.createRef<AddForm>()

    initColums()
    {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                dataIndex: '',
                key: 'age',
                render: (category) =>
                {
                    return (
                        <span>
                            <LinkButton onClick={() =>
                            {
                                this.categroy=category
                                this.setState({
                                    showStatus: 2
                                })
                            }}>修改分类</LinkButton>
                            {this.state.parentId === "0" ?
                                <LinkButton onClick={() =>
                                {
                                    //console.log(category);
                                    this.showSubCategroy(category)
                                }}>查看子分类</LinkButton>
                                :
                                null}
                        </span>
                    )
                }
            },
        ];
    }

    async getCategory(parentId?:string)
    {
        this.setState({ loading: true })
        let id= parentId||this.state.parentId
        let result = await reqCategorys(id);
        this.setState({ loading: false })
        if (result && result.status === 0)
        {
            if (this.state.parentId === '0')
            {
                this.setState({
                    categorys: result.data
                })
            }
            else
            {
                this.setState({
                    subCategroys: result.data
                })
            }

        }
        else
        {
            message.error("获取分类列表数据失败")
        }
    }

    showSubCategroy(category)
    {
        //更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () =>
        {
            //console.log(this.state.parentId);

            this.getCategory()
        })
    }

    constructor(props)
    {
        super(props)
        this.state = {
            categorys: [],
            subCategroys: [],
            loading: false,
            parentId: '0',
            parentName: '',
            showStatus: 0
        }
    }

    componentWillMount()
    {
        this.initColums()
    }

    componentDidMount()
    {
        this.getCategory()
    }


    render()
    {



        //card的左侧标题
        let title = this.state.parentId === '0' ? "一集分类列表" : (
            <span>
                <LinkButton onClick={() =>
                {
                    this.setState({
                        parentId: '0',
                        parentName: '',
                        subCategroys: []
                    })
                }}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{ marginRight: 5 }} />
                <span>{this.state.parentName}</span>
            </span>
        )

        //card的右侧
        let extra = (
            <Button type="primary" icon={<PlusOutlined />} onClick={() =>
            {
                this.setState({ showStatus: 1 })
            }}>
                添加
            </Button>
        )



        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={this.state.parentId === '0' ? this.state.categorys : this.state.subCategroys}
                    columns={this.columns}
                    bordered
                    loading={this.state.loading}
                    rowKey='_id'
                    pagination={{ defaultPageSize: 10, pageSizeOptions: ["5", "10", "20"], showSizeChanger: true, showQuickJumper: true }}
                />

                {/* 添加分类 */}
                <Modal
                    title="添加分类"
                    destroyOnClose={true}
                    visible={this.state.showStatus === 1}
                    onOk={async () =>
                    {
                        //隐藏确认框
                        this.setState({
                            showStatus: 0
                        })

                        let values = this.addForm.current.formRef.current.getFieldsValue()
                        console.log(values);

                        let result = await reqAddCategory(values.categoryName, values.parentId)
                        if (result&&result.status===0) {
                            this.getCategory()
                        }
                        else
                        {
                            message.error(result.msg)
                        }
                        
                    }}
                    onCancel={() =>
                    {
                        this.setState({
                            showStatus: 0
                        })
                    }}
                >
                    <AddForm ref={this.addForm} parentId={this.state.parentId} categorys={this.state.categorys}/>

                </Modal>

                {/* 修改分类 */}
                <Modal
                    title="修改分类"
                    visible={this.state.showStatus === 2}
                    destroyOnClose={true}
                    onOk={async () =>
                    {

                        try {
                            await this.updateForm.current.formRef.current.validateFields()
                            
                        } catch (error) {
                            return
                        }                        

                        //隐藏确认框
                        this.setState({
                            showStatus: 0
                        })

                        //发送请求
                        console.log(this.categroy._id);
                        console.log(this.updateForm.current.formRef.current.getFieldsValue());
                        
                        await reqUpdateCategory(this.categroy._id,"sdfsdf")


                        //更新列表
                    }}
                    onCancel={() =>
                    {
                        this.setState({
                            showStatus: 0
                        })
                    }}
                >
                    <UpdateForm ref={this.updateForm} categoryName={this.categroy?this.categroy.name:null}/>

                </Modal>
            </Card>
        )
    }
}