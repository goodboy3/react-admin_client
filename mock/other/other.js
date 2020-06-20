module.exports = {
    'GET /api/:owner/:repo/raw/:ref/(.*)': (req, res) =>
    {
        const { owner, repo, ref } = req.params;
        // http://localhost:8081/api/admin/webpack-mock-api/raw/master/add/ddd.md
        // owner => admin
        // repo => webpack-mock-api
        // ref => master
        // req.params[0] => add/ddd.md
        return res.json({
            id: 1,
            owner, repo, ref,
            path: req.params[0]
        });
    },
}