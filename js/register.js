//学生登录
function returnStudentLogin() {
    var studentId = $('#exampleInputEmail1').val();//获取用户学号
    var userId = $('#exampleInputText4').val();//获取用户姓名
    var password1 = $('#exampleInputPassword1').val();//获取密码1
    var password2 = $('#exampleInputPassword2').val();//获取密码2
    var phone = $('#exampleInputText3').val();//获取电话号码
    var phoneNumber = phone.length;
    var userName = $('#exampleInputText5').val();//获取用户昵称
    if(studentId === ''||password1 === ''||password2 === '' ||
        userId === '' || phone===''||userName===''){
        alert('输入不能为空');
    } else if(password1!==password2) {
        alert("您输入的两次密码不一致！")
    } else if (phoneNumber!==11 || !(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
        alert("您输入的电话号码不正确！")
    } else {
        $.ajax({
            //接口地址
            url:'http://localhost:8081/ework/user/register',
            //请求方式post/get
            type:'post',
            contentType:'application/json',
            //数据
            data:JSON.stringify({
                password: password2,
                phone: phone,
                studentId: studentId,
                userId: userId,
                userName: userName,
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
                    alert("注册成功！");
                    window.location.href="../en/studentLogin.html"
                }
            },
            //失败的回调函数
            error:function (e) {
                console.log(e);
            }
        })
    }

}

//管理员登录
function returnAdminLogin() {
    var adminId = $('#exampleInputText1').val();//获取用户学号
    var adminUserId = $('#exampleInputText4').val();//获取用户姓名
    var adminPassword1 = $('#exampleInputPassword1').val();//获取密码1
    var adminPassword2 = $('#exampleInputText2').val();//获取密码2
    var adminPhone = $('#exampleInputText3').val();//获取电话号码
    var adminPhoneNumber = adminPhone.length;
    var adminUserName = $('#exampleInputText5').val();//获取用户昵称
    if(adminId === ''||adminPassword1 === ''||adminPassword2 === '' ||
        adminUserId === '' || adminPhone===''||adminUserId===''){
        alert('输入不能为空');
    } else if(adminPassword1!==adminPassword2) {
        alert("您输入的两次密码不一致！")
    } else if (adminPhoneNumber!==11 || !(/^1[3|4|5|7|8][0-9]{9}$/.test(adminPhone))) {
        alert("您输入的电话号码不正确！")
    } else {
        $.ajax({
            //接口地址
            url:'http://localhost:8081/ework/admin/register',
            //请求方式post/get
            type:'post',
            contentType:'application/json',
            //数据
            data:JSON.stringify({
                password: adminPassword2,
                phone: adminPhone,
                adminId: adminId,
                userId: adminUserId,
                userName: adminUserName,
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
                    alert("注册成功！");
                    window.location.href="../en/adminLogin.html"
                }
            },
            //失败的回调函数
            error:function (e) {
                console.log(e);
            }
        })
    }
}