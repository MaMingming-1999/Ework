//获取变量
var id = JSON.parse(localStorage.getItem('student')).id;
var token = JSON.parse(localStorage.getItem('student')).token;
var type = JSON.parse(localStorage.getItem('student')).type;
var userName = JSON.parse(localStorage.getItem('student')).userName;

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
                        var description = data.data[i].description;
                        var status = data.data[i].status;
                        var submitId = data.data[i].id;
                        var start = data.data[i].startTime;
                        var end = data.data[i].endTime;
                        var startText = '--'
                        var endText = '--'
                        if(start===null){
                        } else {
                            var s = start.split("T");
                            var dateText = s[0]+" "+s[1];
                            var n = dateText.split('.')
                            startText = n[0];
                        }
                        if(end===null){
                        } else {
                            var s1 = end.split("T");
                            var dateText1 = s1[0]+" "+s1[1];
                            var n1 = dateText1.split('.')
                            endText = n1[0];
                        }
                        if(status===100)
                        {
                            $('#mytable').append("<tr><td>"+title+"<img src='../img/newLogo.gif'>"+"</td>"+
                                "<td>"+description+"</td>"+
                                "<td>"+"--"+"</td>"+"<td>"+"--"+"</td>"+"<td>"+'尚未完成'+"</td>"+"<td>"+startText+"</td>"+
                                "<td>"+endText+"</td>"+ "<td>"+"<a href='../en/studentSaveHomework.html?submitId="+submitId+"'>"+
                                "<button class='layui-btn'>"+"去写作业"+"</button>" +"</a></td></tr>")
                        } else if (status===110||status===120) {
                            $('#mytable').append("<tr><td>"+title+"</td>"+
                                "<td>"+description+"</td>"+
                                "<td>"+"--"+"</td>"+"<td>"+"--"+"</td>"+"<td>"+"作业已保存但未提交"+"</td>"+
                                "<td>"+startText+"</td>"+ "<td>"+endText+"</td>"+
                                "<td>"+"<a href='../en/studentSubmitHomework.html?submitId="+submitId+"'>"+
                                "<button class='layui-btn'>"+"提交"+"</button></a>"+"<a href='../en/studentSaveHomework.html?submitId="+submitId+"'>"+
                                "<button class='layui-btn'>"+"修改"+"</button>"+"</a></td></tr>")
                        } else if(status===210||status===220){
                            $('#mytable').append("<tr><td>"+title+"</td>"+
                                "<td>"+description+"</td>"+
                                "<td>"+"--"+"</td>"+"<td>"+"--"+"</td>"+"<td>"+"已提交作业"+"</td>"+
                                "<td>"+startText+"</td>"+ "<td>"+endText+"</td>"+
                                "<td>"+"<a href='../en/studentBackHomework.html?submitId="+submitId+"'>"+
                                "<button class='layui-btn'>"+"撤回"+"</button>" +"</a></td></tr>")
                        } else if(status===230) {
                            $('#mytable').append("<tr><td>"+title+"</td>"+
                                "<td>"+description+"</td>"+
                                "<td>"+score+"</td>"+"<td>"+correctName+"</td>"+"<td>"+"作业已批改"+"</td>"+
                                "<td>"+startText+"</td>"+ "<td>"+endText+"</td>"+
                                "<td>"+"<a href='../en/studentCheckHomeworkDetail.html?submitId="+submitId+"'>"+
                                "<button class='layui-btn'>"+"查看"+"</button>"+"</a></td></tr>")
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
