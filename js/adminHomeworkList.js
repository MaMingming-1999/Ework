//获取变量
var id = JSON.parse(localStorage.getItem('admin')).id;
var token = JSON.parse(localStorage.getItem('admin')).token;
var type = JSON.parse(localStorage.getItem('admin')).type;
var userName = JSON.parse(localStorage.getItem('admin')).userName;
var demandId='';

//展示创建者的所有作业
$(function () {
    $.ajax({
        //接口地址
        url: 'http://localhost:8081/ework/work-demand/detailList',
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
                var length = data.data.length;
                for(var i = 0; i < length; i++){
                    var title = data.data[i].title;
                    var description = data.data[i].description;
                    var studentCount = data.data[i].studentCount;
                    var submitCount = data.data[i].submitCount;
                    var endTime = data.data[i].endTime;
                    if(endTime == null){
                        end = '--';
                    } else {
                        var s = endTime.split("T");
                        var endTimeText =s[0]+" "+s[1];
                        var n = endTimeText.split(".")
                        var end =n[0];
                    }
                    var status = data.data[i].status;
                    var statusText = status;
                    var demandId = data.data[i].id;
                    var groupId = data.data.groupId;
                    if(status===110||status===120){
                        statusText = '已发布';
                        $('#mytable').append("<tr><td>"+title+"</td>"+
                            "<td>"+description+"</td>"+
                            "<td>"+studentCount+"</td>"+
                            "<td>"+submitCount+"</td>"+
                            "<td>"+end+"</td>"+"<td>"+statusText+"</td>"+
                            "<td>"+"<a href='../en/adminBackHomework.html?demandId="+demandId+"'>"+
                            "<button class='layui-btn'>"+ "撤回"+"</button>"+ "</a>"+
                            "<a href='../en/adminChangeHomework.html?demandId="+demandId+"'>"+
                            "<button class='layui-btn'>"+"修改"+"</button>"
                            +"</a>"+"<a href='../en/adminDeleteHomework.html?demandId="+demandId+"'>"+
                            "<button class='layui-btn'>"+"删除"+"</button>"
                            +"</a>"+"</td></tr>")
                    } else if(status===10||status===20) {
                        statusText = '未发布';
                        $('#mytable').append("<tr><td>"+title+"</td>"+
                            "<td>"+description+"</td>"+
                            "<td>"+studentCount+"</td>"+
                            "<td>"+submitCount+"</td>"+
                            "<td>"+end+"</td>"+"<td>"+statusText+"</td>"+
                            "<td>"+"<a href='../en/adminSubmitWork.html?demandId="+demandId+"'>"+
                            "<button class='layui-btn'>"+"发布"+"</button>"
                            +"</a>"+"<a href='../en/adminDeleteHomework.html?demandId="+demandId+"'>"+
                            "<button class='layui-btn'>"+"删除"+"</button>"
                            +"</a>"+"</td></tr>")
                    } else if (status===0){

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