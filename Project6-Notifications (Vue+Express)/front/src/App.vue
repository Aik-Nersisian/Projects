<!-- Main App Page -->
<!-- When the notifications widget is open, Navbar will emit an event to App, and an overlay will be applied to the application   -->

<template>
  <div id="app">
    <div v-if="overlay" class="overlay"></div>
    <NavBarComponent @overlay="overlayShow" />
    <router-view />
  </div>
</template>

<script>
import NavBarComponent from "@/components/NavBar/NavBarComponent.vue";
export default {
  name: "app",
  data() {
    return {
      overlay: false,
    };
  },
  methods: {
    overlayShow() {
      this.overlay = !this.overlay;
    },
  },
  components: {
    NavBarComponent,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
#app {
  font-family: gilroy, -apple-system, BlinkMacSystemFont, segoe ui, Roboto,
    helvetica neue, Arial, noto sans, sans-serif, apple color emoji,
    segoe ui emoji, segoe ui symbol, noto color emoji;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #eff0f3;
}

.overlay {
  background: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 10;
}
</style>
