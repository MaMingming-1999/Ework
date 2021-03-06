//获取变量
var id = JSON.parse(localStorage.getItem('student')).id;
var token = JSON.parse(localStorage.getItem('student')).token;
var type = JSON.parse(localStorage.getItem('student')).type;
var userName = JSON.parse(localStorage.getItem('student')).userName;

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

//显示小组信息
$(function() {
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/group-info/detail',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                groupCode: '',
                groupId: "",
                id: groupId,
            }),
            //返回值类型
            dataType: 'json',
            //成功的回调函数
            success: function (data) {
                if (data.code === 1) {
                    alert(data.msg);
                    console.log(data);
                } else {
                    console.log(data);
                    var groupStatus = data.data.status;
                    $('#lay-stu-group-name').append(data.data.groupName);
                    $('#lay-stu-group-adm').append(data.data.createAdminName);
                    $('#lay-stu-group-visited').append(data.data.groupCode);
                    $('#lay-stu-group-description').append(data.data.descriptions);
                    if(groupStatus===10) {
                        $('#lay-stu-group-status').append('未开放加入');
                    } else if (groupStatus===20) {
                        $('#lay-stu-group-status').append('只允许管理员加入');
                    } else if (groupStatus===30) {
                        $('#lay-stu-group-status').append('只允许学生加入');
                    } else if (groupStatus===40) {
                        $('#lay-stu-group-status').append('允许学生和管理员加入');
                    } else if (groupStatus===80) {
                        $('#lay-stu-group-status').append('已停用');
                    } else if (groupStatus===100) {
                        $('#lay-stu-group-status').append('已删除');
                    } else {
                        $('#lay-stu-group-status').append('系统异常，请咨询平台');
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