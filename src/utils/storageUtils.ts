import { IUser } from './memoryUtils'
import store from 'store'

const USER_KEY = 'user_key'

export class StorageUtils
{
    static saveUser(user: IUser)
    {
        
        store.set(USER_KEY,user)
    }

    static getUser(): IUser
    {
        let user = store.get(USER_KEY);
        if (user)
        {
            return user
        }
        return null;
    }

    static delUser()
    {
        store.remove(USER_KEY)
    }
}