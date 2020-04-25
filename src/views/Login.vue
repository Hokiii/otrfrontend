<template>
    <div class="login_container">
      <div class="login_box">
          <div class="avatar_box">
              <img src="../assets/logo.png" alt="logo">
          </div>
          <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="rules">
              <el-form-item prop="phone">
                  <el-input type="number" v-model="loginForm.phone" prefix-icon="iconfont icon-yonghu" placeholder="手机号"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-mima" placeholder="登录密码"></el-input>
              </el-form-item>
              <button class="primary_button" @click="login()">登录</button>
          </el-form>
          <div>
              <a class="iconfont back" @click="back">&#xe6e7;</a>
              <a class="register">注册</a>
          </div>
          <div class="login_way">
              <span class="qq iconfont">&#xe650;</span>
              <span class="wechat iconfont">&#xe651;</span>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16位密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        const { data: res } = await this.$http.post('/login', this.loginForm)
        const r = res.split(':')
        console.log(r)
        if (r[0] === '0') {
          // 1.保存token状态
          window.sessionStorage.setItem('token', r[2])
          // 2.跳转到主页
          this.$router.push('/home')
          return this.$message.success(r[1])
        } else {
          return this.$message.error(r[1])
        }
        // console.log(typeof res)
        // console.log(res.charAt(0))

        // this.$http.post('/login', this.loginForm).then((res) => {
        //   console.log(res.data)
        // })
      })
    },
    back () {
      this.$router.push('/home')
    }
  }
}
</script>
<style>
    .login_form input {
        margin:0;
        padding: 0;
        height: 30px;
        border: none;
        border-bottom: 1px solid #ddd;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
    }
    .el-message {
        width: 100px!important;
        top: 50px;
    }
    @media screen and (max-width: 550px) {

    }

</style>

<style scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 450px;
        height: 300px;
        background-color: #fff;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }
    .avatar_box {
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 130px;
        height: 130px;
        padding: 10px;
        border: 1px solid #eee;
        background-color: #fff;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
    }
    img {
        width: 100%;
        height: 100%;
        background-color: #eee;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }
    .login_form {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        padding: 0 20px;
        width: 100%;
        box-sizing: border-box;
    }
    a {
        color: #2b4b6b;
        font-size: 16px;
    }
    .back {
        display: none;
        position: absolute;
        margin: 0 10px;
    }
    .register {
        position: absolute;
        bottom: 10px;
        right:20px;
    }
    .login_way {
        position: absolute;
        left: 50%;
        bottom:5px;
        transform: translate(-50%,0);
    }
    span{
        display: inline-block;
        width: 40px;
        height: 40px;
        margin: 5px 20px;
        text-align: center;
        line-height: 40px;
        font-size: 40px;
        color: #2b4b6b;
    }
    /*平板或手机*/
    @media screen and (max-width: 991px) {

    }
    /*手机*/
    @media screen and (max-width: 550px) {
        .login_box {
            width: 100%;
            height: 100%;
        }
        .avatar_box {
            transform: translate(-50%, 100%);
        }
        input {
            height: 30px;
            margin-bottom: 15px;
        }
        .back,
        .register{
            bottom: calc(100% - 30px);
        }
        .back {
            display: block;
        }
        .login_way {
            transform: translate(-50%, -100%);
        }
        span {
            width: 50px;
            height: 50px;
        }
    }
    @media screen and (max-width: 550px) and (max-height: 736px) {
        .avatar_box {
            transform: translate(-50%, 80%);
        }
    }
    @media screen and (max-width: 550px) and (max-height: 667px) {
        .avatar_box {
            transform: translate(-50%, 50%);
        }
    }
    @media screen and (max-width: 550px) and (max-height: 640px) {
        .login_way {
            transform: translate(-50%, -50%);
        }
        .qq {
            position: absolute;
            bottom:50px;
            transform: translate(-170%,0);
        }
        .wechat {
            position: absolute;
            bottom: 50px;
        }
    }
</style>
