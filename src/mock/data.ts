
const commonSendData = (data?: any) => {
    return {code: 1, msg: '', ...data}
}
export const formatData = {
    '/getArticleList'(data: any){

    }
}
export default new Map([
    ['/login',commonSendData({
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
            path: 'list'
        },
        {
            path: 'rich-text'
        },
        {
            path: 'tool'
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
    })],
    ['/qiniu-token', commonSendData({
        data: {
            token: 'daw58sd85s7e85f7sde5f72137238v',
            url: 'https://public-img.xxx.com/xxxxxxxxxxxxxxx'
        }
    })],
    ['/getArticleList', commonSendData({
        data: Array(5).fill({
            id: 1,
            name: '这是一篇文字',
            date: new Date().getTime(),
            ready: 20,
            like: 18,
            address: '上海市普陀区金沙江路 1518 弄'
        }),
        total: 200
    })],
    ['/tableData', commonSendData({
        data: Array(5).fill({
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }),
        total: 200
    })],
    ['/getUserInfo',  commonSendData({
        data: {
            name: '张三',
            age: 15,
            gender: 0,
            id: 1
        }
    })],
    ['/getUserPeople',  commonSendData({
        data: [
            { name: '李四', age: 15, gender: 0, id: 2 },
            { name: '王五', age: 21, gender: 1, id: 3 },
            { name: '赵六', age: 32, gender: 0, id: 4 }
        ]
    })],
    ['/getUserSchool',  commonSendData({
        data: {
            id: 1,
            name: '北京大学'
        }
    })],
    ['/getUserGrade',  commonSendData({
        data: {
            id: 1,
            name: '三年二班'
        }
    })],
    ['/echart-demo1',  commonSendData({
        data: {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:['利润', '支出', '收入']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'value'
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    axisTick : {show: false},
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            series : [
                {
                    name:'利润',
                    type:'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data:[200, 170, 240, 244, 200, 220, 210]
                },
                {
                    name:'收入',
                    type:'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data:[320, 302, 341, 374, 390, 450, 420]
                },
                {
                    name:'支出',
                    type:'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'left'
                        }
                    },
                    data:[-120, -132, -101, -134, -190, -230, -210]
                }
            ]
        }
    })],
    ['/echart-demo2',  commonSendData({
        data: {
            title: {
                top: '45%',
                left: 'center',
                text: "今日完成进度",
                textStyle: {
                    color: '#fff',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 14
                },
                subtextStyle: {
                    color: '#fff',
                    fontSize: 12
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function(res: any) {
                    if (res.componentSubType == 'liquidFill') {
                        return res.seriesName + ': ' + (res.value * 10000 / 100).toFixed(2) + '%';
                    } else {
                        return '<span class="ii" style="background:' + res.color + ' "></span>' + res.name + ':<br/> ' + res.data.value;
                    }
                }
            },
            series: [{
                    type: 'liquidFill',
                    itemStyle: {
                        normal: {
                            opacity: 0.4,
                            shadowBlur: 0,
                            shadowColor: 'blue'
                        }
                    },
                    name: "今日完成进度",
                    data: [{
                        value: 0.6,
                        itemStyle: {
                            normal: {
                                color: '#53d5ff',
                                opacity: 0.6
                            }
                        }
                    }],
                  //  background: '#fff',
                    color: ['#53d5ff'],
                    center: ['50%', '50%'],
                  /*  backgroundStyle: {
                        color: '#fff'
                    },*/
                    label: {
                        normal: {
                            formatter: '',
                            textStyle: {
                                fontSize: 12
                            }
                        }
                    },
                    outline: {
                        itemStyle: {
                            borderColor: '#86c5ff',
                            borderWidth: 0
                        },
                        borderDistance: 0
                    }
                },
                {
                    type: 'pie',
                    radius: ['42%', '50%'],
                         color: ['#c487ee', '#deb140','#49dff0', '#034079', '#6f81da', '#00ffb4'],
                    hoverAnimation: false, ////设置饼图默认的展开样式
                    label: {
                        show: true,
                        
                        normal: {
                              formatter: '{b}\n{d}%',
                            show: true,
                            position: ''
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
        
                    itemStyle: { // 此配置
                        normal: {
                            borderWidth: 2,
                            borderColor: '#fff',
                        },
                        emphasis: {
                            borderWidth: 0,
                            shadowBlur: 2,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: [{
                        value: 0.2,
                        name: '装配完成率',
                    },
                    {
                        value: 0.3,
                        name: '班检完成率',
                    },
                    {
                        value: 0.4,
                        name: '初检完成率',
                    },
                    {
                        value: 0.3,
                        name: '复检完成率',
                    },
                    {
                        value: 0.1,
                        name: '出厂检完成率',
                    },
                ]
                }
            ]
        }
    })],
    ['/ckeditor-content',  commonSendData({
        data: `<p>dawdaw</p><figure class="easyimage easyimage-no-gradient easyimage-align-right"><img alt="" width="200" src="/c6sdf87sd.jpg" /><figcaption></figcaption></figure><p><strong>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</strong></p><p>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p><p>啊啊啊啊啊<u>啊啊啊啊啊啊啊啊啊</u>啊啊啊啊啊</p><blockquote><p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p></blockquote>`,
        type: 'ckeditor'
    })],
    ['/md-content',  commonSendData({
        data: '# Hello,world',
        type: 'md'
    })]
])
