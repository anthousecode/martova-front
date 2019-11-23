<template>
  <section class="container">
    <div class="row flex-column justify-content-center">
      <div class="col-12">
        <h1 style="font-size: 234px;" class="text-center">OOPS!
          <h2
            class="alert alert-light w-50 text-center py-3 align-self-center"
            role="alert"
          >
            Error 404
          </h2>
        </h1>
        <nuxt-link class="text-center w-100 d-block" to="/">Home</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: "error"
    }
</script>

<style scoped>
  section{
    height: 100%;
  }
  h1{
    position: relative;
  }
  h2{
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -120%);
    color:red;
    opacity: 1;
    -webkit-box-shadow: 0px 3px 39px -5px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 3px 39px -5px rgba(0,0,0,0.75);
    box-shadow: 0px 3px 39px -5px rgba(0,0,0,0.75);
  }
</style>
