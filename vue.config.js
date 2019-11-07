module.exports = {

    devServer: {
        host: '0.0.0.0',
        before(app){
            app.get('/aaaa', (req, res) => {
                res.json({code: 1})
            })
            require('./mock')(app)
        }
    }
    

}