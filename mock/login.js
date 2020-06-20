module.exports = {
    'POST /login': (req, res) =>
    {
        const { password, username } = req.body;  
        //管理员登录
        if (password === 'admin' && username === 'admin')
        {
            return res.json({
                status: 0,
                data: {
                    _id: '5c3b297dea95883f340178b0',
                    password: '21232f297a57a5a743894a0e4a801fc3',
                    username: 'admin',
                    create_time: 1547381117891,
                    __v: 0,
                    role: {
                        menus:[]
                    }
                }
            });
        }
        else if (password === 'test' && username === 'test')
        {
            return res.json({
                status: 1,
                msg: '用户名或者密码不正确!'
            });
        }
        else
        {
            return res.json({
                status: 1,
                msg: '用户名或者密码不正确!'
            });
        }
    },
}



