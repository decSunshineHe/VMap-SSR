<template>
  <div id="app">
    <router-view class="view"></router-view>
    <!-- <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition> -->
  </div>
</template>

<style lang="stylus">
.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

@media (max-width: 860px) {
}

@media (max-width: 600px) {
}
</style>
