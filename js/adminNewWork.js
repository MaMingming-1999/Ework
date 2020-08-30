//获取变量
var id = JSON.parse(localStorage.getItem('admin')).id;
var token = JSON.parse(localStorage.getItem('admin')).token;
var type = JSON.parse(localStorage.getItem('admin')).type;
var userName = JSON.parse(localStorage.getItem('admin')).userName;
var description = $('#admin-work-description').val();
var title = $('#admin-work-name').val();

// layui.use('upload', function(){
//     var $ = layui.jquery
//         ,upload = layui.upload;
//     upload.render({
//         elem: '#chooseDocument'
//         ,url: 'http://localhost:8081//ework/work-demand/create' //改成您自己的上传接口
//         ,auto: false
//         //,multiple: true
//         ,bindAction: '#test9'
//         ,accept:'file'
//         ,ext:'pdf|doc|docx|txt|png|jpg'
//         ,data:JSON.stringify({
//             "description": description,
//             "id": id,
//             "title": title,
//             "token": token,
//             "type": type,
//         })
//         ,done: function(res){
//             alert('succ');
//             console.log(res)
//         }
//     });
// })
function uploadDoc() {
    // var formData = new FormData();
    // formData.append('description',description);
    // formData.append('id',id);
    // formData.append('token',token);
    // formData.append('type',type);
    // formData.append('title',title);
    // formData.append('appendixUrl',$('#doc'[0].files[0]));
    $.ajax({
        url:'http://localhost:8081//ework/work-demand/create',
        data:JSON.stringify({
            "appendixUrl": $('#doc')[0].files[0],
            "description": description,
            "id": id,
            "title":title,
            "token": token,
            "type": type,
        }),
        type:"POST",
        processData:false,
        contentType:false,
        dataType:"JSON",
        success:function (result) {
          console.log(result.data.demandId);
          alert("成功")
        },
        error: function (e) {
            console.log(e);
        }
    })
}