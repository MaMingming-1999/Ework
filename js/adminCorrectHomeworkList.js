//显示作业信息
$(function() {
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-submit/detailList',
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
                    for(var i = 0;i < length ; i++){
                        var title = data.data[i].title;
                        var correctName = data.data[i].correctName;
                        var score = data.data[i].score;
                        var studentId = data.data[i].studentId;
                        var userName = data.data[i].userName;
                        var status = data.data[i].status;
                        var announcerName = data.data[i].announcerName;
                        var submitId = data.data[i].id;
                        if(status===210||status===220)
                        {
                            $('#mytable').append("<tr><td>"+announcerName+"</td>"+
                                "<td>"+title+"</td>"+
                                "<td>"+studentId+"</td>"+
                                "<td>"+userName+"</td>"+
                                "<td>"+"--"+"</td>"+"<td>"+"--"+"</td>"+"<td>"+'未批改'+"</td>"+
                                "<td>"+"<a href='../en/adminCorrectHomework.html?submitId="+submitId+"'>"+
                                "<button class='layui-btn'>"+"批改"+"</button>"
                                +"</a>"+"<a href='../en/adminReturnStudentHomework.html?submitId="+submitId+"'>"+
                                "<button class='layui-btn'>"+ "退回"+"</button>"+ "</a>"+"</td></tr>")
                        } else if (status===230) {
                            $('#mytable').append("<tr><td>"+announcerName+"</td>"+
                                "<td>"+title+"</td>"+
                                "<td>"+studentId+"</td>"+
                                "<td>"+userName+"</td>"+
                                "<td>"+score+"</td>"+"<td>"+correctName+"</td>"+"<td>"+'已批改'+"</td>"+
                                "<td>"+"<a href='../en/adminRecorrectHomework.html?submitId="+submitId+"'>"+
                                "<button class='layui-btn'>"+"重判"+"</button>"
                                +"</a>"+"<a href='../en/adminReturnStudentHomework.html?submitId="+submitId+"'>"+
                                "<button class='layui-btn'>"+ "退回"+"</button>"+ "</a>"+"</td></tr>")
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
})