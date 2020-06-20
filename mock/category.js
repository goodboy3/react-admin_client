module.exports = {
    'GET /manage/category/list': (req, res) =>
    {
        let parentId = req.query.parentId
        console.log(parentId)

        if (parentId==0) {
            let datas = []
            for (let i = 0; i < 30; i++)
            {
                let iStr = i.toString()
                if (i < 10)
                {
                    iStr = '0' + iStr
                }
                let data = {
                    parentId: 0,
                    _id: '5ca9d695b49ef916541160' + iStr,
                    name: '一级分类' + iStr,
                    __v: 0
                }
                datas.push(data);
            }

            res.json({
                status: 0,
                data: datas
            })
        }
        else
        {
            let datas = []
            for (let i = 0; i < 10; i++)
            {
                let iStr = i.toString()
                if (i < 10)
                {
                    iStr = '0' + iStr
                }
                let data = {
                    parentId: parentId,
                    _id: '9999d695b49ef916541160' + iStr,
                    name: '二级分类' + iStr,
                    __v: 0
                }
                datas.push(data);
            }

            res.json({
                status: 0,
                data: datas
            })
        }
        
    },


    "POST /manage/category/add": (req, res) =>
    {
        const { categoryName, parentId } = req.body;

        res.json('ok')
    },

    "POST /manage/category/update": (req, res) =>
    {
        const { categoryName, categoryId } = req.body;

        res.json('ok')
    },
}