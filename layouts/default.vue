<template>
  <main class="p-0 m-0">
    <notifications group="top" position="top"/>
    <Navbar v-if="getWindowWidth>1027 && (getWindowHeight !== 1366)" key="navbar"/>
    <template v-else>
      <mobile-menu
        @hideLeftMenu="hideLeftMenu"
        :showMenu="showMenu"
        key="mob"
      />
      <div class="nav-brand">
        <img @click="showLeftMenu" src="/mobile-logo.svg" alt="logo">
      </div>
    </template>

    <div style="width: 100vw;" class="container-fluid">
      <div class="row justify-content-center align-items-center">
        <nuxt/>
      </div>
    </div>
  </main>
</template>
<script>
    import Navbar from '@/components/Navbar'
    import MobileMenu from "../components/mobileMenu";

    export default {
        components: {
            MobileMenu,
            Navbar
        },
        data: () => ({
            startPosition: false,
            showMenu: false
        }),
        computed: {
            getWindowWidth() {
                return window.innerWidth;
            },
            getWindowHeight() {
                return window.innerHeight;
            },
        },
        methods: {
            showLeftMenu() {
                this.showMenu = true;
                setTimeout(()=>this.$bus.$emit('start'), 1000);
            },
            hideLeftMenu() {
                this.showMenu = false;
            }
        }
    }
</script>
<style scoped lang="scss">
  main {
    font-family: 'Open Sans', sans-serif;

    .nav-brand {
      position: fixed;
      width: 80px;
      height: 44px;
      left: 20px;
      top: 20px;
      z-index: 999;
    }
  }
</style>

