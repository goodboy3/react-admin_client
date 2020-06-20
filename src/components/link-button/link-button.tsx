import React, { Component } from 'react'
import './link-button.less'

interface Props  
{
    onClick?:()=>void
}

interface States
{

}

export default class LinkButton extends Component<Props, States>
{

    render()
    {
        
        return (
            <button {...this.props} className='link-button' />
        )
    }
}

