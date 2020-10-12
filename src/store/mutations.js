export default {
    setUserSystem(state, val) {
        return state.userSystem = val
    },
    setAllOfficeName(state, val) {
        state.allOfficeName = val
    },
    setAdminList(state, val) {
        state.dataAdminList = val
    },
    setUserBelongType(state, val) {
        state.userBelongType = val
    },
    setToken(state, val) {
        state.token = val
    },
    setUserName(state, val) {
        state.userName = val
    },
    setUserType(state, val) {
        state.userType = val
    },
    setUserKey(state, val) {
        state.userKey = val
    },
    setUserDisName(state, val) {
        state.displayName = val
    },
    setAdministrationName(state, val) {
        state.administrationName = val
    },
    setAdministrationId(state, val) {
        state.administrationID = val
    },
    setOfficeName(state, val) {
        state.officeName = val
    },
    setOfficeID(state, val) {
        state.officeID = val
    },
    setUserId(state, val) {
        state.userId = val
    },
    changeInpStatus(state, val) {
        state.isShowInp = val
    },
    setSystemList(state, val) {
        state.systemList = val;
    },
    setRefToken(state, val) {
        state.refToken = val;
    },
    showPoper(state, val) {
        state.showPoper = val
    },
    poperData(state, val) {
        state.poperData = val;
    },
    poperChartData(state, val) {
        state.poperChartData = val;
    },
    isShowMouse(state, val) {
        state.isShowMouse = val;
    },
    setPersonalTips(state, val) {
        state.personalTips = val;
    },
    setShowInfo(state, val) {
        state.isShowInfo = val;
    },
    setShowAnaResult(state, val) {
        state.isShowAnaResult = val;
    },
    setShowTable(state, val) {
        state.isShowTable = val;
    }
}
