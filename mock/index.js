const fs = require('fs')
const path = require('path')

let mockData={}

function readMockDir(dir)
{
    let dirs = fs.readdirSync(dir)
   
    dirs.forEach(file =>
    {
        let _path = path.join(dir, file)
        let isDirectory = fs.statSync(_path).isDirectory()
        if (isDirectory) {
            readMockDir(_path)
        }
        else
        {
            Object.assign(mockData,require(_path))
        }
    })
}

readMockDir(path.join(__dirname))
//console.log(mockData);




// module.exports = function (app)
// {
//     //return;


//     for (let key in mockData)
//     {
//         let _key = key.replace(/(^\s*)|(\s*$)/g, '')
//         //console.log(_key);
//         let _method = 'get'
//         let _url = _key.replace(/^(get|post|put|delete)\s*/i, function (rs, $1)
//         {
//             _method = $1.toLowerCase();
//             return '';
//         })


//         if (typeof mockData[key] !='function') {
//             app[_method](_url, (req, res) =>
//             {
//                 let timeout = (Math.random() * 2800) + 200
//                 //console.log(timeout);
                
//                 setTimeout(() => {
//                     res.json(mockData[key])
//                 }, timeout);
                
//             })
//         }
//         else
//         {
//             app[_method](_url, mockData[key])
//         }
        
//     }
// }

const proxy = {
    // Priority processing.
    // apiMocker(app, path, option)
    // This is the option parameter setting for apiMocker
    _proxy: {
        // proxy: {
        //     // Turn a path string such as `/user/:name` into a regular expression.
        //     // https://www.npmjs.com/package/path-to-regexp
        //     // '/repos/(.*)': 'https://api.github.com/',
        // },
        // // rewrite target's url path. Object-keys will be used as RegExp to match paths.
        // // https://github.com/jaywcjlove/mocker-api/issues/62
        // pathRewrite: {
        //     '^/api/repos/': '/repos/',
        // },
        // changeHost: true,
        // // modify the http-proxy options
        // httpProxy: {
        //     options: {
        //         ignorePath: true,
        //     },
        //     listeners: {
        //         proxyReq: function (proxyReq, req, res, options)
        //         {
        //             console.log('proxyReq');
        //         },
        //     },
        // },
    },
}

Object.assign(proxy, mockData)
console.log(proxy);

const delay = require('mocker-api/lib/delay');
const noProxy = process.env.NO_PROXY === 'true';

module.exports = (noProxy ? {} : delay(proxy, 1500));