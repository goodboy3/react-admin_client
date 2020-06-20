export interface IUser
{
    _id: string;
    password: string;
    username: string;
    create_time: number;
    __v: number;
    role:{menus:string[]}
}

export class MemoryUtils
{
    static user:IUser
}

