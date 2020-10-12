<template>
  <div class="login-wrap">
    <div class="login-body">
      <div class="pro-name-top">
        <img src="../assets/image/sg-logo.png" height="52" alt="logo" />
        <span class="pro-name-info">国土空间基础信息平台</span>
      </div>
      <div class="clearfix">
        <div class="fl layout-left">
          <div class="layout-left-box">
            <p class="welcome-info">Welcome！</p>
            <div class="split-line"></div>
            <p class="attr-info">空间资源，共享交换</p>
          </div>
        </div>
        <div
          class="fl login-box"
          v-loading="loginLoading"
          element-loading-spinner="el-icon-loading-spinner iconfont icon-Loading"
          element-loading-text
          element-loading-background="rgba(255, 255, 255, 0.5)"
        >
          <p class="login-title">账号登录</p>
          <div class="login-form-group" :class="{ active: currFocus === 0 }">
            <i class="icon i-username" :class="{ active: iNameActive }"></i>
            <input
              type="text"
              placeholder="请输入用户名"
              class="text-userinfo"
              v-model="userName"
              @focus="focusChange(0)"
              @input="changeUserInfo(0)"
              @blur="userBlur"
            />
          </div>
          <div class="login-form-group" :class="{ active: currFocus === 1 }">
            <i class="icon i-pwd" :class="{ active: iPwdActive }"></i>
            <input
              :type="typePwd"
              placeholder="请输入密码"
              class="text-userinfo"
              v-model="pwd"
              @focus="focusChange(1)"
              @input="changeUserInfo(1)"
              @blur="pwdBlur"
            />
            <i
              class="icon i-pwd-switch"
              v-if="currFocus === 1"
              :class="{ 'i-pwd-close': typePwd === 'text' }"
              @click="handleSwitchPwd"
            ></i>
          </div>
          <div class="remember-box">
            <i
              class="icon i-chkb"
              :class="{ selected: isSelected }"
              @click="rememberPwd"
            ></i>
            <span class="remember-text">记住密码</span>
          </div>
          <button
            class="login-btn"
            :class="{ active: btnActive }"
            @click="login"
            :disabled="isDisabled"
          >
            登录
          </button>
          <div class="error-msg">
            <p class="text-over">{{ this.errMsg }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    errMsg: "",
    isError: false,
    isDisabled: false,
    isSelected: false,
    loginLoading: false,
    userName: "",
    pwd: "",
    currFocus: -1,
    iNameActive: false,
    iPwdActive: false,
    typePwd: "password",
    btnActive: false,
  }),
  mounted() {
    let _this = this;
    // document.onkeypress = function (e) {
    //   var keycode = window.event.keyCode;
    //   if (keycode == 13) {
    //     _this.login(); // 登录方法名
    //     return false;
    //   }
    // };
  },
  methods: {
    login() {
      if (this.userName && this.pwd) {
        let param = { userName: this.userName, password: this.pwd };
        this.loginLoading = true;
        this.$apiserver.Login(param).then(
          (res) => {
            console.log('数据',res);
            var userType = res.Data.userType;
            var userName = res.Data.userName;
            var displayName = res.Data.displayName;
            var userKey = res.Data.userKey;
            var userId = res.Data.userId;
            var token = res.Data.token;
            let refToken = res.Data.refToken;
            let sysytemList = JSON.stringify(res.Data.systemdefines);
            this.$store.commit("setUserName", userName);
            this.$store.commit("setUserDisName", displayName);
            this.$store.commit("setUserType", userType);
            this.$store.commit("setUserKey", userKey);
            this.$store.commit("setRefToken", refToken);
            this.$store.commit("setToken", token);
            this.$store.commit("setSystemList", sysytemList);
            sessionStorage.setItem("userName", userName);
            sessionStorage.setItem("sysytemList", sysytemList);
            this.loginLoading = false;
            this.$router.push({ path: "/navigation" });
          },
          (err) => {
            this.loginLoading = false;
          }
        );
      }
    },
    focusChange(i) {
      if (i === 0) {
        this.iNameActive = true;
        if (this.pwd == "") {
          this.iPwdActive = false;
        }
      } else {
        this.iPwdActive = true;
        if (this.userName == "") {
          this.iNameActive = false;
        }
      }
      this.currFocus = i;
    },
    changeUserInfo(i) {
      this.currFocus = i;
      this.btnActive = this.userName && this.pwd ? true : false;
    },
    handleSwitchPwd() {
      this.typePwd = this.typePwd == "text" ? "password" : "text";
    },
    //记住密码点击事件
    rememberPwd() {
      this.isSelected = !this.isSelected;
    },
    //判断密码是否输入
    pwdBlur() {
      this.errMsg = this.pwd ? "" : "请输入密码";
    },
    //判断用户名是否输入
    userBlur() {
      this.errMsg = this.userName ? "" : "请输入用户名";
    },
  },
};
</script>

<style scoped>
.login-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: url('../assets/image/login/bg.jpg') no-repeat;
  background-size: cover;
}

/* 标题 */
.pro-name-top {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.pro-name-info {
  color: #fff;
  font-size: 36px;
  margin-left: 18px;
  font-weight: bold;
}

/* 内容 */
.login-box {
  width: 303px;
  height: 347px;
  background-color: #fff;
  border-radius: 2px;
  padding: 0 24px 30px;
  z-index: 3;
}

.login-title {
  font-size: 20px;
  font-weight: normal;
  margin: 40px 0 10px;
  text-align: center;
}

.login-form-group {
  border: 1px solid #cecece;
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  border-radius: 2px;
  padding: 0 10px;
}

.login-form-group.active {
  border-color: #8296af;
}

.text-userinfo {
  width: calc(100% - 45px);
  font-size: 14px;
  height: 100%;
}

.i-username, .i-pwd {
  width: 14px;
  height: 18px;
  margin-right: 6px;
}

.i-username {
  background: url('../assets/image/login/icon-username.png') no-repeat;
}

.i-pwd {
  background: url('../assets/image/login/icon-pwd.png') no-repeat;
}

.i-username.active {
  background: url('../assets/image/login/icon-username-active.png') no-repeat;
}

.i-pwd.active {
  background: url('../assets/image/login/icon-pwd-active.png') no-repeat;
}

.i-pwd-switch {
  width: 16px;
  height: 10px;
  background: url('../assets/image/login/eye-open.png') no-repeat;
  cursor: pointer;
}

.i-pwd-close {
  width: 16px;
  height: 8px;
  background: url('../assets/image/login/eye-close.png') no-repeat;
}

.login-btn {
  width: 100%;
  height: 40px;
  border-radius: 2px;
  background-color: #7eade8;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 14px 0;
  letter-spacing: 5px;
  color: #fff;
  font-size: 14px;
}

.login-btn.active {
  background-color: #1467c7;
}

.remember-box {
  margin-top: 14px;
}

.remember-text {
  color: #666;
  font-size: 12px;
}

.login-wrap .i-chkb {
  width: 12px;
  height: 12px;
  background-image: url('../assets/image/login/i-checkbox.png');
  cursor: pointer;
  vertical-align: middle;
}

.login-wrap .i-chkb.selected {
  background-image: url('../assets/image/login/i-checkbox-selected.png');
}

/* welcome */
.layout-left {
  position: relative;
  width: 461px;
  height: 347px;
  display: flex;
  align-items: center;
  padding-left: 90px;
  background: -moz-linear-gradient(
    133deg,
    rgb(255, 255, 255, 0.5) 0%,
    rgb(60, 166, 255, 0.5) 90%
  );
  background: -webkit-linear-gradient(
    133deg,
    rgb(255, 255, 255, 0.5) 0%,
    rgb(60, 166, 255, 0.5) 90%
  );
  background: -ms-linear-gradient(
    133deg,
    rgb(255, 255, 255, 0.5) 0%,
    rgb(60, 166, 255, 0.5) 90%
  );
  background: linear-gradient(
    133deg,
    rgb(255, 255, 255, 0.5) 0%,
    rgb(60, 166, 255, 0.5) 90%
  );
}

.welcome-info {
  color: #fff;
  font-size: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

.split-line {
  width: 81px;
  height: 6px;
  background-color: #fff;
  margin: 5px 0 34px;
}

.attr-info {
  color: #fff;
  font-size: 26px;
  letter-spacing: 2px;
}

/* 错误提示 */
.error-msg {
  color: red;
}
</style>
