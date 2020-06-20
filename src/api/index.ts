
import jsonp from 'jsonp'
import { message } from 'antd'
import ajax from './ajax'

const BASE =''

//登录
export const reqLogin = (username: string, password: string) => ajax(BASE+'/login',{username,password},'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE + 'manage/user/add', user, 'POST')

//获取一级/二级分类列表
export const reqCategorys = (parentId:string) => ajax(BASE + '/manage/category/list', { parentId: parentId},'GET')
//添加分类
export const reqAddCategory = (categoryName:string, parentId:string) => ajax(BASE +"/manage/category/add",{categoryName,parentId},'POST')
//更新分类
export const reqUpdateCategory = (categoryName: string, categoryId: string) => ajax(BASE + "/manage/category/add", { categoryId, categoryName }, 'POST')

//jsonp请求天气
export const reqWeather = (city: string) =>
{
    return new Promise<{ dayPictureUrl:string, weather:string}>((resolve, reject) =>
    {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url, {}, (err, data) =>
        {
            
            if (!err && data.status === 'success')
            {
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather})
            }
            else
            {
                message.error("获取天气信息失败!")
            }
        })
    })

}
