import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'

import { Menu } from 'antd';

import menuList,{IMenuList} from '../../config/menuConfig'


import "./left-nav.less"
import logo from '../../assets/images/logo.png'
import { RouteComponentProps } from 'react-router-dom'

const { SubMenu } = Menu;

interface Props extends RouteComponentProps {
  
}

interface States
{
    
}

class LeftNav extends Component<Props,States>
{

    menuNodes: React.ReactElement[] = [];

    /**
     * @description: 
     * @param {type} 
     * @return: 
     */
    getMenuNodes(menuList:IMenuList[],frontKey:string='')
    {
        return menuList.map(item =>
        {
            let key = frontKey + item.key;
            if (!item.children)
            {
               
                return (
                    <Menu.Item key={key} icon={React.createElement(item.icon)} >
                        <Link to={key}>
                            <span>{item.title+key}</span>
                        </Link>
                    </Menu.Item>
                )
            } else
            {   
                return (
                    <SubMenu key={key} icon={React.createElement(item.icon)} title={item.title+key}>
                        {this.getMenuNodes(item.children,key)}
                    </SubMenu>
                )
            }
            
            
        })
    }

    constructor(prop: Props)
    {
        super(prop)
        this.menuNodes = this.getMenuNodes(menuList)
    }

    

    render()
    {
        let path = this.props.location.pathname;
        var index = path.lastIndexOf("/");
        let openKey = path.substring(0, index);

        return (
            <div className="left-nav">
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {this.menuNodes||null}
                    
                    {/* <Button style={{ alignSelf: 'center', }} onClick={() =>
                    {
                        console.log(typeof PieChartOutlined);
                        
                    }}>111</Button> */}

                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)