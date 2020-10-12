export default {
    token: '',
    userName: '',
    displayName: '',
    userType: -1,
    userKey: '',
    administrationName: '', //所在局
    administrationID: '', //所在局ID
    officeName: '', //所在科室
    officeID: '', //所在科室ID
    userId: '',
    isShowInp: false,
    systemList: '',
    refToken: "",
    showPoper: false,
    poperData: [],
    poperChartData: {},
    isShowMouse: false, //属性查询鼠标状态
    userBelongType: "-2", //当前登录人是否是局外/局内用户(-1 外部  -2 内部用户  -3 内部管理员)
    dataAdminList: [], //所有局的列表
    allOfficeName: "", //当前登录人所有科室路径
    personalTips: '', //个人提示
    userSystem: '', //当前登陆人的系统
    isShowInfo: false, //一张图-服务信息弹框-售前暂用
    isShowAnaResult: false, //一张图-分析结果弹框-售前暂用
    isShowTable: false //一张图-批而未用弹框-售前暂用
}