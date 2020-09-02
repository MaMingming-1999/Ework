//获取变量
var id = JSON.parse(localStorage.getItem('student')).id;
var token = JSON.parse(localStorage.getItem('student')).token;
var type = JSON.parse(localStorage.getItem('student')).type;
var userName = JSON.parse(localStorage.getItem('student')).userName;
var fileUrl = 0;

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
                    $('#lay-stu-url').append(data.data.appendixUrl);
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
})

//保存
function saveHomework() {
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-submit/complete',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "appendixUrl1": fileUrl,
                "appendixUrl2": 0,
                "appendixUrl3": 0,
                "appendixUrl4": 0,
                "appendixUrl5": 0,
                "id": id,
                "submitId": submitId,
                "text": $("#lay-stu-text").val(),
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
                    alert("作业保存成功");
                    window.location.href='../en/studentCheckHomeworkList.html';
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
}

//上传
function uploadDoc() {
    var formData = new FormData();
    formData.append('file',$("#file")[0].files[0]);
    console.log(formData)
    $.ajax({
        url:'http://localhost:8081/ework/file-submit/uploadFile',
        data:formData,
        type:"POST",
        processData:false,
        contentType:false,
        dataType:"JSON",
        mimeType:"multipart/form-data",
        success:function (result) {
            if(result.data.url===0){
                alert("null");
            }else {
                fileUrl = result.data.url;
                console.log(result.data.url);
                alert("成功");
            }
        },
        error: function (e) {
            console.log(e);
        }
    })
}
