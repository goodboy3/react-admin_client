/* craco.config.js */

const CracoLessPlugin = require('craco-less');
const CracoAntDesignPlugin = require("craco-antd");
const apiMocker = require('mocker-api')
const path = require('path');
const { runInNewContext } = require('vm');

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