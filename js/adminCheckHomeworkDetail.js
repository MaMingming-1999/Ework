//获取变量
var id = JSON.parse(localStorage.getItem('admin')).id;
var token = JSON.parse(localStorage.getItem('admin')).token;
var type = JSON.parse(localStorage.getItem('admin')).type;
var userName = JSON.parse(localStorage.getItem('admin')).userName;

//找到链接的groupCode
function parseUrl(){
    var url=location.href;
    var i=url.indexOf('?');
    if(i===-1)return;
    var querystr=url.substr(i+1);
    var arr1=querystr.split('&');
    var arr2=new Object();
    for  (i in arr1){
        var ta=arr1[i].split('=');
        arr2[ta[0]]=ta[1];
    }
    return arr2;
}
var v = parseUrl();
var demandId = v['demandId'];
var groupId = v['groupId'];
//显示作业信息
    $(function() {
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-demand/detail',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "demandId": demandId,
                "id": id,
                "token": token,
                "type": type,
            }),
            //返回值类型
            dataType: 'json',
            //成功的回调函数
            success: function (data) {
                if (data.code === 1) {
                    alert(data.msg);
                    console.log(data);
                } else {
                    var deadline = ''
                    var fileUrl = ''
                    var status = ''
                    if(data.data.endTime == null){
                        deadline = '--'
                    }
                    if(data.data.appendixUrl == null){
                        fileUrl = '--'
                    }
                    if(data.data.status===110||data.data.status===120){
                        status = '已发布'
                    } else if (data.data.status===10||data.data.status===20)
                    {
                        status = '未发布'
                    }
                    $('#homeworkTitle').append(data.data.title);
                    $('#homeworkDescription').append(data.data.description);
                    $('#homeworkDeadline').append(deadline);
                    $('#homeworkStatus').append(status);
                    $('#homeworkUrl').append(fileUrl);
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
})

//返回列表
function returnCheck() {
    layui.use('layer',function() {
        var layer = layui.layer;
        window.location.href = '../en/adminCheckHomeworkList.html';
    })
}

//撤回
function backSubmit() {
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-demand/withdraw',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "demandId": demandId,
                "id": id,
                "token": token,
                "type": type,
            }),
            //返回值类型
            dataType: 'json',
            //成功的回调函数
            success: function (data) {
                if (data.code === 1) {
                    alert(data.msg);
                    console.log(data);
                } else {
                   alert('您已撤回'+data.data.title);
                   window.location.href = '../en/adminCheckHomeworkList.html'
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
}

//删除
function deleteHomework(){
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-demand/delete',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "demandId": demandId,
                "id": id,
                "token": token,
                "type": type,
            }),
            //返回值类型
            dataType: 'json',
            //成功的回调函数
            success: function (data) {
                if (data.code === 1) {
                    alert(data.msg);
                    console.log(data);
                } else {
                    alert('您已删除'+data.data.title);
                    window.location.href = '../en/adminCheckHomeworkList.html'
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
}

//发布
function submitHomework() {
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-demand/delete',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "demandId": demandId,
                "endTime": $('#homeworkDeadline').val,
                "groupId": groupId,
                "id": id,
                "startTime": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "token": token,
                "type": type,
            }),
            //返回值类型
            dataType: 'json',
            //成功的回调函数
            success: function (data) {
                if (data.code === 1) {
                    alert(data.msg);
                    console.log(data);
                } else {
                    alert('您已删除'+data.data.title);
                    window.location.href = '../en/adminCheckHomeworkList.html'
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })

}