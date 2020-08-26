//获取全局变量
var id = JSON.parse(localStorage.getItem('student')).id;
var token = JSON.parse(localStorage.getItem('student')).token;
var type = JSON.parse(localStorage.getItem('student')).type;
var userName = JSON.parse(localStorage.getItem('student')).userName;

//安全退出
function exitLogin() {
$.ajax({
    //接口地址
    url:'http://localhost:8081/ework/user/quit',
    //请求方式post/get
    type:'post',
    contentType:'application/json',
    //数据
    data:JSON.stringify({
        'id':id,
        'token':token,
        'type':type,
    }),
    //返回值类型
    dataType:'json',
    //成功的回调函数
    success:function (data) {
        if(data.code===1) {
            alert(data.msg);
        } else{
            alert(userName + ',' + data.data.topic);
            window.location.href = '../en/studentLogin.html';
        }

    },
    //失败的回调函数
    error:function (e) {
        console.log(e);
    }
})
}
//注销账号
function logout(){
    layui.use('layer', function(){
        var layer = layui.layer;
            layer.confirm('您即将注销账号，此操作不可恢复，您确认要注销账号吗？', {
                btn: ['确认注销','取消'] //按钮
            }, function(){
                layer.msg('注销成功', {icon: 1});
                window.location.href='../en/studentLogin.html';
            }, function(){
                layer.msg('取消注销', {
                    time: 2000, //2s后自动关闭
                });
            });
    })
}

//显示用户名
$(function () {
    $('#showUserName').text(userName);
})



//小组查询
$('#btnSubmit').click(function(){ layui.use('layer', function(){
    var layer = layui.layer;
    var visitedString = $('#visitedString').val();
    if(visitedString!==''){
        layer.confirm('您即将加入的小组信息是:', {
            btn: ['确认加入','取消'] //按钮
        }, function(){
            layer.msg('加入成功', {icon: 1});
        }, function(){
            layer.msg('取消加入', {
                time: 2000, //2s后自动关闭
            });
        });
    } else {
        layer.msg('输入不能为空',{icon:2});
    }
})
});




layui.use(['form','element','layer'], function(){
    var element = layui.element;
    var form = layui.form;
    var layer = layui.layer;

})