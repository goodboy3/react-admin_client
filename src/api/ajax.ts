
import axios, { AxiosResponse } from 'axios'
import { message } from 'antd'


export default async function ajax(url: string, data = {}, type: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'GET')
{
    let promise: Promise<AxiosResponse<any>> = null
    switch (type)
    {
        case 'GET':
            promise = axios.get(url, { params: data })
            break;
        case 'POST':
            promise = axios.post(url, data)
            break;
        case 'PUT':
            promise = axios.put(url, data)
            break;
        case 'DELETE':
            promise = axios.delete(url, data)
            break;
        // default:
        //     promise = axios.get(url, { params: data })
        //     break;
    }

    // let dispatchTimeout = null;
    // let timeoutPromise = new Promise((resolve, reject) =>
    // {
    //     dispatchTimeout = () =>
    //     {
    //         reject('请求超时')
    //         message.error('请求超时') 
    //     }
    // })
    // setTimeout(() =>
    // {
    //     dispatchTimeout();
    // }, 6000);
    let timeout = new Promise((resolve, reject) =>
    {
        setTimeout(() => {
            reject('请求超时')
        }, 8000);
    })


    let requestPromise = new Promise((resolve, reject) =>
    {
        promise.then(response =>
        {
            resolve(response.data)
        }).catch(error =>
        {
            console.log(error);
            reject(error)
        })
    })

    try {
        let result = await Promise.race([requestPromise, timeout])
        return result as {status:number,data?:any,msg?:any}
    } catch (error)
    {
        console.log(error);
        message.error(error.toString())
        return null
    }
    
    

    // return new Promise((resolve, reject) =>
    // {
    //     promise.then(response =>
    //     {
    //         resolve(response.data)
    //     }).catch(error =>
    //     {
    //         message.error(error)   
    //     })
    // })


}