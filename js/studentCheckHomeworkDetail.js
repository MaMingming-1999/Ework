//获取变量
var id = JSON.parse(localStorage.getItem('student')).id;
var token = JSON.parse(localStorage.getItem('student')).token;
var type = JSON.parse(localStorage.getItem('student')).type;
var userName = JSON.parse(localStorage.getItem('student')).userName;
var textUrl = '';
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
var submitId = v['submitId'];

//返回列表
function returnCheck() {
    layui.use('layer',function() {
        var layer = layui.layer;
        window.location.href = '../en/studentCheckHomeworkList.html';
    })
}

//显示作业详情
$(function() {
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-submit/detail',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "submitId": submitId,
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
                    $('#lay-stu-title').append(data.data.title);
                    $('#lay-stu-description').append(data.data.description);
                    $('#lay-stu-text').append(data.data.text);
                    if(data.data.appendixUrl1===null){
                        $('#lay-stu-url').append("无附件");
                    } else {
                        textUrl = data.data.appendixUrl1;
                        $('#download').append("下载");
                    }
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
})
//下载需求
function downloadFileSubmit() {
    $('#download').attr('href',textUrl);
}
//退回作业
function backHomework(){
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-submit/withdraw',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "submitId": submitId,
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
                    alert('您已撤回作业：'+data.data.title);
                    window.location.href = '../en/studentCheckHomeworkList.html'
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
}

//提交作业
function submitHomework(){
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-submit/submit',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "submitId": submitId,
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
                    alert('您已提交作业：'+data.data.title);
                    window.location.href = '../en/studentCheckHomeworkList.html'
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
}