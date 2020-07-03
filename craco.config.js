/*
 * @Author: your name
 * @Date: 2020-06-21 23:35:35
 * @LastEditTime: 2020-07-03 20:34:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-admin_client\craco.config.js
 */ 
/* craco.config.js */

const CracoLessPlugin = require('craco-less');
const CracoAntDesignPlugin = require("craco-antd");

// const apiMocker = require('mocker-api')
// const path = require('path');
// const { runInNewContext } = require('vm');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        //modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
        { plugin: CracoAntDesignPlugin }
    ],
    // devServer: {
    //     //before: require('./mock/index')
    //     before(app)
    //     {
    //         apiMocker(app, path.resolve('./mock/index.js'), {
                
    //         })
    //     }
    // }
};