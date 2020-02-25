<template lang="html">
  <div class="page-loader d-flex flex-column justify-content-center align-items-center" v-if="loading">

    <div
      class="spinner-grow text-info"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
    export default {
        props:{
          isReady: Boolean
        },
        data: () => ({
            loading: false
        }),
        methods: {
            start() {
                this.loading = true
            },
            finish() {
                this.loading = false
            }
        },
        // watch:{
        //     isReady: function (val) {
        //         console.log(val)
        //
        //     },
        // },
        mounted() {
            this.isReady ? this.loading = true : this.loading = false;
        }
    }
</script>

<style scoped lang="scss">
  .page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
    z-index: 99999;

    .spinner-grow {
      width: 100px;
      height: 100px;
      margin-bottom: 200px;
    }
  }
</style>
