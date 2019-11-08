
function sendData(res, data = { }){
    res.json({code: 1, msg: '', ...data})
}

module.exports = (app) => {


    app.post('/login', (req, res) => {
        let data = [];
        req.on('data', d => {
            data += d;
        })
        req.on('end', () => {
            sendData(res, {
                auth: [{
                    path: 'table',
                },
                {
                    path: 'form',
                },
                {
                    path: 'rxjs'
                },
                {
                    path: 'test',
                    children: [
                        {
                            path: 'test1',
                        },
                        {
                            path: 'test3',
                        },
                    ]
                }]
            })
        })
    })

    app.get('/tableData', (req, res) => {
        sendData(res, {
            data: Array(req.query.length?parseInt(req.query.length):5).fill({
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }),
            total: 200
        })
    })
    app.post('/getUserInfo', (req, res) => {
        sendData(res, {
            data: {
                name: '张三',
                age: 15,
                gender: 0,
                id: 1
            }
        })
    })
    app.post('/getUserPeople', (req, res) => {
        sendData(res, {
            data: [
                { name: '李四', age: 15, gender: 0, id: 2 },
                { name: '王五', age: 21, gender: 1, id: 3 },
                { name: '赵六', age: 32, gender: 0, id: 4 }
            ],
        })
    })
    app.post('/getUserSchool', (req, res) => {
        sendData(res, {
            data: {
                id: 1,
                name: '北京大学'
            }
        })
    })
    app.post('/getUserGrade', (req, res) => {
        sendData(res, {
            data: {
                id: 1,
                name: '三年二班'
            }
        })
    })

    

}