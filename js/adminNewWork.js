//获取变量
var id = JSON.parse(localStorage.getItem('admin')).id;
var token = JSON.parse(localStorage.getItem('admin')).token;
var type = JSON.parse(localStorage.getItem('admin')).type;
var userName = JSON.parse(localStorage.getItem('admin')).userName;
var description = $('#admin-work-description').val();
var title = $('#admin-work-name').val();
var fileUrl = 0;
//上传
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

//发布
function addNewWork() {
    layui.use('layer',function() {
        var layer = layui.layer;
        $.ajax({
            //接口地址
            url: 'http://localhost:8081/ework/work-demand/create',
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
                    alert("作业保存成功");
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