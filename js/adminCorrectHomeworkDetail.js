//获取变量
var id = JSON.parse(localStorage.getItem('admin')).id;
var token = JSON.parse(localStorage.getItem('admin')).token;
var type = JSON.parse(localStorage.getItem('admin')).type;
// var userName = JSON.parse(localStorage.getItem('admin')).userName;

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
var submitId = v['submitId']

//返回列表
function returnCheck() {
    layui.use('layer',function() {
        var layer = layui.layer;
        window.location.href = '../en/adminHomeworkCorrecting.html';
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
                    var fileUrl = '';
                    if(data.data.appendixUrl == null){
                        fileUrl = '无附件'
                    }
                    $('#homeworkTitle').append(data.data.title);
                    $('#homeworkDescription').append(data.data.description);
                    $('#homeworkStudentId').append(data.data.studentId);
                    $('#homeworkText').append(data.data.text);
                    $('#homeworkUsername').append(data.data.userName);
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

//退回作业
function returnHomework(){
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-submit/returnWork',
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
                    alert('您已退回'+data.data.userName+'的作业：'+data.data.title);
                    window.location.href = '../en/adminHomeworkCorrecting.html'
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
}

//重判作业
function recorrectHomework(){
    layui.use('layer',function() {
        var layer = layui.layer;
        var score = $('#scoreCorrect').val();
        if(score>100||score<0){
            layer.msg("您输入的成绩不符合规范！",{icon:2})
        } else{
            $.ajax({
                //接口地址
                url: 'http://localhost:8081/ework/work-submit/recorrect',
                //请求方式post/get
                type: 'post',
                contentType: 'application/json',
                //数据
                data: JSON.stringify({
                    "comment": $('#commentCorrect').val(),
                    "id": id,
                    "score": score,
                    "submitId": submitId,
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
                        alert('您已重新批改'+data.data.userName+'的作业：'+data.data.title);
                        window.location.href = '../en/adminHomeworkCorrecting.html'
                    }
                },
                //失败的回调函数
                error: function (e) {
                    console.log(e);
                }
            })
        }
    })
}

//批改作业
function correctHomework(){
    layui.use('layer',function() {
        var layer = layui.layer;
        var score = $('#scoreCorrect').val();
        if(score>100||score<0){
            layer.msg("您输入的成绩不符合规范！",{icon:2})
        } else{
            $.ajax({
                //接口地址
                url: 'http://localhost:8081/ework/work-submit/correct',
                //请求方式post/get
                type: 'post',
                contentType: 'application/json',
                //数据
                data: JSON.stringify({
                    "comment": $('#commentCorrect').val(),
                    "id": id,
                    "score": score,
                    "submitId": submitId,
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
                        alert('您已成功批改'+data.data.userName+'的作业：'+data.data.title);
                        window.location.href = '../en/adminHomeworkCorrecting.html'
                    }
                },
                //失败的回调函数
                error: function (e) {
                    console.log(e);
                }
            })
        }
    })
}