<template>
  <div class="navigation-wrap">
    <div class="navigation-header">
      <div class="nav-header-left">
        <!-- <svg class="svg-icon nav-hi-svg" aria-hidden="true">
          <use xlink:href="hi" />
        </svg> -->
        <svg-icon class="nav-hi-svg" value="hi"></svg-icon>
        <span class="nav-hi-text">登录成功，欢迎来到此页面！</span>
      </div>
      <div>
        <div class="inline-block current-time">
          <span>{{ currDate }}</span>
          <span class="ml20">{{ currTime }}</span>
        </div>
        <div class="inline-block">
          <div class="operation-item curr-user-opt">
            <svg-icon value="customer"></svg-icon>
            <span class="operation-text">{{ showDisplayName }}</span>
          </div>
          <el-divider
            class="nav-header-divider"
            direction="vertical"
          ></el-divider>
          <div class="operation-item" @click="signOut">
            <svg-icon value="quit"></svg-icon>
            <span class="operation-text">退出</span>
          </div>
        </div>
      </div>
    </div>
    <div class="navigation-body">
      <div class="nav-proname">
        <img src="/static/nav/sg-logo.png" height="52" alt />
        <span class="nav-proname-text">国土空间基础信息平台</span>
      </div>
      <div class="nav-card-block clearfix">
        <div
          class="fl nav-card-item"
          v-for="(item, index) in navList"
          :key="index"
        >
          <div class="nav-item-box">
            <div
              class="nav-card-box add-more-svg"
              v-if="!item.systemname"
              @click="clickAdd"
            >
              <svg-icon class="nav-card-svg" :value="item.type"></svg-icon>
            </div>
            <div v-else class="nav-card-box" @click="clickInto(item)">
              <img
                class="sysIconSize"
                src="/public/nav/ghgl.png"
                alt="暂无图片"
              />
            </div>
            <p class="proname-box">{{ item.systemname }}</p>
          </div>
        </div>
      </div>
    </div>
    <el-drawer
      :visible.sync="drawer"
      :modal="false"
      :with-header="false"
      size="500px"
    >
      <div class="nav-drawer-box">
        <div class="drawer-tab-box">自定义系统</div>
        <div class="nav-drawer-body">
          <div class="drawer-body-tab">
            <div
              class="body-tab-item"
              :class="{ 'body-tab-active': tabActive == index }"
              v-for="(item, index) in classifyList"
              :key="index"
              @click="handleTabClick(index, item)"
            >
              {{ item.name }}
            </div>
          </div>
          <div
            class="drawer-overflow-box"
            v-loading="loading"
            element-loading-spinner="el-icon-loading-spinner iconfont icon-Loading"
            element-loading-text="加载中..."
            element-loading-background="rgba(255, 255, 255, 0)"
          >
            <div class="drawer-body-con">
              <div
                class="classify-con-item"
                v-for="(item, index) in mySysList"
                :key="index"
              >
                <div class="nav-card-box">
                  <img
                    class="sysIconSize"
                    :src="'/nav/' + item.iconclass + '.png'"
                    alt="暂无图片"
                  />
                </div>
                <div class="con-item-desc">
                  <p class="con-item-sysName">{{ item.systemname }}</p>
                  <p class="con-item-sysp">{{ item.systemdesc }}</p>
                </div>
                <div
                  class="item-operation"
                  :class="
                    item.existstatus == 0 ? 'item-owned' : 'item-not-owned'
                  "
                  @click="hanldeClick(item)"
                >
                  <i
                    :class="
                      item.existstatus == 0 ? 'el-icon-minus' : 'el-icon-plus'
                    "
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    tabActive: 0,
    classifyType: "",
    drawsize: 25,
    mySysList: [],
    navList: [],
    classifyList: [],
    timer: "",
    currDate: "",
    currTime: "",
    loading: false,
    showDisplayName: "管理员",
  }),
  computed: {},
  mounted() {
    console.log("数据22", this.$store.state.userName);
    let systemList = JSON.parse(sessionStorage.getItem("sysytemList"));
    if (systemList) {
      this.initNavList(systemList);
      this.getAllClassify();
    }
    this.timer = setInterval(() => {
      this.getCurrTime();
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    //获取当前时间
    getCurrTime() {
      this.currDate =
        new Date().getFullYear() +
        "年" +
        this.appendZero(new Date().getMonth() + 1) +
        "月" +
        this.appendZero(new Date().getDate()) +
        "日";
      this.currTime =
        this.appendZero(new Date().getHours()) +
        " : " +
        this.appendZero(new Date().getMinutes()) +
        ": " +
        this.appendZero(new Date().getSeconds());
    },
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj;
      }
      return obj;
    },
    //初始化登陆系统列表
    initNavList(sysList) {
      this.navList = sysList;
      this.navList.push({
        systemname: "",
        type: "system-thirteen",
        className: "add-more-svg",
      });
    },
    //点击自定义添加按钮
    clickAdd() {
      this.getUserSystem();
      this.drawer = true;
    },
    clickInto(data) {
      let param = { systemKey: data.systemkey };
      this.$apiserver.udpateBrowsenumSystem(param).then((res) => {
        window.location.href = data.url;
      });
      // const href = `${data.url}?token=${this.$store.state.token}&reftoken=${this.$store.state.refToken}`;
      // window.open(href, "_blank");
    },
    signOut() {
      this.$router.push({ path: "/login" });
    },
    //点击系统分类
    handleTabClick(index, item) {
      this.tabActive = index;
      this.classifyType = item.id;
      this.getUserSystem();
    },
    hanldeClick(item) {
      if (item.existstatus == 1) {
        this.addSystem(item);
      } else {
        this.delSystem(item);
      }
    },
    //删除系统
    delSystem(item) {
      let param = { systemkey: item.systemkey };
      this.$apiserver.deleteUserSystemBind(param).then((res) => {
        item.existstatus = "1";
        this.navList = this.navList.filter(
          (v) => v.systemkey != item.systemkey
        );
        let sessionList = JSON.stringify(this.navList.slice(0, -1));
        sessionStorage.setItem("sysytemList", sessionList);
        this.$notify({
          title: "成功",
          message: "删除系统成功",
          type: "success",
        });
      });
    },
    //添加系统
    addSystem(item) {
      let param = { systemkey: item.systemkey };
      this.$apiserver.getUserSystemBind(param).then((res) => {
        item.existstatus = "0";
        this.navList.splice(-1, 0, item);
        let sessionList = JSON.stringify(this.navList.slice(0, -1));
        sessionStorage.setItem("sysytemList", sessionList);
        this.$notify({
          title: "成功",
          message: "添加系统成功",
          type: "success",
        });
      });
    },
    // 获取当前登陆人的系统
    getUserSystem() {
      this.loading = true;
      let params = { status: "0", type: this.classifyType };
      this.$apiserver.getUserSystem(params).then((res) => {
        this.mySysList = res.Data;
        this.loading = false;
      });
    },
    // 获取分类
    getAllClassify() {
      this.$apiserver.getAllClassify().then((res) => {
        this.classifyList = res.Data.data;
        this.classifyList.unshift({
          id: "",
          name: "全部",
          sort: "0",
          status: "",
        });
      });
    },
  },
};
</script>

<style scoped>
</style>