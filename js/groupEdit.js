//获取变量
var id = JSON.parse(localStorage.getItem('admin')).id;
var token = JSON.parse(localStorage.getItem('admin')).token;
var type = JSON.parse(localStorage.getItem('admin')).type;
var userName = JSON.parse(localStorage.getItem('admin')).userName;

//layui格式：element & layer & form & table
layui.use(['form','element','layer','table'], function(){
    var element = layui.element;
    var form = layui.form;
    var layer = layui.layer;
    var table = layui.table;
})

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
var groupId = v['groupId']
console.log(groupId)


//编辑小组信息
function changeGroup() {
    layui.use('layer',function() {
        var layer = layui.layer;
        var groupName = $('#layui-group-name').val();
        var description = $('#layui-text').val();
        var groupCode = $('#layui-code').val();
        var status =  $("#checkbox-text").val();
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/group-info/change',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "description": description,
                "groupCode": groupCode,
                "groupId": groupId,
                "groupName": groupName,
                "id": id,
                "status": status,
                "token": token,
                "type": type,
            }),
            //返回值类型
            dataType: 'json',
            //成功的回调函数
            success: function (data) {
                if (data.code === 1) {
                    console.log(status);
                    alert(data.msg);

                } else {
                    alert('修改信息成功！');
                    window.location.href='../en/adminCheckGroup.html'
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
}