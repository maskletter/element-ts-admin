
module.exports = {

    
  publicPath: './',

    configureWebpack: {
        externals: {
            "vue": "Vue",
            "echarts": "echarts",
            "cropperjs": "Cropper",
            "simplemde": "SimpleMDE",
            "axios": "axios",
            "element-ui": "ELEMENT"
        },
        resolve: {
            alias: {
            }
        }
    },

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