import React, { Component } from 'react'
import ajax from '../../api/ajax'

import axios from 'axios'

export default class User extends Component
{


    async componentDidMount()
    {
        console.log(process.env.NODE_ENV);
        
        // let result = await axios.post('/api/login/account')
        // console.log(result.data);

        
        let result2 = await ajax('/api/user')
        console.log(result2);

    }

    render()
    {

        return (
            <div>User</div>
        )
    }
}