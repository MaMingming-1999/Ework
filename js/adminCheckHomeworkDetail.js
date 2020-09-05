//获取变量
var id = JSON.parse(localStorage.getItem('admin')).id;
var token = JSON.parse(localStorage.getItem('admin')).token;
var type = JSON.parse(localStorage.getItem('admin')).type;
var userName = JSON.parse(localStorage.getItem('admin')).userName;
var fileUrl = 0;
var textUrl = '';

//找到链接
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
var demandId = v['demandId'];

//返回列表
function returnCheck() {
    layui.use('layer',function() {
        var layer = layui.layer;
        window.location.href = '../en/adminCheckHomeworkList.html';
    })
}

//显示作业详情
$(function() {
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-demand/detail',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "demandId": demandId,
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
                    var end = data.data.endTime;
                    textUrl = data.data.appendixUrl
                    if(textUrl == null){
                        textUrl = '无附件'
                        $('#homeworkUrl').append(textUrl)
                    } else {
                        $('#download').append("下载")
                    }
                    if(end===null){
                        $('#homeworkDeadline').append('--');
                    } else {
                        var s1 = end.split("T");
                        var dateText1 = s1[0]+" "+s1[1];
                        var n1 = dateText1.split('.')
                        var dateTime1 = n1[0];
                        $('#homeworkDeadline').append(dateTime1);
                    }
                    $('#homeworkTitle').append(data.data.title);
                    $('#homeworkDescription').append(data.data.description);
                    $('#homeworkUsername').append(data.data.userName);
                    var status = data.data.status;
                    var statusText = '';
                    if(status===110||status===120){
                        statusText = '已发布';
                    } else if (status===10||status===20) {
                        statusText = '未发布';
                    } else {
                        statusText = '无效作业，请联系平台'
                    }
                    $('#homeworkStatus').append(statusText);
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
})
//下载需求
function downloadFile() {
    $('#download').attr('href',textUrl);
}
//撤回
function backSubmit() {
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-demand/withdraw',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "demandId": demandId,
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
                   alert('您已撤回'+data.data.title);
                   window.location.href = '../en/adminCheckHomeworkList.html'
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
}

//删除
function deleteHomework(){
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-demand/delete',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "demandId": demandId,
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
                    alert('您已删除'+data.data.title);
                    window.location.href = '../en/adminCheckHomeworkList.html'
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
}

//选择框
    $.ajax({
        url: 'http://localhost:8081/ework/admin/groupList',
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
                for (var i = 0;i < length;i++){
                    var groupId = data.data[i].id;
                    $('#checkbox-text').append(
                        "<option value='" + groupId + "'>"+data.data[i].groupName+"</option>"
                    )
                }
            }
        },
        //失败的回调函数
        error: function (e) {
            console.log(e);
        }

    })

//发布
function submitHomework() {
    layui.use('layer',function() {
        var layer = layui.layer;
        // console.log($('#checkbox-text').val());
        var startDate = $('#test1').val();
        var start = new Date(startDate).getTime();
        var endDate = $('#test2').val();
        var end = new Date(endDate).getTime();
        console.log(end);
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-demand/announce',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "demandId": demandId,
                "groupId": $('#checkbox-text').val(),
                "endTimeMills": end,
                "id": id,
                "token": token,
                "type": type,
                "startTimeMills":start,
            }),
            //返回值类型
            dataType: 'json',
            //成功的回调函数
            success: function (data) {
                if (data.code === 1) {
                    alert(data.msg);
                    console.log(data);
                } else {
                    alert('您已发布'+data.data.title);
                    window.location.href = '../en/adminCheckHomeworkList.html'
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
}

function uploadDoc() {
    var formData = new FormData();
    formData.append('file',$("#file")[0].files[0]);
    console.log(formData)
    $.ajax({
        url:'http://localhost:8081/ework/file-demand/uploadFile',
        data:formData,
        type:"POST",
        processData:false,
        contentType:false,
        dataType:"JSON",
        mimeType:"multipart/form-data",
        success:function (result) {
            if(result.data.id===0){
                alert("您没有选中文件")
            }else {
                fileUrl = result.data.id;
                console.log(result.data.id);
                alert("上传成功");
            }
        },
        error: function (e) {
            console.log(e);
        }
    })
}

//修改
function changeHomework() {
    layui.use('layer',function() {
        var layer = layui.layer;
        var description = $('#admin-work-description').val();
        var title = $('#admin-work-name').val();
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-demand/change',
            //请求方式post/get
            type: 'post',
            contentType: 'application/json',
            //数据
            data: JSON.stringify({
                "appendixUrl": fileUrl,
                "description": description,
                "id": id,
                "title": title,
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
                    alert("作业需求修改成功");
                    window.location.href='../en/adminCheckHomeworkList.html';
                }
            },
            //失败的回调函数
            error: function (e) {
                console.log(e);
            }
        })
    })
}