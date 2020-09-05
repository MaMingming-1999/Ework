//获取变量
var id = JSON.parse(localStorage.getItem('admin')).id;
var token = JSON.parse(localStorage.getItem('admin')).token;
var type = JSON.parse(localStorage.getItem('admin')).type;
var userName = JSON.parse(localStorage.getItem('admin')).userName;
var groupId=''
//展示创建者的所有小组
$(function () {
    $.ajax({
                //接口地址
                url: 'http://localhost:8081/ework/admin/detail',
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
                        for(var i=0; i<data.data.createGroupCount; i++){
                            var status = data.data.createGroupDetailVoList[i].status;
                            groupId = data.data.createGroupDetailVoList[i].id;
                            if(status===10){
                                statusInfo = '未开放加入';
                                $('#mytable').append("<tr><td>"+data.data.createGroupDetailVoList[i].createAdminName+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].groupCode+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].groupName+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].descriptions+"</td>"+
                                    "<td>"+statusInfo+"</td>"+
                                    "<td>"+"<a href='../en/adminEditGroup.html?groupId="+groupId+"'>"+
                                    "<button class='layui-btn'>"+"编辑"+"</button>"
                                    +"</a>"+"<a href='../en/deleteGroup.html?groupId="+groupId+"'>"+
                                    "<button class='layui-btn layui-btn-danger'>"+ "删除"+"</button>"+ "</a>"+"</td></tr>");
                            } else if(status===20) {
                                statusInfo='只允许管理员加入';
                                $('#mytable').append("<tr><td>"+data.data.createGroupDetailVoList[i].createAdminName+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].groupCode+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].groupName+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].descriptions+"</td>"+
                                    "<td>"+statusInfo+"</td>"+
                                    "<td>"+"<a href='../en/adminEditGroup.html?groupId="+groupId+"'>"+
                                    "<button class='layui-btn'>"+"编辑"+"</button>"
                                    +"</a>"+"<a href='../en/deleteGroup.html?groupId="+groupId+"'>"+
                                    "<button class='layui-btn layui-btn-danger'>"+ "删除"+"</button>"+ "</a>"+"</td></tr>");
                            } else if(status===30) {
                                statusInfo = '只允许学生加入';
                                $('#mytable').append("<tr><td>"+data.data.createGroupDetailVoList[i].createAdminName+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].groupCode+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].groupName+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].descriptions+"</td>"+
                                    "<td>"+statusInfo+"</td>"+
                                    "<td>"+"<a href='../en/adminEditGroup.html?groupId="+groupId+"'>"+
                                    "<button class='layui-btn'>"+"编辑"+"</button>"
                                    +"</a>"+"<a href='../en/deleteGroup.html?groupId="+groupId+"'>"+
                                    "<button class='layui-btn layui-btn-danger'>"+ "删除"+"</button>"+ "</a>"+"</td></tr>");
                            } else if(status===40) {
                                statusInfo = '允许管理员和学生加入';
                                $('#mytable').append("<tr><td>"+data.data.createGroupDetailVoList[i].createAdminName+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].groupCode+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].groupName+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].descriptions+"</td>"+
                                    "<td>"+statusInfo+"</td>"+
                                    "<td>"+"<a href='../en/adminEditGroup.html?groupId="+groupId+"'>"+
                                    "<button class='layui-btn'>"+"编辑"+"</button>"
                                    +"</a>"+"<a href='../en/deleteGroup.html?groupId="+groupId+"'>"+
                                    "<button class='layui-btn layui-btn-danger'>"+ "删除"+"</button>"+ "</a>"+"</td></tr>");
                                console.log(groupId);
                            } else if(status===80) {
                                statusInfo = '停用';
                                $('#mytable').append("<tr><td>"+data.data.createGroupDetailVoList[i].createAdminName+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].groupCode+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].groupName+"</td>"+
                                    "<td>"+data.data.createGroupDetailVoList[i].descriptions+"</td>"+
                                    "<td>"+statusInfo+"</td>"+
                                    "<td>"+"<a href='../en/adminEditGroup.html?groupId="+groupId+"'>"+
                                    "<button class='layui-btn'>"+"编辑"+"</button>"
                                    +"</a>"+"<a href='../en/deleteGroup.html?groupId="+groupId+"'>"+
                                    "<button class='layui-btn layui-btn-danger'>"+ "删除"+"</button>"+ "</a>"+"</td></tr>");
                            } else if(status===100) {
                            }
                        }
                    }
                },
                //失败的回调函数
                error: function (e) {
                    console.log(e);
                }
            })
})