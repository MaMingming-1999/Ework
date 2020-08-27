//获取变量
var id = JSON.parse(localStorage.getItem('admin')).id;
var token = JSON.parse(localStorage.getItem('admin')).token;
var type = JSON.parse(localStorage.getItem('admin')).type;
var userName = JSON.parse(localStorage.getItem('admin')).userName;

//建立小组
function addGroup() {
    layui.use('layer', function() {
        var layer = layui.layer;
        var layuiCode = $('#layui-code').val();
        var layuiText = $('#layui-text').val();
        var groupCode = $('#layui-group-name').val();
        if(layuiCode!=='' && layuiText!=='' && groupCode!=='')
        {
            $.ajax({
                //接口地址
                url: 'http://localhost:8081/ework/group-info/create',
                //请求方式post/get
                type: 'post',
                contentType: 'application/json',
                //数据
                data: JSON.stringify({
                    "description": layuiText,
                    "groupCode": layuiCode,
                    "groupName": groupCode,
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
                        layer.msg("添加小组成功",{icon:1});
                    }
                },
                //失败的回调函数
                error: function (e) {
                    console.log(e);
                }
            })
        } else {
            layer.msg("请输入小组信息",{icon:5});
        }

    })
}
