$(function () {
    // 注册与登录的切换
    $("#link_reg").click(function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").click(function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    // 从layui中获取form表单
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $(".reg-box [name=password]").val();
            if (pwd !== value) {
                return "两次输入密码不一致！"
            }
        }
    })
    // http://ajax.frontend.itheima.net  根路径
    // 监听注册表单的提交事件
    $("#from_reg").on("submit", function (e) {
        e.preventDefault();
        $.post("/api/reguser", {
            username: $("#from_reg [name=username]").val(),
            password: $("#from_reg [name=password]").val()
        }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // console.log("1");
            layer.msg("注册成功，请登录");
            $("#link_login").click();
        })
    })
    // 监听登录表单的提交事件
    $("#form_login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败！");
                }
                layer.msg("登录成功！");
                localStorage.setItem("token", res.token);
                location.href = "/index.html";
            }
        })
    })
})