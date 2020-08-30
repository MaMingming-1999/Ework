//获取变量
var id = JSON.parse(localStorage.getItem('student')).id;
var token = JSON.parse(localStorage.getItem('student')).token;
var type = JSON.parse(localStorage.getItem('student')).type;
var userName = JSON.parse(localStorage.getItem('student')).userName;
var groupInquiryId=''

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
                $.ajax({
                    //接口地址
                    url:'http://localhost:8081/ework/user/logout',
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
                            alert(userName + ',' + data.data.topic + '感谢您使用Ework系统，再见');
                            window.location.href = '../en/studentLogin.html';
                        }
                    },
                    //失败的回调函数
                    error:function (e) {
                        console.log(e);
                    }
                })
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

//修改昵称和电话号码
function submitChangeInfo(){
    layui.use('layer',function(){
        var layer = layui.layer;
        var layuiNickname = $('#layui-nickname').val();
        var layuiPhone = $('#layui-phone').val();
        if(layuiNickname===''||layuiPhone===''){
            layer.msg('输入不能为空',{icon:2})
        } else if(layuiPhone.length!==11 || !(/^1[3|4|5|7|8][0-9]{9}$/.test(layuiPhone))) {
            layer.msg('输入的电话号码格式不正确',{icon:2})
        } else {
            $.ajax({
                //接口地址
                url:'http://localhost:8081/ework/user/changeDetail',
                //请求方式post/get
                type:'post',
                contentType:'application/json',
                //数据
                data:JSON.stringify({
                    "id": id,
                    "password": "",
                    "phone": layuiPhone,
                    "schoolId": "",
                    "token": token,
                    "type": type,
                    "userName": layuiNickname,
                }),
                //返回值类型
                dataType:'json',
                //成功的回调函数
                success:function (data) {
                    if(data.code===1)
                    {
                        alert(data.msg);
                        console.log(data);
                    } else {
                        alert('修改密码成功！为了保证账号安全，请重新登录！')
                        window.location.href="../en/studentLogin.html"
                    }
                },
                //失败的回调函数
                error:function (e) {
                    console.log(e);
                }
            })
        }
    })
}

//修改密码
function submitChangePassword(){
    layui.use('layer',function(){
        var layer = layui.layer;
        var layuiPassword1 = $('#layui-password1').val();
        var layuiPassword2 = $('#layui-password2').val();
        if(layuiPassword1===''||layuiPassword2===''){
            layer.msg('输入不能为空',{icon:2})
        } else if(layuiPassword2!==layuiPassword1) {
            layer.msg('两次密码输入不一致',{icon:2})
        } else {
            $.ajax({
                //接口地址
                url:'http://localhost:8081/ework/user/changeDetail',
                //请求方式post/get
                type:'post',
                contentType:'application/json',
                //数据
                data:JSON.stringify({
                    "id": id,
                    "password": layuiPassword2,
                    "phone": "",
                    "schoolId": "",
                    "token": token,
                    "type": type,
                    "userName": "",
                }),
                //返回值类型
                dataType:'json',
                //成功的回调函数
                success:function (data) {
                    if(data.code===1)
                    {
                        alert(data.msg);
                        console.log(data);
                    } else {
                        alert('修改信息成功！为了保证账号安全，请重新登录！')
                        window.location.href="../en/studentLogin.html"
                    }
                },
                //失败的回调函数
                error:function (e) {
                    console.log(e);
                }
            })
        }
    })
}


//显示个人信息
$(function () {
    layui.use('layer',function() {
        var layer = layui.layer;

        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/user/detail',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
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
                    var studentStatus=data.data.status;
                    if(data.data.groupId===0){
                        $('#lay-stu-group').append("尚未加入小组")
                    } else {
                        $('#lay-groupCode').append(data.data.groupCode);
                        $('#lay-groupId').append(data.data.groupId);
                        $('#lay-stu-group').append('<a href="../en/inquiryStudentGroupInfo.html?groupId='+
                            data.data.groupId+'" class="layui-href" title="查看小组详细信息">'+data.data.groupName+'</a>');
                    }
                    $('#lay-stu-nickname').append(userName)
                    $('#lay-stu-phone').append(data.data.phone)
                    $('#lay-stu-id').append(data.data.studentId)
                    if(studentStatus===10)
                    {
                        $('#lay-stu-status').append('账号正常');
                    } else if(studentStatus===20) {
                        $('#lay-stu-status').append('当前账号被锁定，请联系平台');
                    } else if(studentStatus===0) {
                        $('#lay-stu-status').append('已注销');
                    } else {
                        $('#lay-stu-status').append('账号异常，请联系平台');
                    }
                }
                return false;
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
})

//查询小组
function inquiryGroup(){
    layui.use('table', function() {
        var table = layui.table;
        var visitedString = $('#visitedString').val();
        if(visitedString!=='')
        {
            $.ajax({
                //接口地址
                url: 'http://localhost:8081/ework/group-info/detail',
                //请求方式post/get
                type: 'post',
                contentType: 'application/json',
                //数据
                data: JSON.stringify({
                    "groupCode": visitedString,
                    "groupId": "",
                    "id": 0,
                }),
                //返回值类型
                dataType: 'json',
                //成功的回调函数
                success: function (data) {
                    if (data.code === 1) {
                       layer.msg(data.msg);
                        console.log(data);
                    } else {
                        groupInquiryId = data.data.id;
                        table.render({
                            elem: '#inquiryTable',
                            cols: [[
                                {field: 'admin', title: '创建者'}
                                , {field: 'code', title: '邀请码'}
                                , {field: 'groupName', title: '小组名'}
                                , {field: 'user', title: '申请人'}
                            ]]
                            , data: [{
                                'admin':data.data.createAdminName,
                                'code':visitedString,
                                'groupName':data.data.groupName,
                                'user':userName,
                            }]
                        });
                    }
                },
                //失败的回调函数
                error: function (e) {
                    console.log(e);
                }
            })
        } else {
            layer.msg("请输入邀请码",{icon:5});
        }

    })
}
//加入小组
function joinGroup(){
    layui.use('layer',function() {
        var layer = layui.layer;
        if(groupInquiryId!=='')
        {
            $.ajax({
                //接口地址
                url: 'http://localhost:8081/ework/user/joinGroup',
                //请求方式post/get
                type: 'post',
                contentType: 'application/json',
                //数据
                data: JSON.stringify({
                    "groupId": groupInquiryId,
                    "id": id,
                    "token": token,
                    "type": type,
                }),
                //返回值类型
                dataType: 'json',
                //成功的回调函数
                success: function (data) {
                    if (data.code === 1) {
                        layer.msg(data.msg);
                        console.log(data);
                    } else {
                        layer.msg(userName+data.data.groupName+data.data.topic,{icon:1})
                    }
                },
                //失败的回调函数
                error: function (e) {
                    console.log(e);
                }
            })
        } else {
            layer.msg('未查询到符合条件的小组');
        }
    });
}

//退出小组
function quitGroup(){
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/user/quitGroup',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "groupId": groupInquiryId,
                "id": id,
                "token": token,
                "type": type,
            }),
            //返回值类型
            dataType: 'json',
            //成功的回调函数
            success: function (data) {
                if (data.code === 1) {
                    layer.msg(data.msg);
                    console.log(data);
                } else {
                    layer.msg(userName+',您已'+data.data.topic+':'+data.data.groupName,{icon:1})
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
}

//layui格式：element & layer & form & table
layui.use(['form','element','layer','table'], function(){
    var element = layui.element;
    var form = layui.form;
    var layer = layui.layer;
    var table = layui.table;
})