
import
{
    PieChartOutlined,
    DesktopOutlined,
} from '@ant-design/icons';



export interface IMenuList
{
    title:string
    key: string,
    icon: any
    children?:IMenuList[]
}

const menuList: IMenuList[] = [
    {
        title: '首页',
        key: '/home',
        icon: PieChartOutlined,
    },
    {
        title: '商品',
        key: '/products',
        icon: DesktopOutlined,
        children: [
            {
                title: '品类管理',
                key: '/category',
                icon: DesktopOutlined,
            },
            {
                title: '商品管理',
                key: '/product',
                icon: DesktopOutlined,
            },
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: PieChartOutlined,
    },
    {
        title: '角色管理',
        key: '/role',
        icon: PieChartOutlined,
    },
    {
        title: '图形图表',
        key: '/charts',
        icon: DesktopOutlined,
        children: [
            {
                title: '柱形图',
                key: '/bar',
                icon: DesktopOutlined,
            },
            {
                title: '折线图',
                key: '/line',
                icon: DesktopOutlined,
            },
            {
                title: '饼图',
                key: '/pie',
                icon: DesktopOutlined,
            },
        ]
    },
]

export default menuList;