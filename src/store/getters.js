export default {
  // items that should be currently displayed.
  // this Array may not be fully fetched.
  showDisplayName: state => {
    return state.displayName;
  },
  showOfficeName: state => {
    return state.officeName;
  }
}
