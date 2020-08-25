//学生登录
function login(){
    var loginId = $('#exampleInputEmail1').val();//获取登陆名
    var password = $('#exampleInputPassword1').val();//获取登陆名
    if(loginId === ''||password === ''){
        alert('用户名或者密码为空，请输入后再次提交');
        return;
    }

    //调取登录接口
    $.ajax({
        //接口地址
        url:'http://localhost:8081/ework/user/login',
        //请求方式post/get
        type:'post',
        contentType:'application/json',
        //数据
        data:JSON.stringify({
            loginId:loginId,
            password:password,
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
                alert('登陆成功');
                window.location.href = 'studentHome.html';
                var person = JSON.stringify({
                    id : data.data.id,
                    token : data.data.token,
                })
                localStorage.setItem('person',person);
            }

        },
        //失败的回调函数
        error:function (e) {
            console.log(e);
        }
    })
}

//管理员登录
function adminLogin(){
    var adminId = $('#exampleInputEmail1').val();//获取登陆名
    var adminPassword = $('#exampleInputPassword1').val();//获取登陆名
    if(adminId === ''||adminPassword === ''){
        alert('用户名或者密码为空，请输入后再次提交');
        return;
    }
    //调取登录接口
    $.ajax({
        //接口地址
        url:'http://localhost:8081/ework/admin/login',
        //请求方式post/get
        type:'post',
        contentType:'application/json',
        //数据
        data:JSON.stringify({
            loginId:adminId,
            password:adminPassword,
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
                alert('登陆成功');
                window.location.href = 'adminHome.html';
                var person = JSON.stringify({
                    id : data.data.id,
                    token : data.data.token,
                })
                localStorage.setItem('person',person);
            }

        },
        //失败的回调函数
        error:function (e) {
            console.log(e);
        }
    })
}